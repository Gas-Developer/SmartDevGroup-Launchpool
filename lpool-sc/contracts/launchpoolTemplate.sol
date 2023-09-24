// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract launchpoolTemplate is Initializable, OwnableUpgradeable, ReentrancyGuard {

	using SafeMath for uint256;

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

	event unstakeOrder(
		address indexed sender,
		uint256 amountUnstaked
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
	event tokenClaimed(
		address indexed sender,
		uint256 amount,
		uint256 remainingTokenToDistribute
	);

	// DATA STRUCTURES & VARIABLES
	uint256 public totalTokenToDistribute;			// contatore Token ancora da distribuire
	string public nameTokenToDistribute;					// nome Token ERC-20 da distribuire
	string public symbolTokenToDistribute;					// symbolo Token ERC-20 da distribuire
	uint256 public decimalsTokenToDistribute;				// decimali Token ERC-20 da distribuire
	uint256 public stakingLength;					// lunghezza in secondi del periodo di staking
	uint256 public startLP;							// timestamp inizio launchpool
	uint256 public endLP;							// timestamp inizio launchpool
	uint256 public TotalPower = 0;					// ad ogni commit TotalPower = TotalPower + orderPower;
	uint256 public totalStaked;						// total staked by  users
	
	mapping(address => uint256[]) public orderIDs;	// associa ogni ordine di staking all'address che lo ha effettuato

	struct Order {
		uint256 stakedAmount;						// quantità di coin/token staked
		uint256 orderTime;							// timestamp
		uint256 power;								// power = tokenQuantity * ( orderTime - startLP)
		bool claimed;								// true se è già stato fatto il claim di questo ordine
		bool unstaked;								// true se è stato fatto l'unstake per quella quantità di quell'ordine
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

	function initialize(ERC20 _token, uint256 _startLP, uint256 _endLP) external initializer {
		require(_startLP > block.timestamp, "StartLP must be greater than now");
		require(_startLP < _endLP, "StartLP must be less than EndLP");

		token = _token;

		startLP = _startLP;
		endLP = _endLP;
		_setNewStakingLenght(startLP, endLP);

		nameTokenToDistribute = _token.name();
		symbolTokenToDistribute = _token.symbol();
		decimalsTokenToDistribute = _token.decimals();

		OwnableUpgradeable.__Ownable_init();

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
		//console.log("orderID: ", orderID);

		// Creo l'order
		Order memory senderOrder;											// Creo un nuovo ordine
		senderOrder.stakedAmount = uint256(msg.value);						// Assegno la quantità di MATIC staked
		senderOrder.orderTime = block.timestamp;							// Assegno il timestamp dell'ordine
		senderOrder.power = senderOrder.stakedAmount * (endLP - senderOrder.orderTime); // Calcolo il power dell'ordine
		senderOrder.claimed = false;
		senderOrder.unstaked = false;											// Assegno il valore false al claim

		// Inserisco l'order nella lista degli order
		orders.push(senderOrder); 											// Aggiungo l'ordine all'array degli ordini

		// Assegno l'order all'address che ha effettuato lo stake
		orderIDs[msg.sender].push(orderID); 								// Associo l'ID dell'ordine all'address che ha effettuato lo stake

		// Aggiorno il totale dei power
		TotalPower = TotalPower + senderOrder.power;						// Aggiungo il power al totale dei power

		totalStaked += senderOrder.stakedAmount;

		//console.log("senderOrder.stakedAmount: ", senderOrder.stakedAmount);
		//console.log("endLP: ", endLP);
		//console.log("senderOrder.orderTime: ", senderOrder.orderTime);
		console.log("[", orderID, "]: (endLP - senderOrder.orderTime) = ", (endLP - senderOrder.orderTime));
		console.log(senderOrder.stakedAmount, " * ", (endLP - senderOrder.orderTime), " = ");
		console.log("senderOrder.power: ", senderOrder.power);
		//console.log("New TotalPower: ", TotalPower);

		emit newStakeOrder(
			msg.sender,
			senderOrder.stakedAmount,
			senderOrder.power,
			TotalPower
		);
	}


   function claim() public launchpoolEnded nonReentrant {
		require(orderIDs[msg.sender].length > 0, "No orders for this address");								// Controllo che l'address abbia effettuato almeno uno stake

		uint256 totalPowerToClaim = 0; // Inizializzo il totale del power dell'utente

		for (uint256 i = 0; i < orderIDs[msg.sender].length; i++) {
			uint256 currentOrderID = orderIDs[msg.sender][i];												// Recupero l'ID dell'ordine che sto processando dal mapping orderIDs
			Order memory currentOrder = orders[currentOrderID];												// Recupero l'ordine che sto processando dall'array orders

			if (currentOrder.claimed) {
				continue;																					// Se l'ordine è già stato claimato passo al prossimo
			}

			// Se l'ordine non è stato già riscosso (Claimed), per prima cosa lo imposto a riscosso isClaimed = true (check, effect, interaction)
			// naturalmente setto isClaimed sull'array globale degli orders e non su currentOrder che è una copia locale dell'ordine
			orders[currentOrderID].claimed = true;

			totalPowerToClaim = totalPowerToClaim.add(currentOrder.power);									// Aggiungo il power dell'ordine corrente al totale del power dell'utente
		}

		//console.log("userTotalPowerToClaim: ", totalPowerToClaim,"\n");
		require(totalPowerToClaim > 0, "No tokens to claim");												// Controllo che ci siano token da claimare

		// Calcolo il numero dei token da distribuire all'utente, con la seguente proporzione:
		// totalTokenToDistribute : TotalPower = userTokenToClaim : totalPowerToClaim
		uint256 Moltiplicatore = 10**18;																	// moltiplicatore per evitare problemi di arrotondamento

		// La formula è la seguente:
		// userTokenToClaim = totalTokenToDistribute * (totalPowerToClaim / TotalPower)
		// ma questa formula ha un problema di arrotondamento, per questo motivo moltiplico e poi divido per 10^18 (Moltiplicatore)
		uint256 userTokenToClaim = totalTokenToDistribute.mul(Moltiplicatore).mul(totalPowerToClaim).div(TotalPower).div(Moltiplicatore); 
		//console.log("totalTokenToDistribute before Claim: ", totalTokenToDistribute);

		require(userTokenToClaim > 0, "No tokens to claim");                                 // Controllo che ci siano token da claimare (check)

		// Riumovo dal totale i token da distribuire
		totalTokenToDistribute = totalTokenToDistribute.sub(userTokenToClaim);                 // (effect)

		// Riumovo dal il power dell'utente dal totale dei power
		TotalPower = TotalPower.sub(totalPowerToClaim);                                        // (effect)

		// Trasferisco i token all'utente
		token.transfer(msg.sender, userTokenToClaim);                                        // (interaction)

		console.log("userTokenToClaim: ", userTokenToClaim, " totalTokenToDistribute after claim: ", totalTokenToDistribute);

		emit tokenClaimed(msg.sender, userTokenToClaim, totalTokenToDistribute);
	}


	function unstake() public launchpoolEnded nonReentrant{

		address userAddress = msg.sender;

		uint256 myTotalStaked = 0;

 		//Loop for every order
		for (uint256 i = 0; i < orderIDs[userAddress].length; i++) {

			uint256 currentOrderId = orderIDs[userAddress][i];
			Order memory order = orders[currentOrderId];

			if(order.unstaked == false) {
				orders[currentOrderId].unstaked = true;
				myTotalStaked = myTotalStaked + order.stakedAmount;
			} 

		} 

        // Send the value staked to the user
        (bool sent, ) = userAddress.call{value: myTotalStaked}("");
        require(sent, "Failed to send Matic");

		totalStaked -= myTotalStaked; 

		emit unstakeOrder(
			userAddress,
			myTotalStaked
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
		uint256 userTotalStaked = 0;
		for (uint256 i = 0; i < orderIDs[_user].length; i++) {
			
			uint256 currentOrderId = orderIDs[_user][i];
			Order memory order = orders[currentOrderId];

			if(order.unstaked == false) {
				userTotalStaked = userTotalStaked + order.stakedAmount;
			}

		}
		return userTotalStaked;
	}

	function userHasClaimed(address _user) public view returns (bool) {
		bool hasClaimed = true;
		for (uint256 i = 0; i < orderIDs[_user].length; i++) {

			uint256 currentOrderId = orderIDs[_user][i];

			hasClaimed = hasClaimed && isClaimed(currentOrderId);

		}
		return hasClaimed;
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

	// CHECKERs
	function isStarted() public view returns (bool) {
		return block.timestamp >= startLP;
	}

	function isEnded() public view returns (bool) {
		return block.timestamp > endLP;
	}

	function isClaimed(uint256 _orderID) public view returns (bool) {
		return orders[_orderID].claimed;
	}


}
