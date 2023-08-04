"use client";

import { useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { wagmiContractConfig } from "../abi/contract-abi";
import { stringify } from "../utils/stringify";
import { AreaInvestorStats } from "./area/AreaInvestorStats";
const logger = require("pino")();

export function InvestorPage() {

	interface ContractData {
		startLP: string;
		endLP: string;
		stakingLength: string;
		token: string;
		totalTokenToDistribute: string
	}
	
	let dataToSend: ContractData = {} as ContractData;

	const [contractData, setContractData] = useState(dataToSend);
	const { data, isSuccess, isLoading } = useContractReads({
		contracts: [
			{
				...wagmiContractConfig,
				functionName: "startLP",
			},
			{
				...wagmiContractConfig,
				functionName: "endLP",
			},
			{
				...wagmiContractConfig,
				functionName: "stakingLength",
			},
			{
				...wagmiContractConfig,
				functionName: "token",
			},
			{
				...wagmiContractConfig,
				functionName: "totalTokenToDistribute",
			},
		],
	});

	useEffect(() => {

		logger.info(data);
		dataToSend = {
			startLP: stringify(data?.[0].result),
			endLP: stringify(data?.[1].result),
			stakingLength: stringify(data?.[2].result),
			token: stringify(data?.[3].result),
			totalTokenToDistribute: stringify(data?.[4].result),
		};

		// Aggiorna lo stato con i dati ottenuti dal contratto
		setContractData(dataToSend);
	}, [data]);

	return (
		<div>
			<AreaInvestorStats contractData={contractData} />
		</div>
	);
}
