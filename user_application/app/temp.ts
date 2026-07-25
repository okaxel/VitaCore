// components/IdentityManager.jsx
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config";

export default function IdentityManager() {
  const [walletAddress, setWalletAddress] = useState("");
  const [suiInput, setSuiInput] = useState("");
  const [status, setStatus] = useState("");

  // 1. Connect MetaMask / EVM Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setStatus("Wallet connected successfully!");
      } catch (err) {
        console.error(err);
        setStatus("Failed to connect wallet.");
      }
    } else {
      setStatus("Please install MetaMask or another EVM wallet.");
    }
  };

  // 2. Handle World ID Success and Send Transaction to Smart Contract
  const handleWorldIDSuccess = async (result) => {
    try {
      setStatus("World ID verified! Submitting to smart contract...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Format proof parameters required by World ID router interface
      // IDKit returns a string proof that needs to be unpacked/parsed into uint256[8]
      const proofParam = decodeProof(result.proof); 
      
      const initialSuiAddresses = suiInput ? [suiInput.trim()] : [];

      // Call the registerUser function on your smart contract
      const tx = await contract.registerUser(
        walletAddress,
        initialSuiAddresses,
        result.merkle_root,
        result.nullifier_hash,
        proofParam
      );

      setStatus("Transaction pending... please wait.");
      await tx.wait();
      setStatus("Successfully registered with World ID and linked addresses!");
    } catch (err) {
      console.error(err);
      setStatus(`Registration failed: ${err.reason || err.message}`);
    }
  };

  // Helper utility to format the World ID proof string into uint256[8]
  const decodeProof = (proofString) => {
    // If IDKit provides proof as a hex string or array, parse accordingly.
    // Usually, ethers default abi coder or JSON parsing handles this. 
    // Here we assume it's passed or can be parsed via default zero-knowledge parameter encoders.
    return ethers.AbiCoder.defaultAbiCoder().decode(["uint256[8]"], proofString)[0];
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Multi-Identity Registry Dashboard</h2>
      
      <div>
        <button onClick={connectWallet} style={{ padding: "10px 20px", marginBottom: "10px" }}>
          {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect EVM Wallet"}
        </button>
      </div>

      {walletAddress && (
        <div style={{ marginTop: "20px" }}>
          <h3>Link Sui Storage Address</h3>
          <input
            type="text"
            placeholder="Enter Sui Address (optional)"
            value={suiInput}
            onChange={(e) => setSuiInput(e.target.value)}
            style={{ padding: "8px", width: "300px", marginRight: "10px" }}
          />

          {/* 3. World ID IDKit Widget Button */}
          <IDKitWidget
            app_id="app_your_worldcoin_app_id" // Replace with your World Developer portal App ID
            action="your-action-name"           // Replace with your defined action name
            signal={walletAddress}
            verification_level={VerificationLevel.Orb} // Or Device / Phone
            onSuccess={handleWorldIDSuccess}
            handleVerify={() => {}} // Optional backend verification hook
          >
            {({ open }) => (
              <button onClick={open} style={{ padding: "10px 20px", backgroundColor: "#000", color: "#fff" }}>
                Verify with World ID & Register
              </button>
            )}
          </IDKitWidget>
        </div>
      )}

      <p style={{ marginTop: "20px", fontWeight: "bold", color: "#333" }}>{status}</p>
    </div>
  );
}