"use client";

import { useContractReads } from "wagmi";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";
import { ContractData } from "./interfaces/ContractData";
import { useState, useEffect, useRef } from "react";
import { Stake } from "./Stake";
import { defaultNoImage, ipfs_base_URI } from "./constants";
import axios from "axios";
import { IPFSLaunchpoolData } from "./interfaces/IPFSLaunchpoolData";
import Image from "next/image";
import { InfoLabel } from "./label/InfoLabel";
import Tokenomics from "./Tokenomics";
import TechnicalInfo from "./TechnicalInfo";
import TrasparentContainer from "./containers/TrasparentContainer";
import DefaultContainer from "./containers/DefaultContainer";
import PhaseInvestingImg from "../assets/images/PhaseInvesting.png";
import { ethers } from "ethers";
import { weiToMatic } from "../utils/weiCasting";

const logger = require("pino")();

/* TODO:
	- [ ] Implemntare calcolo circulatingSupply
	- [ ] Implementare lettura dell'expectedListing
	- [ ] Implementare lettura del blockchainName
	- [ ] Implementare lettura del tokenWebsite
	- [ ] Implementare lettura del tokenSymbol
	- [ ] Implementare lettura del tokenName
	- [ ] Implementare lettura del launchpoolCreator
	- [ ] Implementare calcolo dell'Actual Ratio
*/

export default function InvestorMainContainer(props: any) {
	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;
	const cid = props.cid;

	const [ipfsData, setIpfsData] = useState<IPFSLaunchpoolData | null>(null);

	let dataToSend: ContractData = {} as ContractData;
	const actualRatioRef = useRef<number | null>(null);

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
				totalTokenToDistribute: weiToMatic(
					data?.[4].result?.toString(),
					0
				),
				totalStaked:
					data?.[5].result !== undefined
						? weiToMatic(data?.[5].result?.toString(), 2)
						: 0,
			};
		}

		let actRatio = (
			dataToSend.totalTokenToDistribute / dataToSend.totalStaked
		).toFixed();
		actualRatioRef.current = weiToMatic(actRatio.toString(), 1);

		setContractData(dataToSend);
	}, [data]);

	const launchpoolDuration = Math.floor(contractData.stakingLength / 86400);
	let launchpoolPhase = "";

	if (
		contractData.startLP !== undefined &&
		contractData.endLP !== undefined
	) {
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
			<TrasparentContainer className={""}>
				<div className="grid grid-cols-4 gap-1 h-fit text-start">
					<div className=" col-span-3 text-center">
						{" "}
						{/* Colonna #1 da 3 spazi */}
						<div className=" grid-flow-row grid-rows-8">
							{/* Riga #1 */}
							<div className="row-span-1 grid grid-cols-9">
								<div
									id="imgContainer"
									className="col-span-1 bg-slate-700 bg-opacity-25 p-3 rounded-lg"
								>
									<Image
										loader={() =>
											ipfsData?.iconURL || defaultNoImage
										}
										src={
											ipfsData?.iconURL || defaultNoImage
										}
										alt={ipfsData?.name || ""}
										width={50}
										height={50}
										layout="responsive"
									/>
								</div>
								<div
									id="launchpoolTitle"
									className="col-span-4"
								>
									<InfoLabel
										value={ipfsData?.name}
										name={"investorLaunchpoolTitle"}
										className={"text-2xl text-stale-200"}
									/>
									<div className="text-sm link-info link-opacity-75 link-opacity-100-hover text-left pl-3">
										<a
											href={ipfsData?.tokenWebsite}
											className="cursor-pointer underline"
										>
											{ipfsData?.tokenWebsite}
										</a>
									</div>
								</div>
								<div
									id="investorStakeBContainer"
									className="col-span-4 text-right m-auto"
								>
									<div className=" bg-orange-400 rounded-lg  ">
										<Stake
											className={"rounded-full stakeBtn"}
											launchpoolAddress={
												launchpoolAddress
											}
										/>
									</div>
								</div>
							</div>
							{/* Fine Riga #1 */}

							{/* Riga #2 da 3 spazi */}
							<div className="row-span-3 border-1 border-slate-200 border-opacity-5 rounded-lg mt-4">
								<DefaultContainer>
									<div className="text-slate-200 text-opacity-75 text-sm font-sans text-justify">
										{ipfsData?.description}
									</div>
								</DefaultContainer>
							</div>
							{/* Fine Riga #2 da 3 spazi */}
							{/* Riga #3 da 1 spazio */}
							<div className="row-span-1 mt-4">
								<DefaultContainer>
									<div className="grid grid-cols-2 gap-3 h-fit text-start pl-5 pr-5 ml-5 mr-5">
										<div className="col-span-1">
											<Tokenomics
												tokenAddress={
													contractData.token
												}
												totalTokenToDistribute={
													contractData.totalTokenToDistribute
												}
												circulatingSupply={undefined}
												blockchainName={"Polygon"}
												expectedListing={undefined}
											/>
										</div>
										<div className="col-span-1">
											<TechnicalInfo
												tokenAddress={
													contractData.token
												}
											/>
										</div>
									</div>
								</DefaultContainer>
							</div>
						</div>
					</div>
					{/* Phase Area */}
					<div className=" col-span-1 text-center">
						{" "}
						{/* Colonna #2 da 1 spazio */}
						<div className="grid grid-rows-20 text-center justify-center items-center">
							<div className="row-span-3">
								<Image
									className="h-full w-auto"
									src={PhaseInvestingImg}
									alt={"PhaseInvesting"}
									width={200}
									height={150}
								/>
							</div>
							{/* Block #1 */}
							<div className="row-span-1 text-xs font-medium">
								<InfoLabel
									name={""}
									value={"TOTAL VALUE LOCKED"}
									className={""}
								/>
							</div>
							<div className="row-span-3  text-5xl font-semibold pt-4 pb-2">
								<InfoLabel
									name={""}
									value={
										contractData.totalStaked
											? contractData.totalStaked.toString()
											: "--"
									}
									className={""}
								/>
							</div>
							<div className="row-span-1 text-xs font-bold pb-4">
								<InfoLabel
									name={""}
									value={"MATIC"}
									className={""}
								/>
							</div>
							<div className="row-span-1 text-xs font-bold">
								<hr />
							</div>
							{/* Block #2 */}
							<div className="row-span-1 text-xs font-medium pt-4">
								<InfoLabel
									name={""}
									value={"ENDING IN"}
									className={""}
								/>
							</div>
							<div className="row-span-3  text-5xl font-semibold pt-4 pb-2">
								<InfoLabel
									name={""}
									value={
										launchpoolDuration
											? launchpoolDuration.toString()
											: ""
									}
									className={""}
								/>
							</div>
							<div className="row-span-1 text-xs font-bold pb-4">
								<InfoLabel
									name={""}
									value={"days"}
									className={""}
								/>
							</div>
							<div className="row-span-1 text-xs font-bold">
								<hr />
							</div>

							{/* Block #3 */}
							<div className="row-span-1 text-xs font-medium pt-4">
								<InfoLabel
									name={""}
									value={"ACTUAL RATIO"}
									className={""}
								/>
							</div>
							<div className="row-span-3  text-5xl font-semibold pt-4 pb-2">
								<InfoLabel
									name={""}
									value={actualRatioRef.current?.toString()}
									className={""}
								/>
							</div>
							<div className="row-span-1 text-xs font-bold pb-4">
								<InfoLabel
									name={""}
									value={
										props.tokenSymbol
											? props.tokenSymbol + " per Matic"
											: "TOKEN per Matic"
									}
									className={""}
								/>
							</div>
						</div>
					</div>
				</div>
			</TrasparentContainer>

			{/* 
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
						/>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Total value locked"}
							className={undefined}
						/>
						<br />
						<InfoLabel
							name={""}
							value={	contractData.totalStaked ? contractData.totalStaked + "weiMATIC" : "--" }
							className={undefined}
						/>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Ending in"}
							className={undefined}
						/>
						<br />
						<InfoLabel
							name={""}
							value={
								launchpoolDuration !== undefined
									? launchpoolDuration + " Days"
									: ""
							}
							className={undefined}
						/>
					</div>
					<div>
						<InfoLabel
							name={""}
							value={"Actual Ratio"}
							className={undefined}
						/>
						<br />

						<InfoLabel
							name={""}
							value={"135,7 Token per matic"}
							className={undefined}
						/>
					</div>
				</div>
			</div> */}
		</>
	);
}
