// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//Definisce l'interfaccia ILaunchpool che elenca la firma della funzione initialize del contratto LaunchpoolTemplate.
interface ILaunchpool {
	function initialize(ERC20 _token, uint256 _startLP, uint256 _endLP) external;
}

interface IOwnable {
	function owner() external view returns (address);
}


contract LaunchpoolFactory {

	event LaunchpoolCreated(address indexed LaunchpoolAddress, string storageURI);

	struct Launchpool {
		address launchpoolAddress;
		string storageURI;
	}

	Launchpool[] public Launchpools;

	//Funzione che restituisce l'array di tutte le Launchpools create
	function getLaunchpools() public view returns (Launchpool[] memory) {
		return Launchpools;
	}

	function getLaunchpool(uint256 _index) public view returns (Launchpool memory) {
		return Launchpools[_index];
	}

	function getStorageURI(uint256 _index) public view returns (string memory) {
		return Launchpools[_index].storageURI;
	}

	// Funzione che setta l'URI di una Launchpool
	function setStorageURI(uint256 _index, string memory _storageURI) public {
		require(IOwnable(Launchpools[_index].launchpoolAddress).owner() == msg.sender, "Only the owner can set the storage URI");
		Launchpools[_index].storageURI = _storageURI;
	}

	//Funzione che crea una nuova Launchpool clonando il contratto LaunchpoolTemplate
	function deployClone(address _implementationContract, ERC20 _token, uint _startLP, uint _endLP, string memory storageURI) external returns (address) {

		bytes20 implementationContractInBytes = bytes20(_implementationContract);		// convert the address to 20 bytes
		address proxy; 																	//address to assign a cloned proxy

		assembly {
			let clone := mload(0x40)
			mstore(
				clone,
				0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
			)
			mstore(add(clone, 0x14), implementationContractInBytes)
			mstore(
				add(clone, 0x28),
				0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
			)
			proxy := create(0, clone, 0x37)
		}

		// Call initialization
		ILaunchpool(proxy).initialize(_token, _startLP, _endLP);						// Deploy della nuova Launchpool
		Launchpools.push(Launchpool(proxy, storageURI));								//Aggiungo la nuova Launchpool appena creata all'array delle Launchpools
		emit LaunchpoolCreated(proxy,  storageURI);										//Emetto l'evento comunicando l'address della nuova Launchpool creata

		return proxy;
	}
}