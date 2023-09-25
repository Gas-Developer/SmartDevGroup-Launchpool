import { ethers } from "ethers";
var Web3 = require("web3");

export function maticToWei(valueInEth: string): bigint {
	try {
		const weiValue = ethers.parseEther(valueInEth);
		return weiValue;
	} catch (error) {
		console.error(
			"Errore durante la conversione da Matic a Wei:",
			error
		);
		throw error;
	}
}

export function weiToMatic(valueInWei: string, decimals: number): number {

	if(!valueInWei || valueInWei == "" || valueInWei == "Infinity" || isNaN(Number(valueInWei))) return 0;

	try {
		let ethValue = Web3.utils.fromWei(valueInWei, "ether");
		ethValue = parseFloat(ethValue).toFixed(decimals);
		return ethValue;
	} catch (error) {
		console.error(
			"Errore durante la conversione da Wei a Matic:",
			error
		);
		throw error;
	}
}