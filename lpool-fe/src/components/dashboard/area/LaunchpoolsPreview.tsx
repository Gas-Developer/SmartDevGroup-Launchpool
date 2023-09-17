"use client";

import axios from "axios";
import { ipfs_base_URI } from "../../costants";
import { LaunchpoolReference } from "../../interfaces/LaunchpoolReference";
import LaunchpoolPhase from "./LaunchpoolPhase";
import { IPFSLaunchpoolData } from "../../interfaces/IPFSLaunchpoolData";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useContractRead } from "wagmi";
import { LaunchpoolContractConfig } from "../../../abi/launchpool-abi";
const logger = require("pino")();

export default function LaunchpoolsPreviewArea(props: any) {
	const allLaunchpoolReferecence: LaunchpoolReference[] =
		props.allLaunchpoolReferecence;
	const launchpoolToShow = props.type;

	const pathname = usePathname();
	const myProfileContainer = pathname.includes("my-profile") ? true : false;

	const [lpoolStakingPhaseData, setLpoolStakingPhaseData] = useState<
		IPFSLaunchpoolData[]
	>([]);
	const [lpoolClaimingPhaseData, setLpoolClaimingPhaseData] = useState<
		IPFSLaunchpoolData[]
	>([]);
	const [lpoolStartingPhaseData, setLpoolStartingPhaseData] = useState<
		IPFSLaunchpoolData[]
	>([]);

	const [launchpoolAddress, setLaunchpoolAddress] = useState<`0x${string}`>();

	async function setLPPhase(
		launchpoolData: any,
		launchpoolAddress: string | undefined,
		cid: string | undefined
	) {
		const now = new Date();
		const start = new Date(launchpoolData.startLP * 1000);
		const end = new Date(launchpoolData.endLP * 1000);
		launchpoolData.launchpoolAddress = launchpoolAddress;
		launchpoolData.cid = cid;

		setLaunchpoolAddress(launchpoolData.launchpoolAddress);

		if (now < start) {
			setLpoolStartingPhaseData((prevData) => [
				...prevData,
				{ ...launchpoolData },
			]);
		} else if (now > start && now < end) {
			if (myProfileContainer) {
				// if (launchpoolAddress) {
				// 	const staked = await refetch();
				// 	logger.info("Ho stakato ", staked);
				// 	if (staked.data && staked.data > BigInt(0)) {
                //         setLpoolStakingPhaseData((prevData) => [
                //             ...prevData,
                //             { ...launchpoolData },
                //         ]);
                //     }
				// }
			} else {
				setLpoolStakingPhaseData((prevData) => [
					...prevData,
					{ ...launchpoolData },
				]);
			}
		} else if (now > end) {
			setLpoolClaimingPhaseData((prevData) => [
				...prevData,
				{ ...launchpoolData },
			]);
		}
	}

	const { data, isLoading, isSuccess, refetch } = useContractRead({
		...LaunchpoolContractConfig,
		functionName: "getMyTotalStaked",
		address: launchpoolAddress,
		enabled: false,
		account: "0x9dC8812Cda50C7a00cacEa3dabf65739e6f30329",
	});

	useEffect(() => {
		allLaunchpoolReferecence.forEach((launchpool: LaunchpoolReference) => {
			const storageURI = launchpool.storageURI;
			if (storageURI && storageURI !== "") {
				const ipfsURI = ipfs_base_URI + storageURI;
				axios
					.get(ipfsURI, { headers: { Accept: "text/plain" } })
					.then((res) => {
						if (res !== undefined) {
							setLPPhase(
								res.data,
								launchpool.launchpoolAddress,
								launchpool.storageURI
							);
						}
					});
			}
		});
	}, [allLaunchpoolReferecence]);

	return (
		<>
			{myProfileContainer ? (
				<div>
					<LaunchpoolPhase
						phase={launchpoolToShow}
						launchpools={
							launchpoolToShow === "staked"
								? lpoolStakingPhaseData
								: launchpoolToShow === "toClaim"
								? lpoolClaimingPhaseData
								: lpoolStartingPhaseData
						}
					/>
				</div>
			) : (
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
			)}
		</>
	);
}
