"use client";

import axios from "axios";

import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../app/Context/store";
import { weiToMatic } from "../../utils/weiCasting";
import MiniLPCard from "../cards/MiniLPCard";
import { LPCardPreviewContainer } from "./LPCardPreviewContainer";
import { defaultNoImage, getPhase } from "../constants";
import Image from 'next/image'
import { LaunchpoolReference } from "../interfaces/LaunchpoolReference";
import { IPFSLaunchpoolData } from "../interfaces/IPFSLaunchpoolData";
import TrasparentContainer from "./TrasparentContainer";
import DefaultContainer from "./DefaultContainer";
import { InfoLabel } from "../label/InfoLabel";
const logger = require("pino")();


export default function MyStakedContainer(props:any) {

	interface userTX {
		from: string;
		to: string;
		functionName: string;
		input: string;
		value: string;
		timestamp: string;
		hash: string;
	}

	interface AggregatedTransaction {
		to: string;
		value: string;
		functionName: string;
	}

	interface MyLPs {
		name: string;
		cid: string;
		description: string;
		endLP: string;
		functionName: string;
		iconURL: string;
		index: number;
		launchpoolAddress: string;
		phase: string;
		startLP: string;
		storageURI: string;
		to: string;
		tokenAddress: string;
		tokenWebsite: string;
		value: string;
	}


	const { address, isConnected } = useAccount()
	const {
		allLaunchpoolReferenceGContext,
		ipfsDataGContext,
	} = useGlobalContext();

	const PolygonScanBaseURL = process.env.NEXT_PUBLIC_POLYGONSCAN_API_URL;
	const PolygonScanActionURL = "?module=account&action=txlist&&startblock=0&endblock=99999999&page=1&offset=50&sort=desc";
	const PolygonScanAPIKEYURL = "&apikey="+process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
	//const PolygonScanAddress = "&address=0xf40CcC851DBB641a28baB94D2dAB81bb549ffD8a";
	const PolygonScanAddress = "&address=0x44aae84107ffa4f3a1c0382648d726b56cb60020"; 
	//const PolygonScanAddress = "&address="; 

	// Conterrà la lista delle transazioni dell'utente, filtrate per le funzioni che ci interessano (stake, claim(), unstake(), depositTokenToDistribute, deployClone)
	const [userTXList, setUserTXList] = useState<userTX[]>([]);
	const [myStaked, setMyStaked] = useState<MyLPs[]>([]);

	// TODO: Gestire PolygonScanAPICallURL come uno stato. id isConnected && address !="" PolygonScanAPICallURL = PolygonScanBaseURL+PolygonScanActionURL+PolygonScanAPIKEYURL+PolygonScanAddress+address?.toString();


	useEffect(() => {
		// TODO: Riattivare e disattivare quella sopra che setta uno specifico address
		// const PolygonScanAddress = "&address="+address?.toString();
		const PolygonScanAPICallURL = PolygonScanBaseURL+PolygonScanActionURL+PolygonScanAPIKEYURL+PolygonScanAddress;

		axios
			.get(PolygonScanAPICallURL, { headers: { Accept: "text/json" } })
			.then((res) => {

				// console.log(res.data);
				logger.info("**** PolygonScan API Data ****");

				//console.log(res.data);
				if (res !== undefined) {
					const userDinamicTXList: userTX[] = []; 
					res.data.result.forEach(function (
						item: userTX, index: any) {
						// console.log(item);
						// console.log(item.hash);
						if(
							item.functionName == "deployClone(address _implementationContract,address _token,uint256 _startLP,uint256 _endLP,string storageURI)" || 
							item.functionName == "depositTokenToDistribute(uint256 _amount)" || 
							item.functionName == "stake()" ||
							item.functionName == "unstake()" ||
							item.functionName == "claim()"
						)

						userDinamicTXList.push({
							from: item.from,
							to: item.to,
							functionName: item.functionName,
							input: item.input,
							value: item.value,
							timestamp: item.timestamp,
							hash: item.hash
						});
					});

				if(userDinamicTXList.length > 0 ){
					setUserTXList(userDinamicTXList);
				}

				}

				// console.log("**** END PolygonScan API Data ****");
				logger.info("**** END PolygonScan API Data ****");

			});
	}, []);


	useEffect(() => {
		// console.log("userTXList");
		// console.log(userTXList);
		getMyStaked();																	// Seleziono solo le tx stake e rimuovo le corrispondenti unstake
	}, [userTXList]);



	// logger.info("allLaunchpoolReferenceGContext: ", allLaunchpoolReferenceGContext);
	// logger.info("ipfsDataGContext: ", ipfsDataGContext);



	function getMyStaked() {

		const MyStaked: any[] = [];
		const tmpMyStaked: userTX[] = [];
	
		// Creare una mappa per tenere traccia delle somme dei valori per ogni 'to'
		const aggregatedValues = new Map<string, bigint>();

		// Faccio la somma delle Stake e la salvo in aggregatedValues
		userTXList.forEach(function (item: userTX) {
			if (item.functionName === "stake()") {
				tmpMyStaked.push(item);
	
				const to = item.to;
				const value = BigInt(item.value);
	
				if (item.functionName === "stake()") {
					if (aggregatedValues.has(to)) {
						aggregatedValues.set(to, aggregatedValues.get(to)! + value);
					} else {
						aggregatedValues.set(to, value);
					}
				} 
			}
		});

		// Rimuovo quelle di cui l'utente ha fatto l'unstake
		userTXList.forEach(function (item) {
			if (item.functionName === "unstake()") {
				const to = item.to;

				if (aggregatedValues.has(to)) {
					aggregatedValues.set(to, BigInt(0));
					aggregatedValues.delete(to); // Rimuovi l'elemento da aggregatedValues
				}
			}
		});

		// Creo un nuovo array di oggetti AggregatedTransaction con i valori aggregati
		const aggregatedMyStaked: AggregatedTransaction[] = Array.from(aggregatedValues.keys()).map((to) => ({
			to,
			value: aggregatedValues.get(to)!.toString(),
			functionName: "stake()", // Puoi impostare "stake()" poiché stiamo solo calcolando stake
		}));


		logger.info("allLaunchpoolReferenceGContext: ", allLaunchpoolReferenceGContext);
		logger.info("ipfsDataGContext: ", ipfsDataGContext);

		// Aggiungo la phase e le ipfsInfo a allLaunchpoolsWithPhase
		const allLaunchpoolsWithPhase = getAllLaunchpoolsWithIPFSDataAndPhase(allLaunchpoolReferenceGContext, ipfsDataGContext);

		// Cerco le LP che corrispondono a quelle stakate dall'utente e le aggiungo a MyStaked
		aggregatedMyStaked.forEach(stakedItem => {

			const cleanedStakedTo = stakedItem.to.replace(/\s+/g, '').toLowerCase(); // Rimuove tutti gli spazi
			const matchingLaunchpool = allLaunchpoolsWithPhase.find(lp => lp.launchpoolAddress.toLowerCase() === cleanedStakedTo);
			
			if (matchingLaunchpool) {
				const index = allLaunchpoolsWithPhase.indexOf(matchingLaunchpool);

				const combinedData = {
					index,
					...stakedItem,
					...matchingLaunchpool,
				};

				MyStaked.push(combinedData);
			}
		});

		console.log("MyStaked", MyStaked);

		setMyStaked(MyStaked);
	}

	// Restituisce un array di oggetti contenenti le informazioni di allLaunchpoolReferenceGContext, ipfsDataGContext e la phase
	function getAllLaunchpoolsWithIPFSDataAndPhase( allLaunchpoolReferenceGContext: LaunchpoolReference[], ipfsDataGContext: IPFSLaunchpoolData[]) {

		const allLaunchpoolsWithPhase: any[] = [];

		allLaunchpoolReferenceGContext.forEach((launchpool, index) => {
			const ipfsData = ipfsDataGContext[index];
			const phase = getPhase(ipfsData);

			const combinedData = {
				...launchpool,
				...ipfsData,
				phase
			};

			allLaunchpoolsWithPhase.push(combinedData);
		});

		return allLaunchpoolsWithPhase;

	}





	return (
		<>
			<TrasparentContainer className={" "}>
				<ul className=" text-slate-200 text-sm">
						{
							myStaked?.map((stakeTX: MyLPs, index: number) => (
								<li key={index} id={`staked${index}`} >
									<DefaultContainer className=" defaultContainer grid-cols-4 flex align-middle m-2">
										<div className="text-xs text-slate-500 col-span-1 p-4 align-middle">

												<Image
													className=""
													loader={() => stakeTX.iconURL}
													src={stakeTX.iconURL}
													alt={"Launchpool Image"}
													width={64}
													height={64}
													unoptimized={true}
												/>

										</div>
										<div className="text-xs text-slate-500 col-span-2 align-middle">
											<InfoLabel name={"LPNameValue"} value={stakeTX.name} className={""}  />
											<InfoLabel name={"LPDescValue"} value={stakeTX.description} className={""}  />

											LP: {stakeTX.to}<br/>
											value: {weiToMatic(stakeTX.value, 18)} MATIC
										</div>
										<div className="text-xs text-slate-500 col-span-1 text-right align-middle p-3">
											Phase: {stakeTX.phase}
										</div>
 
									</DefaultContainer>
								</li>
							))
						}
				</ul>
			</TrasparentContainer>
		</>

	);
}