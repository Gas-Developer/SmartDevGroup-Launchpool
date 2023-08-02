// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//Definisce l'interfaccia ILaunchpool che elenca la firma della funzione initialize del contratto Launchpool.
interface ILaunchpool {
    function initialize(ERC20 _token, uint256 _startLP, uint256 _endLP) external;
}

// Inizia il contratto Factory
contract LaunchpoolFactory_EB {

    address public templateAddress;

    //Costruttore del contratto Factory che richiede l'indirizzo del contratto di logica Launchpool per inizializzare la variabile implementationContract.
    constructor(address _templateAddress) {
        templateAddress = _templateAddress;
    }

    event ProxyCreated(address proxy);

    //Sono le funzioni principali del contratto Factory per creare nuove istanze di contratti proxy basati sulla logica Launchpool.
    function clone(
        address implementation,
        ERC20 _token,
        uint _startLP,
        uint _endLP
    ) internal returns (address instance) {
        //L'assembly viene utilizzato per creare la nuova istanza del contratto proxy e per inizializzarla.

		/// @solidity memory-safe-assembly
        assembly {
            // Cleans the upper 96 bits of the `implementation` word, then packs the first 3 bytes
            // of the `implementation` address with the bytecode before the address.
            mstore(
                0x00,
                or(
                    shr(0xe8, shl(0x60, implementation)),
                    0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000
                )
            )
            // Packs the remaining 17 bytes of `implementation` with the bytecode after the address.
            mstore(
                0x20,
                or(shl(0x78, implementation), 0x5af43d82803e903d91602b57fd5bf3)
            )
            instance := create(0, 0x09, 0x37)
        }
        require(instance != address(0), "ERC1167: create failed");

        ILaunchpool(instance).initialize(_token, _startLP, _endLP);

        emit ProxyCreated(address(instance));

        return instance;
    }

    //Ogni volta che viene chiamata la funzione createLaunchpool, verrà creata una nuova istanza di contratto proxy con la logica Launchpool fornita.
    function createLaunchpool(
        ERC20 _token,
        uint _startLP,
        uint _endLP
    ) public returns (address) {
        address proxy = clone(templateAddress, _token, _startLP, _endLP);
        return proxy;
    }
}