"use client";

import { useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { wagmiContractConfig } from "../abi/contract-abi";
import { stringify } from "../utils/stringify";
import { AreaInvestorStats } from "./area/AreaInvestorStats";
import { ContractData } from "./interfaces/ContractData";

const logger = require("pino")();


export function InvestorPage() {

	let dataToSend: ContractData = {} as ContractData;

	const [contractData, setContractData] = useState({} as ContractData);
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

		if(isSuccess && !isLoading && 
			data?.[0].result !== undefined
			&& data?.[1].result !== undefined
			&& data?.[2].result !== undefined
			&& data?.[3].result !== undefined
			&& data?.[4].result !== undefined
		) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			dataToSend = {
				startLP: parseInt(data?.[0].result?.toString()),
				endLP: parseInt(data?.[1].result?.toString()),
				stakingLength: parseInt(data?.[2].result?.toString()),
				token: data?.[3].result?.toString(),
				totalTokenToDistribute: parseInt(data?.[4].result?.toString()),
			};
		}
		// Aggiorna lo stato con i dati ottenuti dal contratto
		setContractData(dataToSend);
	}, [data]);

	return (
		<div>
			<AreaInvestorStats contractData={contractData} />
		</div>
	);
}
