"use client";

import { ContractData } from "./interfaces/ContractData";
import { DeployFormContainer } from "./containers/DeployFormContainer";
import { LPCardPreviewContainer } from "./containers/LPCardPreviewContainer";
import { DeployCostsContainer } from "./containers/DeployCostsContainer";
import { useState } from "react";

const logger = require("pino")();

export function CreatorPage(props: any) {

	let contractData: ContractData = {} as ContractData;

	if(contractData.launchpoolAddress === undefined && props.launchpoolAddress !== undefined) 
		contractData.launchpoolAddress = props.launchpoolAddress;
	
	if(contractData.cid === undefined && props.cid !== undefined)
		contractData.cid = props.cid;

	// TODO: Verify that this is the correct way to do this
	// contractData.launchpoolAddress = contractData.launchpoolAddress ? contractData.launchpoolAddress : props.launchpoolAddress;
	// contractData.cid = contractData.cid ? contractData.cid : props.cid;

	const [previewLPCardData, setLPCardPreviewData] = useState({

		imageURL: "https://...",
		startLPValue: BigInt(0),
		endLPValue: BigInt(0),
		checked: false,
		description: "Write the Launchpool / Token description here",
		tokenAddress: "",
		webURL: "https://...",
		isFeatured: false,

	});

	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-1">
					<LPCardPreviewContainer {...previewLPCardData}/>
				</div>
				<div className="col-span-1">
					<DeployFormContainer setLPCardPreviewData={setLPCardPreviewData}/>
					<DeployCostsContainer isFeatured={previewLPCardData.isFeatured} tokenAddress={previewLPCardData.tokenAddress}/>
				</div>
			</div>
			{/* <AreasContainer {...contractData} /> */}
		</>
	);
}
