"use client";

import { useContractReads } from "wagmi";
import { useEffect, useState } from "react";
import { wagmiContractConfig } from "../abi/launchpool-abi";
import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";
import { wagmiTokenConfig } from "../abi/token-abi";

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
            {
                ...wagmiContractConfig,
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
            data?.[4].result !== undefined &&
            data?.[5].result !== undefined &&
            data?.[6].result !== undefined &&
            data?.[7].result !== undefined &&
			data?.[8
			].result !== undefined
        ) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            dataToSend = {
                startLP: parseInt(data?.[0].result?.toString()),
                endLP: parseInt(data?.[1].result?.toString()),
                stakingLength: parseInt(data?.[2].result?.toString()),
                token: data?.[3].result?.toString(),
                totalTokenToDistribute: parseInt(data?.[4].result?.toString()),
                totalStaked: parseInt(data?.[5].result?.toString()),
                name: data?.[6].result?.toString(),
                symbol: data?.[7].result?.toString(),
                totalSupply: data?.[8].result?.toString(),
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
