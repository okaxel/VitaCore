export const ABI_CODE = [
	{
		"inputs": [
			{
				"internalType": "contract IWorldID",
				"name": "_worldId",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_appId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_actionId",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "AlreadyRegistered",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ArrayOutOfBounds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "EnforcedPause",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ExpectedPause",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidNullifier",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MaxSuiAddressesReached",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotRegistered",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "Unauthorized",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newBalance",
				"type": "uint256"
			}
		],
		"name": "BalanceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Paused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "suiAddress",
				"type": "string"
			}
		],
		"name": "SuiAddressAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "suiAddress",
				"type": "string"
			}
		],
		"name": "SuiAddressRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "Unpaused",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "ethAddress",
				"type": "address"
			}
		],
		"name": "UserRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "GROUP_ID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_SUI_ADDRESSES",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "suiAddress",
				"type": "string"
			}
		],
		"name": "addSuiAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipientEthAddress",
				"type": "address"
			}
		],
		"name": "depositFor",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "externalNullifier",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ethAddress",
				"type": "address"
			}
		],
		"name": "getUserByEth",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "nullifierHash",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ethAddress",
						"type": "address"
					},
					{
						"internalType": "string[]",
						"name": "suiAddresses",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct VitaCore.UserProfile",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			}
		],
		"name": "getUserByNullifier",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "nullifierHash",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ethAddress",
						"type": "address"
					},
					{
						"internalType": "string[]",
						"name": "suiAddresses",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct VitaCore.UserProfile",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "suiAddress",
				"type": "string"
			}
		],
		"name": "getUserBySui",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "nullifierHash",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "ethAddress",
						"type": "address"
					},
					{
						"internalType": "string[]",
						"name": "suiAddresses",
						"type": "string[]"
					},
					{
						"internalType": "uint256",
						"name": "balance",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "exists",
						"type": "bool"
					}
				],
				"internalType": "struct VitaCore.UserProfile",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "nullifierByEth",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "nullifierBySui",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paused",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ethAddress",
				"type": "address"
			},
			{
				"internalType": "string[]",
				"name": "initialSuiAddresses",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "root",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "nullifierHash",
				"type": "uint256"
			},
			{
				"internalType": "uint256[8]",
				"name": "proof",
				"type": "uint256[8]"
			}
		],
		"name": "registerUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "suiAddress",
				"type": "string"
			}
		],
		"name": "removeSuiAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "worldId",
		"outputs": [
			{
				"internalType": "contract IWorldID",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];