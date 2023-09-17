import '../../assets/styles/controls-list.css'

import axios from "axios";
import { ipfs_base_URI } from "../constants";
import { InfoLabel } from "../label/InfoLabel";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { ControlButton } from "../buttons/ControlButton";
import { InvestorPage } from '../InvestorPage';
import Link from 'next/link';
import { useRouter } from "next/navigation";
const logger = require("pino")();

export function LPCard(props: any) {

	const router = useRouter();

	const [lpCardInfo, setLPCardInfo] = useState({
		name: "", 
		description: undefined, 
		iconURL: "", 
		lpWebsite: "", 
		tokenWebsite: ""
	});

	const storageURI = props.storageURI;
	const launchpoolAddress = props.launchpoolAddress;

	// Se props.storageURI cambia, esegui la funzione useEffect
	useEffect(() => {
		if (storageURI && storageURI !== "") {
			const ipfsURI = ipfs_base_URI + storageURI;
			logger.info(ipfsURI);
			axios.get(ipfsURI).then((res) => {
				logger.info(res.data);
				setLPCardInfo({ ...res.data });
			});
		}
	}, [storageURI]); // L'hook useEffect verrà eseguito solo quando props.storageURI cambia

	let lp_website: ControlButtonData = {
		name: "lp_website",
		text: "Website",
		tooltip: "Launchpool Website",
		onClick: () => {
			if(lpCardInfo.lpWebsite && lpCardInfo.lpWebsite !== "")
				window.open(lpCardInfo.lpWebsite, '_blank')
		},
		disabled: false,
		className: "card-button",
		iconURL: ""
	};
	let token_website: ControlButtonData = {
		name: "token_website",
		text: "Token Website",
		tooltip: "Token Website",
		onClick: () => {
			if(lpCardInfo.tokenWebsite && lpCardInfo.tokenWebsite !== "")
				window.open(lpCardInfo.tokenWebsite, '_blank')
		}
		,
		disabled: false,
		className: "card-button",
		iconURL: ""
	};

	function toLaunchpoolPage() {
        const href = "/dashboard/" + launchpoolAddress + "/investor";
        router.push(href);
    }

	return (
		<div
			id="lp-card-container"
			className="card"
			onClick={() => toLaunchpoolPage()}
		>
			{lpCardInfo.iconURL && lpCardInfo.iconURL !== "" ? (
				<div id="card-img-container">
					<Image
						loader={() => lpCardInfo.iconURL}
						src={lpCardInfo.iconURL}
						alt={lpCardInfo.name}
						width={250}
						height={200}
						layout="responsive"
					/>
				</div>
			) : (
				""
			)}
			<ul>
				{lpCardInfo.name && lpCardInfo.name !== "" ? (
					<li className={"text-center"}>
						<InfoLabel
							name={lpCardInfo.name + "Label"}
							value={lpCardInfo.name}
							className={"card-title"}
						/>
					</li>
				) : (
					""
				)}

				{lpCardInfo.description && lpCardInfo.description !== "" ? (
					<li>
						<InfoLabel
							name={lpCardInfo.description + "Label"}
							value={lpCardInfo.description}
							className={"card-description"}
						/>
					</li>
				) : (
					""
				)}
				<li>
					<hr />
				</li>
				{lpCardInfo.lpWebsite &&
				lpCardInfo.lpWebsite !== "" &&
				lpCardInfo.tokenWebsite &&
				lpCardInfo.tokenWebsite != "" ? (
					<li>
						<div className="inline-flex width-100">
							{lpCardInfo.lpWebsite &&
								lpCardInfo.lpWebsite !== "" && (
									<ControlButton {...lp_website} />
								)}
							{lpCardInfo.tokenWebsite &&
								lpCardInfo.tokenWebsite != "" && (
									<ControlButton {...token_website} />
								)}
						</div>
					</li>
				) : (
					""
				)}
			</ul>
		</div>
	);

}
