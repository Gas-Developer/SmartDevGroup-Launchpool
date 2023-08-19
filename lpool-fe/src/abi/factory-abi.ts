const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`; 
const templateContractAddress = process.env.NEXT_PUBLIC_TEMPLATE_CONTRACT_ADDRESS as `0x${string}`; 

export const FactoryContractConfig = {
  address: factoryContractAddress,
  templateAddress: templateContractAddress,
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "LaunchpoolAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "storageURI",
          "type": "string"
        }
      ],
      "name": "LaunchpoolCreated",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Launchpools",
      "outputs": [
        {
          "internalType": "address",
          "name": "launchpoolAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "storageURI",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_implementationContract",
          "type": "address"
        },
        {
          "internalType": "contract ERC20",
          "name": "_token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_startLP",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_endLP",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "storageURI",
          "type": "string"
        }
      ],
      "name": "deployClone",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getLaunchpool",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "launchpoolAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "storageURI",
              "type": "string"
            }
          ],
          "internalType": "struct LaunchpoolFactory.Launchpool",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLaunchpools",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "launchpoolAddress",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "storageURI",
              "type": "string"
            }
          ],
          "internalType": "struct LaunchpoolFactory.Launchpool[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getStorageURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_storageURI",
          "type": "string"
        }
      ],
      "name": "setStorageURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
} as const