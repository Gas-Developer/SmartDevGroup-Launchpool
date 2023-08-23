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

	// 1. DEPLOY FACTORY
	// Deploy della factory che ci permetterà di deployare le Launchpool
	console.log("\n*** 1. Deploy Launchpool Factory ***\n");
	const LaunchpoolFactory = await ethers.getContractFactory("LaunchpoolFactory");										// Cotruisco la factory 
	const launchpoolFactory = await LaunchpoolFactory.deploy();															// Deploy del contratto di logica
	const launchpoolFactoryDeployTX = await LaunchpoolFactory.getDeployTransaction();									// Estraggo la transazione di deploy

	if(!launchpoolFactoryDeployTX)
		throw new Error("Deployment transaction not found");

	console.log("Waiting tx to be mined...");
	launchpoolFactory.waitForDeployment().then((tx) => {
		console.log("LaunchpoolFactory deployed", tx);
	});

	const launchpoolFactoryAddress = await launchpoolFactory.getAddress();												// Estraggo l'indirizzo del contratto

	console.log("address LaunchpoolFactory:", await launchpoolFactoryAddress);
	console.log("https://mumbai.polygonscan.com/address/"+launchpoolFactoryAddress);

	console.log("\n");

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
});
