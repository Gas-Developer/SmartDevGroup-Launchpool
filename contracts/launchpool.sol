// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Launchpool is Ownable, ReentrancyGuard {
	ERC20 public token;

	// EVENTS
	event LaunchpoolCreated(
		address indexed sender,
		string nameTokenToDistribute,
		uint256 totalTokenToDistribute,
		uint256 stackingLength
	);
	event tokenToDistributeDeposit(
		uint256 amount,
		uint256 totalTokenToDistribute
	);
	event newStakeOrder(
		address indexed sender,
		uint256 amount,
		uint256 power,
		uint256 totalPower
	);
	event newLaunchpoolPeriod(
		uint256 start,
		uint256 end
	);
	event newStartSetted(
		uint256 start
	);
	event newEndSetted(
		uint256 end
	);

	// DATA STRUCTURES & VARIABLES
	uint256 public totalTokenToDistribute;			// contatore Token ancora da distribuire
	string nameTokenToDistribute;					// nome Token ERC-20 da distribuire
	string symbolTokenToDistribute;					// symbolo Token ERC-20 da distribuire
	uint256 decimalsTokenToDistribute;				// decimali Token ERC-20 da distribuire
	uint256 public stakingLength;					// lunghezza in secondi del periodo di staking
	uint256 public startLP;							// timestamp inizio launchpool
	uint256 public endLP;							// timestamp inizio launchpool
	uint256 public TotalPower = 0;					// ad ogni commit TotalPower = TotalPower + orderPower;

	mapping(address => uint256[]) public orderIDs;	// associa ogni ordine di staking all'address che lo ha effettuato

	struct Order {
		uint256 stakedAmount;						// quantità di coin/token staked
		uint256 orderTime;							// timestamp
		uint256 power;								// power = tokenQuantity * ( orderTime - startLP)
		bool isClaimed;								// true se è già stato fatto il claim di questo ordine
	}

	Order[] public orders;							// array dinamico di tutti gli ordini effettuati

	// MODIFIERS
	modifier launchpoolNotStarted() {
		require(block.timestamp < startLP, "Launchpool is already running");
		_;
	}

	modifier launchpoolStarted() {
		require(block.timestamp >= startLP, "Launchpool is not running");
		_;
	}

	modifier launchpoolNotEnded() {
		require(block.timestamp <= endLP, "Launchpool is ended");
		_;
	}

	modifier launchpoolEnded() {
		require(block.timestamp > endLP, "Launchpool is not ended");
		_;
	}

	constructor(ERC20 _token, uint256 _startLP, uint256 _endLP) {
		require(_startLP > block.timestamp, "StartLP must be greater than zero");
		require(_startLP < _endLP, "StartLP must be less than EndLP");

		token = _token;

		startLP = _startLP;
		endLP = _endLP;
		_setNewStakingLenght(startLP, endLP);

		nameTokenToDistribute = _token.name();
		symbolTokenToDistribute = _token.symbol();
		decimalsTokenToDistribute = _token.decimals();

		emit LaunchpoolCreated(
			msg.sender,
			nameTokenToDistribute,
			totalTokenToDistribute,
			stakingLength
		);

	}

	function depositTokenToDistribute(uint256 _amount) external onlyOwner launchpoolNotStarted {
		require(_amount > 0, "Cannot deposit 0 tokens"); 					// Controllo che non si stia cercando di depositare 0 token
		require(
			token.balanceOf(msg.sender) >= _amount,
			"Not enough tokens to deposit"
		); 																	// Controllo che il mittente abbia abbastanza token per depositare
		uint256 allowance = token.allowance(msg.sender, address(this));		// Leggo quanti token ho il permesso di movimentare
		require(allowance >= _amount, "Check the token allowance");			// Controllo che il mittente abbia dato la allow per almeno la quantità di token indicata in amount

		token.transferFrom(msg.sender, address(this), _amount); 			// Trasferisco i token dal mittente al contratto

		totalTokenToDistribute = totalTokenToDistribute + _amount; 			// Aggiungo i token al totale dei token da distribuire

		emit tokenToDistributeDeposit(_amount, totalTokenToDistribute);
	}

	function stake() public payable launchpoolStarted launchpoolNotEnded {

		require(msg.value > 0, "Cannot stake 0 MATIC"); 					// Controllo che non si stia cercando di depositare 0 MATIC
		require(totalTokenToDistribute > 0, "No tokens to distribute");		// Controllo che ci siano ancora token da distribuire

		uint256 orderID = orders.length; 									// Assegno l'ID dell'ordine
		console.log("orderID: ", orderID);

		// Creo l'order
		Order memory senderOrder;											// Creo un nuovo ordine
		senderOrder.stakedAmount = uint256(msg.value);						// Assegno la quantità di MATIC staked
		senderOrder.orderTime = block.timestamp;							// Assegno il timestamp dell'ordine
		senderOrder.power = senderOrder.stakedAmount * (endLP - senderOrder.orderTime); // Calcolo il power dell'ordine
		senderOrder.isClaimed = false;										// Assegno il valore false al claim

		// Inserisco l'order nella lista degli order
		orders.push(senderOrder); // Aggiungo l'ordine all'array degli ordini

		// Assegno l'order all'address che ha effettuato lo stake
		orderIDs[msg.sender].push(orderID); // Associo l'ID dell'ordine all'address che ha effettuato lo stake

		// Aggiorno il totale dei power
		TotalPower = TotalPower + senderOrder.power; // Aggiungo il power al totale dei power

		console.log("senderOrder.stakedAmount: ", senderOrder.stakedAmount);
		console.log("endLP: ", endLP);
		console.log("senderOrder.orderTime: ", senderOrder.orderTime);
		console.log("(endLP - senderOrder.orderTime) = ", (endLP - senderOrder.orderTime));
		console.log(senderOrder.stakedAmount, " *  ", (endLP - senderOrder.orderTime), " = ");
		console.log("senderOrder.power: ", senderOrder.power);
		console.log("New TotalPower: ", TotalPower);

		emit newStakeOrder(
			msg.sender,
			senderOrder.stakedAmount,
			senderOrder.power,
			TotalPower
		);
	}

	// GETTERs & SETTERs
	function getMyOrders() public view returns (uint256[] memory)
	{
		return getUserOrders(msg.sender);
	}

	function getMyTotalStaked() public view returns (uint256) {
		return getUserTotalStaked(msg.sender);
	}
	function getUserOrders(address _user) public view returns (uint256[] memory)
	{
		return orderIDs[_user];
	}

	function getUserTotalStaked(address _user) public view returns (uint256) {
		uint256 totalStaked = 0;
		for (uint256 i = 0; i < orderIDs[_user].length; i++) {
			totalStaked = totalStaked + orders[orderIDs[_user][i]].stakedAmount;
		}
		return totalStaked;
	}

	function setStartLP(uint256 _newStartLP) public onlyOwner launchpoolNotStarted {

		require(_newStartLP > block.timestamp, "New StartLP must be greater than now");
		require(_newStartLP < endLP , "New startLP must be less than endLP");

		startLP = _newStartLP;

		emit newStartSetted(
			startLP
		);

		_setNewStakingLenght(startLP, endLP);

	}

	function setEndLP(uint256 _newEndLP) public onlyOwner launchpoolNotStarted {

		require(_newEndLP > block.timestamp, "New EndLP must be greater than now");
		require(_newEndLP > startLP , "New EndLP must be greater than startLP");

		endLP = _newEndLP;

		emit newEndSetted(
			endLP
		);

		_setNewStakingLenght(startLP, endLP);

	}

	function _setNewStakingLenght(uint256 _start, uint256 _end) internal {

		stakingLength = _end - _start;

		emit newLaunchpoolPeriod(
			_start,
			_end
		);
	}

}