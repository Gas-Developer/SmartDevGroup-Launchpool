"use client";

import axios from "axios";
import { ipfs_base_URI } from "../../costants";
import { LaunchpoolReference } from "../../interfaces/LaunchpoolReference";
import LaunchpoolPhase from "./LaunchpoolPhase";
import { IPFSLaunchpoolData } from "../../interfaces/IPFSLaunchpoolData";
import { useEffect, useState } from "react";
const logger = require("pino")();

export default function LaunchpoolsPreviewArea(props: any) {

	const allLaunchpoolReferecence: LaunchpoolReference[] = props.allLaunchpoolReferecence;

	const [lpoolStakingPhaseData, setLpoolStakingPhaseData] = useState<IPFSLaunchpoolData[]>([]);
	const [lpoolClaimingPhaseData, setLpoolClaimingPhaseData] = useState<IPFSLaunchpoolData[]>([]);
	const [lpoolStartingPhaseData, setLpoolStartingPhaseData] = useState<IPFSLaunchpoolData[]>([]);

	function setLPPhase(
		launchpoolData: any,
		launchpoolAddress: string | undefined
	) {
		const now = new Date();
		const start = new Date(launchpoolData.startLP * 1000);
		const end = new Date(launchpoolData.endLP * 1000);
		launchpoolData.launchpoolAddress = launchpoolAddress;
		if (now < start) {
			setLpoolStartingPhaseData((prevData) => [
				...prevData,
				{ ...launchpoolData },
			]);
		} else if (now > start && now < end) {
			setLpoolStakingPhaseData((prevData) => [
				...prevData,
				{ ...launchpoolData },
			]);
		} else if (now > end) {
			setLpoolClaimingPhaseData((prevData) => [
				...prevData,
				{ ...launchpoolData },
			]);
		}
	}

	useEffect(() => {
		allLaunchpoolReferecence.forEach((launchpool: LaunchpoolReference) => {
			const storageURI = launchpool.storageURI;
			if (storageURI && storageURI !== "") {
				const ipfsURI = ipfs_base_URI + storageURI;
				axios
					.get(ipfsURI, { headers: { Accept: "text/plain" } })
					.then((res) => {
						if (res !== undefined) {
							setLPPhase(res.data, launchpool.launchpoolAddress);
						}
					});
			}
		});
	}, [allLaunchpoolReferecence]); 

	return (
		<>
			<div id="allPhaseContainer" className="grid grid-cols-2">
				<LaunchpoolPhase
					phase="Staking"
					launchpools={lpoolStakingPhaseData}
				/>
				<LaunchpoolPhase
					phase="Claiming"
					launchpools={lpoolClaimingPhaseData}
				/>
				<LaunchpoolPhase
					phase="Starting"
					launchpools={lpoolStartingPhaseData}
				/>
			</div>
		</>
	);
}
