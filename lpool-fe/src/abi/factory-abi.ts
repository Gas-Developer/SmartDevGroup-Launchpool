const factoryContractAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as `0x${string}`; 
const templateContractAddress = process.env.NEXT_PUBLIC_TEMPLATE_CONTRACT_ADDRESS as `0x${string}`; 

export const FactoryContractConfig = {
  address: factoryContractAddress,
  templateAddress: templateContractAddress,
  abi: [
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
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proxies",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
} as const