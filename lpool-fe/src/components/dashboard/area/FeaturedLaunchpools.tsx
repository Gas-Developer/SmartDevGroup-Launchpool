"use client";

import { LaunchpoolReference } from "../../interfaces/LaunchpoolReference";
import { IPFSLaunchpoolData } from "../../interfaces/IPFSLaunchpoolData";
import { ipfs_base_URI } from "../../constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { LPCardPreviewContainer } from "../../containers/LPCardPreviewContainer";
import { useRouter } from "next/navigation";
const logger = require("pino")();


export default function FeaturedLaunchpools(props: any) {

	const router = useRouter();
	const ipfsData: IPFSLaunchpoolData[] = props.ipfsData;

	const [previewLPCardData, setPreviewLPCardData] = useState({
        name: "",
        description: "",
        iconURL: "",
        lpWebsite: "",
        tokenWebsite: "",
        tokenAddress: "",
        startLP: BigInt(0), // If startLP and endLP should be BigInt, else use element.startLP
        endLP: BigInt(0), // If startLP and endLP should be BigInt, else use element.endLP
        launchpoolAddress: "",
        cid: "",
        isFeatured: false,
    });

	//logger.info("ipfsData: ", ipfsData);
	// logger.info("props: ", props);

	// const previewLPCardData = {
	// 	imageURL: "",
	// 	startLPValue: BigInt(0),
	// 	endLPValue: BigInt(0),
	// 	checked: false,
	// 	description: "",
	// 	tokenAddress: "",
	// 	webURL: "",
	// 	isFeatured: false,
	// };

	useEffect(() => {

		ipfsData.forEach(element => {
			// logger.info("element: ", element);

			if(!element.isFeatured){
				setPreviewLPCardData({
					name: element.name,
					description: element.description,
					iconURL: element.iconURL,
					lpWebsite: element.lpWebsite,
					tokenWebsite: element.tokenWebsite,
					tokenAddress: element.tokenAddress,
					startLP: element.startLP ? BigInt(element.startLP) : BigInt(0),
					endLP: element.endLP ? BigInt(element.endLP) :  BigInt(0),
					launchpoolAddress: element.launchpoolAddress ? element.launchpoolAddress : "",
					cid: element.cid ? element.cid : "",
					isFeatured: false
				});
			}
		});

		logger.info("previewLPCardData: ", previewLPCardData);
	}, [ipfsData]);

	function toLaunchpoolPage() {
		const href =
			"/dashboard/" + previewLPCardData.launchpoolAddress + "/" + previewLPCardData.cid + "/investor";
		router.push(href);
	}



	return (
		<>
			<div className="featuredLP h-full" onClick={() => toLaunchpoolPage()}>
				<LPCardPreviewContainer {...previewLPCardData} />
			</div>
		</>
	);
}
