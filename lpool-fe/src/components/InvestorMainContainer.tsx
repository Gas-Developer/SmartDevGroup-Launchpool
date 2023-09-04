"use client";

import { useContractReads } from "wagmi";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";
import { ContractData } from "./interfaces/ContractData";
import { useState, useEffect } from "react";
import { Stake } from "./Stake";
import { ipfs_base_URI } from "./costants";
import axios from "axios";
import { IPFSLaunchpoolData } from "./interfaces/IPFSLaunchpoolData";
import Image from "next/image";
import { InfoLabel } from "./label/InfoLabel";
import Tokenomics from "./Tokenomics";
import TechnicalInfo from "./TechnicalInfo";

const logger = require("pino")();

export default function InvestorMainContainer(props: any) {
	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;
	const cid = props.cid;

	const [ipfsData, setIpfsData] = useState<IPFSLaunchpoolData | null>(null);

	let dataToSend: ContractData = {} as ContractData;

	useEffect(() => {
		if (cid && cid !== "") {
			const ipfsURI = ipfs_base_URI + cid;
			axios
				.get(ipfsURI, { headers: { Accept: "text/plain" } })
				.then((res) => {
					if (res !== undefined) {
						setIpfsData(res.data);
					}
				})
				.catch((error) => {
					logger.error("Error fetching IPFS data:", error);
					setIpfsData(null);
				});
		}
	}, [cid]);

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
			};
		}

			

		setContractData(dataToSend);
	}, [data]);

	const launchpoolDuration = Math.floor(contractData.stakingLength / 86400);
	let launchpoolPhase = "";

	if (contractData.startLP !== undefined && contractData.endLP !== undefined) {
		const now = new Date().getTime() / 1000;
		if (now < contractData.startLP) {
			launchpoolPhase = "To Starting";
		} else if (now > contractData.startLP && now < contractData.endLP) {
			launchpoolPhase = "Staking Phase";
		} else {
			launchpoolPhase = "Claiming Phase";
		}
	}

	return (
		<>
			<div
				id="investorMainContainer"
				className="bg-zinc-700 grid grid-cols-4 overflow-auto opacity-80 text-2xl"
			>
				<div
					id="investorLeftSide"
					className="col-span-3 grid grid-rows-6"
				>
					<div
						id="investorLeftSideTop"
						className="row-span-1 grid grid-cols-6"
					>
						<div id="imgContainer">
							<Image
								loader={() => ipfsData?.iconURL || ""}
								src={ipfsData?.iconURL || ""}
								alt={ipfsData?.name || ""}
								width={50}
								height={50}
								layout="responsive"
							/>
						</div>
						<div id="launchpoolTitle" className="col-span-3">
							<InfoLabel
								value={ipfsData?.name}
								name={"investorLaunchpoolTitle"}
								className={"text-5xl font-bold"}
							/>
							<br />
							<br />
							<a
								href={ipfsData?.tokenWebsite}
								className="cursor-pointer underline"
							>
								{ipfsData?.tokenWebsite}
							</a>
						</div>
						<div
							id="investorStakeBContainer"
							className="col-span-2 text-center m-auto"
						>
							<Stake
								className={"rounded-full stakeBtn"}
								launchpoolAddress={launchpoolAddress}
							/>
						</div>
					</div>
					<div id="investorLeftSideMiddle" className="row-span-3">
						<InfoLabel
							value={ipfsData?.description}
							name={"investorLaunchpoolDescription"}
							className={"font-sans text-justify"}
						/>
					</div>
					<div
						id="investorLeftSideBottom"
						className="row-span-2 grid grid-cols-2"
					>
						<div className="grid grid-cols-2 gap-3 h-fit text-start">
							<Tokenomics
								tokenAddress={contractData.token}
								totalTokenToDistribute={
									contractData.totalTokenToDistribute
								}
							/>
						</div>

						<div className="grid grid-cols-2 gap-3 h-fit text-end">
							<TechnicalInfo tokenAddress={contractData.token} />
						</div>
					</div>
				</div>
				<div
					id="investorRightSide"
					className="grid grid-rows-4 text-center justify-center items-center"
				>
					<div>
						<InfoLabel
							name={""}
							value={launchpoolPhase}
							className={undefined}
						></InfoLabel>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Total value locked"}
							className={undefined}
						></InfoLabel>
						<br />
						<InfoLabel
							name={""}
							value={
								contractData.totalStaked !== undefined
									? contractData.totalStaked + " MATIC"
									: ""
							}
							className={undefined}
						></InfoLabel>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Ending in"}
							className={undefined}
						></InfoLabel>
						<br />
						<InfoLabel
							name={""}
							value={
								launchpoolDuration !== undefined
									? launchpoolDuration + " Days"
									: ""
							}
							className={undefined}
						></InfoLabel>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Actual Ratio"}
							className={undefined}
						></InfoLabel>
						<br />

						<InfoLabel
							name={""}
							value={"135,7 Token per matic"}
							className={undefined}
						></InfoLabel>
					</div>
				</div>
			</div>
		</>
	);
}
