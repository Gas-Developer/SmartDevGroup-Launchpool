"use client";

import { useContractReads } from "wagmi";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";
import { ContractData } from "./interfaces/ContractData";
import { useState, useEffect } from "react";
import { wagmiTokenConfig } from "../abi/token-abi";

const logger = require("pino")();

export default function InvestorMainContainer(props: any) {
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
                totalStaked:
                    data?.[5].result !== undefined
                        ? parseInt(data?.[5].result?.toString())
                        : 0,
                name: data?.[6].result?.toString()
                    ? data?.[6].result?.toString()
                    : "",
                symbol: data?.[7].result?.toString()
                    ? data?.[7].result?.toString()
                    : "",
                totalSupply: data?.[8].result?.toString()
                    ? data?.[8].result?.toString()
                    : "",
            };
        }

        setContractData(dataToSend);
    }, [data]);

    return (
        <>
            <div
                id="investorMainContainer"
                className=" bg-slate-400 grid grid-cols-4"
            >
				<div id="investorLeftSide" className=" bg-slate-700 col-span-3 grid grid-rows-6">
					<div id="investorLeftSideTop" className="bg-slate-800 row-span-1 grid grid-cols-6">
						<div id="imgContainer"></div>
						<div id="launchpoolTitle" className="col-span-3"></div>
						<div id="investorStakeBContainer" className="col-span-2"></div>
					</div>
					<div id="investorLeftSideMiddle" className=" bg-slate-900 row-span-3">
					</div>
					<div id="investorLeftSideBottom" className=" bg-slate-800 row-span-2"></div>
				</div>
				<div id="investorRightSide" className=" bg-slate-900 grid grid-cols-5">
					
				</div>
            </div>
        </>
    );
}
