"use client";

import axios from "axios";
import { ipfs_base_URI } from "../../costants";
import { LaunchpoolReference } from "../../interfaces/LaunchpoolReference";
import LaunchpoolPhase from "./LaunchpoolPhase";
import { ipfsDataTest } from "../../../utils/mockup/ipfsdata";
const logger = require("pino")();

export default function LaunchpoolsPreviewArea(props: any) {

    logger.info("LaunchpoolsPreviewArea props", props.allLaunchpoolReferecence);

	const allLaunchpoolReferecence: LaunchpoolReference[] =
		props.allLaunchpoolReferecence;

	interface miniLPCardObj {
		name: string;
		iconURL: string;
        launchpoolAddress: string;
	}

	const lpoolStakingPhase: miniLPCardObj[] = [];
	const lpoolClaimingPhase: miniLPCardObj[] = [];
	const lpoolStartingPhase: miniLPCardObj[] = [];

	allLaunchpoolReferecence.map((launchpool: LaunchpoolReference) => {
		const storageURI = launchpool.storageURI;
		if (storageURI && storageURI !== "") {
			const ipfsURI = ipfs_base_URI + storageURI;
			// logger.info(ipfsURI);

            const config = {
                headers: {
                    Accept: "text/plain",
                },
            };

            axios.get(ipfsURI,config).then((res) => {
                // logger.info(res.data);
				if (res !== undefined) setLPPhase(res.data, launchpool.launchpoolAddress);
			});
		}
    
	});

    // ipfsDataTest.map((ipfsData) => {
    //     setLPPhase(ipfsData);
    // });

	function setLPPhase(launchpoolData: any, launchpoolAddress: string | undefined) {
        const now = new Date();
        const start = new Date(launchpoolData.startLP * 1000);
        const end = new Date(launchpoolData.endLP * 1000);
        launchpoolData.launchpoolAddress = launchpoolAddress;
        if (now < start) {
            lpoolStartingPhase.push({ ...launchpoolData });
        } else if (now > start && now < end) {
            lpoolStakingPhase.push({ ...launchpoolData });
        } else if (now > end) {
            lpoolClaimingPhase.push({ ...launchpoolData });
        }
    }

	return (
        <>
            <div id="allPhaseContainer" className="grid grid-cols-2">
                <LaunchpoolPhase
                    phase="Staking"
                    launchpools={lpoolStakingPhase}
                />
                <LaunchpoolPhase
                    phase="Claiming"
                    launchpools={lpoolClaimingPhase}
                />
                <LaunchpoolPhase
                    phase="Starting"
                    launchpools={lpoolStartingPhase}
                />
            </div>
        </>
    );
}
