"use client";

import { useContractRead } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { useEffect, useState } from "react";
import { LaunchpoolReference } from "./interfaces/LaunchpoolReference";
import LaunchpoolsPreviewArea from "./dashboard/area/LaunchpoolsPreview";
import { useGlobalContext } from "../app/Context/store";


const logger = require("pino")();

export default function ProfileContainer(props:any) {
    
    const {
        allLaunchpoolReferenceGContext,
        setAllLaunchpoolReferenceGContext,
        ipfsDataGContext,
        setIpfsDataGContext,
    } = useGlobalContext();

    return (
        <>
            <div
                id="profileContainer"
                className="grid grid-cols-2 grid-rows-3 overflow-auto"
            >
                <div id="launchpoolsPreviewArea">
                    <LaunchpoolsPreviewArea
                        type={props.type}
                        ipfsData={ipfsDataGContext}
                    />
                </div>
            </div>
        </>
    );
}
