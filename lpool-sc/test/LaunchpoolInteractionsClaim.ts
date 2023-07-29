import { ethers } from 'hardhat';
import { expect } from 'chai';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe.only("Launchpool Interactions with Claims", function () {

	async function initTokenAndLaunchpoolFixture() {

		let today = new Date();
		today.setHours(today.getHours() + 1);
		let todayPlusOneWeek = new Date();
		todayPlusOneWeek.setDate(today.getDate() + 7);	

		const [owner, otherAccount, user1, user2, user3, user4, user5] = await ethers.getSigners();

		const token = await ethers.deployContract("TokenTest");
		const tokenAddress = await token.getAddress();

		const TOKEN_TOTAL_SUPPLY = await token.totalSupply();													// Estraggo il totale di token dal token
		const TOKEN_OWNER_BALANCE = BigInt(await token.balanceOf(owner.address));										// Estraggo il bilancio del token dal token

		const TOKEN_DECIMALS = await token.decimals();															// Estraggo i decimals dal token (default 18)
		const TOKEN_DEPOSIT_AMOUNT = TOKEN_OWNER_BALANCE / BigInt(10);											// Deposito un decimo del totale di token in mio possesso
		const DIFFERENCE = TOKEN_OWNER_BALANCE - TOKEN_DEPOSIT_AMOUNT;											// Differenza tra il bilancio del token e il deposito

		console.log("Owner Token Balance \t", TOKEN_OWNER_BALANCE.toString(), " wei");
		console.log("TOKEN_DEPOSIT_AMOUNT\t", TOKEN_DEPOSIT_AMOUNT.toString(), " wei");


		expect(TOKEN_OWNER_BALANCE).greaterThanOrEqual(TOKEN_DEPOSIT_AMOUNT);										// Verifico che il bilancio del token sia minore o uguale al totale di token

		const Launchpool = await ethers.getContractFactory("Launchpool");										// Cotruisco la factory 
		const launchpool = await Launchpool.deploy(tokenAddress, Math.round(today.valueOf() / 1000), Math.round(todayPlusOneWeek.valueOf() / 1000));	// Deploy del contratto
		const launchpoolAddress = await launchpool.getAddress();

		const allowance = await token.increaseAllowance(launchpoolAddress, TOKEN_DEPOSIT_AMOUNT);				// Aumento l'allowance del token per la LP
		await  launchpool.depositTokenToDistribute(TOKEN_DEPOSIT_AMOUNT);										// Deposito i token da distribuire nella LP

		//Launchpool needs to start
		const HOUR_IN_SECONDS = 3600;
		const nowPlusNineHours = (await time.latest()) + (9 * HOUR_IN_SECONDS);
		await time.increaseTo(nowPlusNineHours); 

		return { today, todayPlusOneWeek, owner, otherAccount, token, launchpool, launchpoolAddress,  user1, user2, user3, user4, user5, TOKEN_DEPOSIT_AMOUNT };
  }

	describe("Launchpool Interactions with Claim & Unstake", async function () {

		it("Claim orders with different address ", async function () {

			// Deploy del TokenTest e del Launchpool

			let actualBlockTime;
			let dateObject;
			let actualBlockTimeHR;

			// Setto le quote di stake per ogni utente
			const user1Stake = 1000;
			const user2Stake = 500;
			const user3Stake = 1000;
			const user4Stake = 1000;
			const user5Stake = 1000;

			// Deploy del TokenTest e del Launchpool
			const { launchpool, launchpoolAddress, owner, otherAccount, token,  user1, user2, user3, user4, user5, TOKEN_DEPOSIT_AMOUNT } = await loadFixture(initTokenAndLaunchpoolFixture);

			// Mostro i bilanci iniziali
			console.log("0. Bilanci iniziali dei due account del token ");
			
			console.log("user1: ", await token.balanceOf(user1.address));
			console.log("user2: ", await token.balanceOf(user2.address));
			console.log("user3: ", await token.balanceOf(user3.address));
			console.log("user4: ", await token.balanceOf(user4.address));
			console.log("user5: ", await token.balanceOf(user5.address));

			// Faccio gli ordini di stake
			console.log("\n1. Faccio gli ordini di stake");
			await launchpool.connect(user1).stake({ value: user1Stake });			// Faccio lo stake di 1000 wei da user1
			await launchpool.connect(user2).stake({ value: user2Stake });			// Faccio lo stake di 1000 wei da user2
			console.log("\n... 1 giorno ...\n");
			await time.increase(1 * 24 * 60 * 60);									// Vado avanti di un giorno
			await launchpool.connect(user3).stake({ value: user3Stake });			// Faccio lo stake di 1000 wei da user3
			console.log("\n... 3 giorni ...\n");
			await time.increase(3 * 24 * 60 * 60);									// Vado avanti di 3 giorni
			await launchpool.connect(user4).stake({ value: user4Stake });			// Faccio lo stake di 1000 wei da user4
			await launchpool.connect(user5).stake({ value: user5Stake });			// Faccio lo stake di 1000 wei da user5

			// Verifico che i bilanci siano corretti
			expect(await launchpool.connect(user1).getMyTotalStaked()).equal(user1Stake);
			expect(await launchpool.connect(user2).getMyTotalStaked()).equal(user2Stake);
			expect(await launchpool.connect(user3).getMyTotalStaked()).equal(user3Stake);
			expect(await launchpool.connect(user4).getMyTotalStaked()).equal(user4Stake);
			expect(await launchpool.connect(user5).getMyTotalStaked()).equal(user5Stake);


			console.log("\n2. ATTENDO UNA SETTIMANA");

			actualBlockTime = (await time.latest()).toString();								// Estraggo il tempo attuale
			dateObject = new Date(parseInt(actualBlockTime) * 1000);							// Lo converto in un oggetto Date			
			actualBlockTimeHR = dateObject.toLocaleString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });					// Lo converto in una stringa leggibile

			console.log(actualBlockTime, " = ", actualBlockTimeHR);
			await time.increase(7 * 24 * 60 * 60);							// Vado avanti di una settimana, la LP dovrebbe essere terminata
			console.log("...");
			actualBlockTime = (await time.latest()).toString();								// Estraggo il tempo attuale
			dateObject = new Date(parseInt(actualBlockTime) * 1000);							// Lo converto in un oggetto Date			
			actualBlockTimeHR = dateObject.toLocaleString('it-IT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });					// Lo converto in una stringa leggibile
			console.log(actualBlockTime, " = ", actualBlockTimeHR);

			// Verifico che la LP sia terminata
			expect(await launchpool.isEnded()).equal(true);

			// Faccio i claim
			console.log("\n3. Effettuo i claim ");
			await launchpool.connect(user1).claim();
			await launchpool.connect(user2).claim();
			await launchpool.connect(user3).claim();
			await launchpool.connect(user4).claim();
			await launchpool.connect(user5).claim();

			// Mostro i bilanci finali
			console.log("\n4. Bilanci finali degli account del token ");
			const user1Balance = await token.balanceOf(user1.address);
			const user2Balance = await token.balanceOf(user2.address);
			const user3Balance = await token.balanceOf(user3.address);
			const user4Balance = await token.balanceOf(user4.address);
			const user5Balance = await token.balanceOf(user5.address);
			//const ownerBalance = await token.balanceOf(owner.address);
			
			console.log("user1Balance: ", user1Balance.toString());
			console.log("user2Balance: ", user2Balance.toString());
			console.log("user3Balance: ", user3Balance.toString());
			console.log("user4Balance: ", user4Balance.toString());
			console.log("user5Balance: ", user5Balance.toString());
			//console.log("ownerBalance: ", ownerBalance.toString());

			const realDeliveredTokens = user1Balance + user2Balance + user3Balance + user4Balance + user5Balance;
			console.log("Real Delivered Tokens: ", realDeliveredTokens.toString());

			// Verifico che i bilanci siano corretti
			expect( await token.balanceOf(launchpoolAddress)).equal(0);

			// Verifico di aver distribuito tutti i token
			expect(realDeliveredTokens).equal(TOKEN_DEPOSIT_AMOUNT);

			console.log("\n5. Effettuo l'unstake di tutti gli utenti ");
			// Verifico che tutti gli utenti abbiano effettuato crettamente l'unstake
			await expect(launchpool.connect(user1).unstake()).to.changeEtherBalances([user1, launchpool], [user1Stake, -user1Stake]);  
			await expect(launchpool.connect(user2).unstake()).to.changeEtherBalances([user2, launchpool], [user2Stake, -user2Stake]);  
			await expect(launchpool.connect(user3).unstake()).to.changeEtherBalances([user3, launchpool], [user3Stake, -user3Stake]);  
			await expect(launchpool.connect(user4).unstake()).to.changeEtherBalances([user4, launchpool], [user4Stake, -user4Stake]);  
			await expect(launchpool.connect(user5).unstake()).to.changeEtherBalances([user5, launchpool], [user5Stake, -user5Stake]);  

		})
	}); 
	

});