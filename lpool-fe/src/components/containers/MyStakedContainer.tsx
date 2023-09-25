"use client";

import axios from "axios";

import { useAccount } from "wagmi";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../app/Context/store";
import { weiToMatic } from "../../utils/weiCasting";
import MiniLPCard from "../cards/MiniLPCard";
import { LPCardPreviewContainer } from "./LPCardPreviewContainer";
import { defaultNoImage } from "../constants";
import Image from 'next/image'
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

	const { address, isConnected } = useAccount()


	const PolygonScanBaseURL = process.env.NEXT_PUBLIC_POLYGONSCAN_API_URL;
	const PolygonScanActionURL = "?module=account&action=txlist&&startblock=0&endblock=99999999&page=1&offset=50&sort=desc";
	const PolygonScanAPIKEYURL = "&apikey="+process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY;
	//const PolygonScanAddress = "&address=0xf40CcC851DBB641a28baB94D2dAB81bb549ffD8a";
	const PolygonScanAddress = "&address=0x44aae84107ffa4f3a1c0382648d726b56cb60020"; 
	//const PolygonScanAddress = "&address="; 

	// Conterrà la lista delle transazioni dell'utente, filtrate per le funzioni che ci interessano (stake, claim(), unstake(), depositTokenToDistribute, deployClone)
	const [userTXList, setUserTXList] = useState<userTX[]>([]);
	const [myStaked, setMyStaked] = useState<AggregatedTransaction[]>([]);

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

    const {
        allLaunchpoolReferenceGContext,
        setAllLaunchpoolReferenceGContext,
        ipfsDataGContext,
        setIpfsDataGContext,
    } = useGlobalContext();

	// logger.info("allLaunchpoolReferenceGContext: ", allLaunchpoolReferenceGContext);
	// logger.info("ipfsDataGContext: ", ipfsDataGContext);



	function getMyStaked() {
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

		// Azzero quelle che hanno fatto l'unstake
		// userTXList.forEach(function (item: userTX) {
		// 	if (item.functionName === "unstake()") {

		// 		const to = item.to;
		// 		const value = BigInt(item.value);
		// 		if (aggregatedValues.has(to)) {
		// 			aggregatedValues.set(to, BigInt(0));
		// 		} else {
		// 			// Inserisci gestione errore se si verifica una transazione "unstake()" senza una corrispondente "stake()"
		// 			console.log("Error - Unstake senza Stake");
		// 		}
		// 	}
		// });

		// Rimuovo quelle di cui l'utente ha fatto l'unstake
		userTXList.forEach(function (item) {
			if (item.functionName === "unstake()") {
				const to = item.to;
				const value = BigInt(item.value);
			
				if (aggregatedValues.has(to)) {
					aggregatedValues.set(to, BigInt(0));
					aggregatedValues.delete(to); // Rimuovi l'elemento da aggregatedValues
				} else {
					console.log("Error - Unstake senza Stake");
				}
			}
		});
		
	
		// Creare un nuovo array di oggetti AggregatedTransaction con i valori aggregati
		const aggregatedMyStaked: AggregatedTransaction[] = Array.from(aggregatedValues.keys()).map((to) => ({
			to,
			value: aggregatedValues.get(to)!.toString(),
			functionName: "stake()", // Puoi impostare "stake()" poiché stiamo solo calcolando stake
		}));

		// TODO: Scorrere le allLaunchpoolReferenceGContext e confrontarle con le aggregatedMyStaked
		// usare startLP e endLP per capire se la LP è ancora nella stking phase o nella claiming phase
		logger.info("allLaunchpoolReferenceGContext: ", allLaunchpoolReferenceGContext);
		logger.info("ipfsDataGContext: ", ipfsDataGContext);

		setMyStaked(aggregatedMyStaked);
	}




    return (
		<ul className=" text-slate-200 text-sm">
						
				{/* <div className=" text-slate-200 text-sm"> */}
				{
					myStaked?.map((stakeTX: AggregatedTransaction, index: number) => (
						<li key={index} id={`staked${index}`} className=" grid-cols-4 grid-flow-col flex  align-middle">
							<div className="text-xs text-slate-500 col-span-1  p-4 align-middle">
								{/* <MiniLPCard launchpoolAddress={stakeTX.to} /> */}
								{/* <LPCardPreviewContainer launchpoolAddress={stakeTX.to} imageURL={defaultNoImage}/> */}
									<Image
										className=""
										loader={() => defaultNoImage}
										src={defaultNoImage}
										alt={"Launchpool Image"}
										width={50}
										height={50}
										unoptimized={true}
									/>

							</div>
							<div className="text-xs text-slate-500 col-span-3  align-middle pt-10">
								LP: {stakeTX.to}<br/>
								value: {weiToMatic(stakeTX.value, 18)} MATIC
							</div>
						</li>
					))
				}
			{/* </div> */}
		</ul>

	);
}