"use client";

import { LaunchpoolReference } from "../../interfaces/LaunchpoolReference";
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
            if (myProfileContainer) {
                // if (lpAddress) {
                //     const staked = await refetch();
                //     logger.info("Ho stakato ", staked);
                //     if (staked.data && staked.data > BigInt(0)) {
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
