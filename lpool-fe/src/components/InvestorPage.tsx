"use client";

import { useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { LaunchpoolContractConfig } from "../abi/template-abi";
import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";
import { wagmiTokenConfig } from "../abi/token-abi";
const logger = require("pino")();

export function InvestorPage(props: any) {

	const launchpoolAddress = props.launchpoolAddress as `0x${string}`; 

	logger.info("launchpoolAddress: " + launchpoolAddress);
	let dataToSend: ContractData = {} as ContractData;

	const [contractData, setContractData] = useState({} as ContractData);
	const { data, isSuccess, isLoading } = useContractReads({
		contracts: [
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "startLP",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "endLP",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "stakingLength",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "token",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "totalTokenToDistribute",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "totalStaked",
			},
			{
				...wagmiTokenConfig,
				functionName: "name",
			},
			{
				...wagmiTokenConfig,
				functionName: "symbol",
			},
			{
				...wagmiTokenConfig,
				functionName: "totalSupply",
			},
		],
	});

	useEffect(() => {

		if (
			isSuccess &&
			!isLoading &&
			data?.[0].result !== undefined &&
			data?.[1].result !== undefined &&
			data?.[2].result !== undefined &&
			data?.[3].result !== undefined &&
			data?.[4].result !== undefined 
		) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			dataToSend = {
				launchpoolAddress: launchpoolAddress,
				cid: "",
				startLP: parseInt(data?.[0].result?.toString()),
				endLP: parseInt(data?.[1].result?.toString()),
				stakingLength: parseInt(data?.[2].result?.toString()),
				token: data?.[3].result?.toString(),
				totalTokenToDistribute: parseInt(data?.[4].result?.toString()),
				totalStaked: data?.[5].result !== undefined  ? parseInt(data?.[5].result?.toString()) : 0,
				name: data?.[6].result?.toString() ? data?.[6].result?.toString() : "",
				symbol: data?.[7].result?.toString() ? data?.[7].result?.toString() : "",
				totalSupply: data?.[8].result?.toString() ? data?.[8].result?.toString() : "",
			};
		}
		
		setContractData(dataToSend);
	}, [data]);

	return (
		<>
			<AreasContainer {...contractData} />
		</>
	);
}
