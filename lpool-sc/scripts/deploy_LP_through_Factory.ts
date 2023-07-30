require('dotenv').config();
import { ethers } from "hardhat";

	async function main() {

	// 0. SETUP
	const to = process.env.PUBLIC_ADDRESS;
	const amount = ethers.parseEther("100");
	const [owner] = await ethers.getSigners();


	if (!to) {
		console.error('TO_ADDRESS is not defined in .env file');
		process.exit(1);
	}


	// 1. DEPLOY TOKEN
	console.log("\n*** 1. Deploy TestToken ***\n");
	const TokenTestFactory = await ethers.getContractFactory("TokenTest");
	const token = await TokenTestFactory.deploy();
	const depTX = await token.deploymentTransaction();
	if(!depTX) 
		throw new Error("Deployment transaction not found");

	console.log("Waiting tx to be mined...");
	// *** VERY IMPORTANT ***
	await depTX.wait();																							// Wait for the deployment transaction to be mined				

	const tokenAddress = await token.getAddress();
	console.log("address TokenTest:", await tokenAddress);
	console.log("https://mumbai.polygonscan.com/address/"+tokenAddress);

	const TOKEN_OWNER_BALANCE = BigInt(await token.balanceOf(owner.address));									// Estraggo il bilancio del token dal token

	const TOKEN_NAME = await token.name();																		// Estraggo il nome del token (default TokenTest)
	const TOKEN_SYMBOL = await token.symbol();																	// Estraggo il simbolo del token (default TST)
	const TOKEN_DECIMALS = await token.decimals();																// Estraggo i decimals dal token (default 18)

	//console.log("Owner Token Balance \t", TOKEN_OWNER_BALANCE.toString(), " wei");
	//console.log("Owner Token Balance \t", ethers.formatEther(TOKEN_OWNER_BALANCE.toString()), TOKEN_SYMBOL);


	// 2. DEPLOY TEMPLATE
	// Deploy del modello di Launchpool che detterà la logica delle Launchpool che deployeremo attraverso la factory
	console.log("\n*** 2. Deploy Launchpool Template ***\n");
	const Template = await ethers.getContractFactory("launchpoolTemplate");											// Cotruisco la factory 
	const template = await Template.deploy();																// Deploy del contratto di logica
	const templateDeployTX = await template.deploymentTransaction();										// Estraggo la transazione di deploy
	if(!templateDeployTX)
		throw new Error("Deployment transaction not found");
	console.log("Waiting tx to be mined...");
	await templateDeployTX.wait();																			// Attendo che venga minata la TX di deploy


	const templateAddress = await template.getAddress();													// Estraggo l'indirizzo del contratto
	console.log("address Template:", await templateAddress);
	console.log("https://mumbai.polygonscan.com/address/"+templateAddress);

	// 3. DEPLOY FACTORY
	// Deploy della factory che ci permetterà di deployare le Launchpool
	console.log("\n*** 3. Deploy Launchpool Factory ***\n");
	const LaunchpoolFactory = await ethers.getContractFactory("LaunchpoolFactory");										// Cotruisco la factory 
	const launchpoolFactory = await LaunchpoolFactory.deploy(templateAddress);											// Deploy del contratto di logica
	const launchpoolFactoryDeployTX = await template.deploymentTransaction();											// Estraggo la transazione di deploy
	if(!launchpoolFactoryDeployTX)
		throw new Error("Deployment transaction not found");
	console.log("Waiting tx to be mined...");
	await launchpoolFactoryDeployTX.wait();																				// Attendo che venga minata la TX di deploy

	const launchpoolFactoryAddress = await launchpoolFactory.getAddress();												// Estraggo l'indirizzo del contratto
	console.log("address LaunchpoolFactory:", await launchpoolFactoryAddress);
	console.log("https://mumbai.polygonscan.com/address/"+launchpoolFactoryAddress);

	// 4. DEPLOY Launchpool
	// Deploy della Launchpool attraverso la factory
	console.log("\n*** 4. Deploy Launchpool through Factory ***\n");

	const now = new Date();
	now.setMinutes(now.getMinutes() + 2);																// Setto la data di inizio della LP a 2 minuti da adesso
	const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);							// Setto la data di fine della LP a 7 giorni da adesso

	const TODAY = Math.round(now.getTime() / 1000);														// Converto la data di inizio in secondi
	const TODAY_PLUS_ONE_WEEK = Math.round(oneWeekFromNow.getTime() / 1000);							// Converto la data di fine in secondi

	const proxy = await launchpoolFactory.createLaunchpool(token, TODAY, TODAY_PLUS_ONE_WEEK);
	console.log("Waiting tx to be mined...");
	await proxy.wait();

	const proxyAddress = await proxy.to;

	console.log("address Proxy:", proxyAddress);
	console.log("https://mumbai.polygonscan.com/address/"+proxyAddress);


	// 5. INTERACT WITH LAUNCHPOOL
	// Interagisco con la LP appena deployata
	console.log("\n*** 5. Interact with Launchpool ***\n");

	if(!proxyAddress)
		throw new Error("Proxy address not found");

	const LP = await ethers.getContractAt("launchpoolTemplate", proxyAddress);
	const endLP = await LP.endLP();

	console.log(endLP);


	console.log("\n*** END ***\n");

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
});
