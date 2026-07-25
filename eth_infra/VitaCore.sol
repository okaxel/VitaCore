// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import { IWorldID } from "./interfaces/IWorldID.sol";
import { ByteHasher } from "./helpers/ByteHasher.sol";

/**
 * @title VitaCore
 * @notice Delivers the main functionality of VitaCore. It manages user profiles,
 * provides access to Sui storage addresses, and handles balance updates.
 */

contract VitaCore is Ownable, Pausable, ReentrancyGuard {
    using ByteHasher for bytes;

    // --- Custom Errors ---
    error InvalidNullifier();
    error Unauthorized();
    error AlreadyRegistered();
    error NotRegistered();
    error InsufficientBalance();
    error MaxSuiAddressesReached();
    error ArrayOutOfBounds();

    // --- Constants ---
    uint256 public constant MAX_SUI_ADDRESSES = 10; // Prevents gas limit DoS attacks

    // --- World ID Configuration ---
    IWorldID public immutable worldId;
    uint256 public immutable externalNullifier;
    uint256 public constant GROUP_ID = 1; // 1 for Orb verification

    // --- Data Structures ---
    struct UserProfile {
        uint256 nullifierHash;
        address ethAddress;
        string[] suiAddresses;
        uint256 balance;
        bool exists;
    }

    // --- State Mappings ---
    mapping(uint256 => UserProfile) private profilesByNullifier;
    mapping(address => uint256) public nullifierByEth;
    mapping(string => uint256) public nullifierBySui;

    // --- Events ---
    event UserRegistered(uint256 indexed nullifierHash, address indexed ethAddress);
    event SuiAddressAdded(uint256 indexed nullifierHash, string suiAddress);
    event SuiAddressRemoved(uint256 indexed nullifierHash, string suiAddress);
    event BalanceUpdated(uint256 indexed nullifierHash, uint256 newBalance);

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) Ownable(msg.sender) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

    // --- Admin Control Functions ---

    /**
     * @notice Allows the contract owner to pause all critical actions in case of an emergency.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Resumes normal contract operations.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    // --- Core User Functions (Protected by whenNotPaused & nonReentrant) ---

    function registerUser(
        address ethAddress,
        string[] calldata initialSuiAddresses,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external whenNotPaused {
        if (profilesByNullifier[nullifierHash].exists) revert AlreadyRegistered();
        if (nullifierByEth[ethAddress] != 0) revert AlreadyRegistered();
        if (initialSuiAddresses.length > MAX_SUI_ADDRESSES) revert MaxSuiAddressesReached();

        worldId.verifyProof(
            root,
            GROUP_ID,
            abi.encodePacked(ethAddress).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        profile.nullifierHash = nullifierHash;
        profile.ethAddress = ethAddress;
        profile.balance = 0;
        profile.exists = true;

        nullifierByEth[ethAddress] = nullifierHash;

        for (uint256 i = 0; i < initialSuiAddresses.length; i++) {
            string memory suiAddr = initialSuiAddresses[i];
            profile.suiAddresses.push(suiAddr);
            nullifierBySui[suiAddr] = nullifierHash;
            emit SuiAddressAdded(nullifierHash, suiAddr);
        }

        emit UserRegistered(nullifierHash, ethAddress);
    }

    function addSuiAddress(string calldata suiAddress) external whenNotPaused {
        uint256 nullifierHash = nullifierByEth[msg.sender];
        if (nullifierHash == 0) revert NotRegistered();
        if (nullifierBySui[suiAddress] != 0) revert AlreadyRegistered();

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        if (profile.suiAddresses.length >= MAX_SUI_ADDRESSES) revert MaxSuiAddressesReached();

        profile.suiAddresses.push(suiAddress);
        nullifierBySui[suiAddress] = nullifierHash;

        emit SuiAddressAdded(nullifierHash, suiAddress);
    }

    function removeSuiAddress(string calldata suiAddress) external whenNotPaused {
        uint256 nullifierHash = nullifierByEth[msg.sender];
        if (nullifierHash == 0) revert NotRegistered();
        if (nullifierBySui[suiAddress] != nullifierHash) revert Unauthorized();

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        
        bool found = false;
        for (uint256 i = 0; i < profile.suiAddresses.length; i++) {
            if (keccak256(bytes(profile.suiAddresses[i])) == keccak256(bytes(suiAddress))) {
                profile.suiAddresses[i] = profile.suiAddresses[profile.suiAddresses.length - 1];
                profile.suiAddresses.pop();
                found = true;
                break;
            }
        }

        if (found) {
            delete nullifierBySui[suiAddress];
            emit SuiAddressRemoved(nullifierHash, suiAddress);
        }
    }

    // --- Balance Management ---

    function deposit() external payable whenNotPaused {
        uint256 nullifierHash = nullifierByEth[msg.sender];
        if (nullifierHash == 0) revert NotRegistered();

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        profile.balance += msg.value;

        emit BalanceUpdated(nullifierHash, profile.balance);
    }

    function depositFor(address recipientEthAddress) external payable whenNotPaused {
        uint256 nullifierHash = nullifierByEth[recipientEthAddress];
        if (nullifierHash == 0) revert NotRegistered();

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        profile.balance += msg.value;

        emit BalanceUpdated(nullifierHash, profile.balance);
    }

    function withdraw(uint256 amount) external whenNotPaused nonReentrant {
        uint256 nullifierHash = nullifierByEth[msg.sender];
        if (nullifierHash == 0) revert NotRegistered();

        UserProfile storage profile = profilesByNullifier[nullifierHash];
        if (profile.balance < amount) revert InsufficientBalance();

        profile.balance -= amount;
        
        (bool success, ) = payable(profile.ethAddress).call{value: amount}("");
        require(success, "Transfer failed");

        emit BalanceUpdated(nullifierHash, profile.balance);
    }

    // --- Getters ---

    function getUserByEth(address ethAddress) external view returns (UserProfile memory) {
        uint256 nullifierHash = nullifierByEth[ethAddress];
        if (nullifierHash == 0) revert NotRegistered();
        return profilesByNullifier[nullifierHash];
    }

    function getUserBySui(string calldata suiAddress) external view returns (UserProfile memory) {
        uint256 nullifierHash = nullifierBySui[suiAddress];
        if (nullifierHash == 0) revert NotRegistered();
        return profilesByNullifier[nullifierHash];
    }

    function getUserByNullifier(uint256 nullifierHash) external view returns (UserProfile memory) {
        if (!profilesByNullifier[nullifierHash].exists) revert NotRegistered();
        return profilesByNullifier[nullifierHash];
    }
}