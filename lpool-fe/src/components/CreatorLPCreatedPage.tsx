"use client";

import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";
import { LPCard } from "./cards/LPCard";
import { DepositFormContainer } from "./containers/DepositFormContainer";
import { LPCardPreviewContainer } from "./containers/LPCardPreviewContainer";
import { DepositInfoContainer } from "./containers/DepositInfoContainer";
import { useEffect, useState } from "react";
import { ipfs_base_URI } from "./constants";
import axios from "axios";
import { useAccount } from "wagmi";

const logger = require("pino")();

export function CreatorLPCreatedPage(props: any) {

	let contractData: ContractData = {} as ContractData;

	if(contractData.launchpoolAddress === undefined && props.launchpoolAddress !== undefined) 
		contractData.launchpoolAddress = props.launchpoolAddress;
	
	if(contractData.cid === undefined && props.cid !== undefined)
		contractData.cid = props.cid;

	const [cid, setCid] = useState(props.cid);
	const { address } = useAccount();

	const [previewLPCardData, setLPCardPreviewData] = useState({

		imageURL: "",
		startLPValue: BigInt(0),
		endLPValue: BigInt(0),
		checked: false,
		description: "",
		tokenAddress: "",
		webURL: "",
		isFeatured: false,

	});

	// Leggo i dati da IPFS e setto previewLPCardData 
	useEffect(() => {
		if (cid && cid !== "") {
			const ipfsURI = ipfs_base_URI + cid;
			axios
				.get(ipfsURI, { headers: { Accept: "text/plain" } })
				.then((res) => {
					if (res !== undefined) {

						let data = {
							imageURL: res.data.iconURL,
							startLPValue: BigInt(res.data.startLP),
							endLPValue: BigInt(res.data.endLP),
							checked: false,
							description: res.data.description,
							tokenAddress: res.data.tokenAddress,
							webURL: res.data.tokenWebsite,
							isFeatured: res.data.feature ? res.data.feature : false,
						};

						//logger.info("res.data: ", res.data);
						//logger.info("data: ", data);

						setLPCardPreviewData(data);

					}
				})
				.catch((error) => {
					logger.error("Error fetching IPFS data:", error);
				});
		}
	}, [cid]);

	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-1">
					<LPCardPreviewContainer {...previewLPCardData}/>
				</div>
				<div className="col-span-1">
					<DepositFormContainer setLPCardPreviewData={setLPCardPreviewData} launchpoolAddress={props.launchpoolAddress}/>
					<DepositInfoContainer launchpoolAddress={props.launchpoolAddress} isFeatured={previewLPCardData.isFeatured} tokenAddress={previewLPCardData.tokenAddress} account={address}/>
				</div>
			</div>
		</>
	);
}
