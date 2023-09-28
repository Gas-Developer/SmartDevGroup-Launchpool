"use client";

import LaunchpoolPhase from "./LaunchpoolPhase";
import { IPFSLaunchpoolData } from "../../interfaces/IPFSLaunchpoolData";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useContractRead } from "wagmi";
import { LaunchpoolContractConfig } from "../../../abi/template-abi";
const logger = require("pino")();

export default function LaunchpoolsPreviewArea(props: any) {
	const launchpoolToShow = props.type;
	const ipfsData = props.ipfsData;

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

	useEffect(() => {
		if (ipfsData !== undefined) {
			ipfsData.forEach((ipfsLaunchpoolData: IPFSLaunchpoolData) => {
				setLPPhase(ipfsLaunchpoolData);
			});
		}
	}, [ipfsData]);

	async function setLPPhase(launchpoolData: any) {
		const now = new Date();

		const start = new Date(launchpoolData.startLP * 1000);
		const end = new Date(launchpoolData.endLP * 1000);

		const lpAddress = launchpoolData.launchpoolAddress; // Memorizza l'indirizzo in una variabile

		setLaunchpoolAddress(lpAddress); // Aggiorna l'indirizzo

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

	const { data, isLoading, isSuccess, refetch } = useContractRead({
		...LaunchpoolContractConfig,
		functionName: "getMyTotalStaked",
		address: launchpoolAddress,
		enabled: false,
		account: "0x9dC8812Cda50C7a00cacEa3dabf65739e6f30329",
	});

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
					className={ "mb-20"}
				/>
			</div>
		</>
	);
}
