"use client";

import { useContractRead } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { useEffect, useState } from "react";
import { LaunchpoolReference } from "./interfaces/LaunchpoolReference";
import LaunchpoolsPreviewArea from "./dashboard/area/LaunchpoolsPreview";


const logger = require("pino")();

export default function ProfileContainer(props:any) {

    let allLaunchpoolReferecence: LaunchpoolReference[] = [];

    const [launchpoolsReference, setLaunchpoolsReference] = useState<
        LaunchpoolReference[]
    >([]);

    return (
        <>
            <div
                id="profileContainer"
                className="grid grid-cols-2 grid-rows-3 overflow-auto"
            >
                <div id="launchpoolsPreviewArea">
                    <LaunchpoolsPreviewArea type={props.type}
                        allLaunchpoolReferecence={launchpoolsReference}
                    />
                </div>
            </div>
        </>
    );
}
