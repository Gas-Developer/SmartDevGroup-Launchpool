"use client";

import { useContractRead } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { useEffect, useState } from "react";
import { LaunchpoolReference } from "./interfaces/LaunchpoolReference";
import LaunchpoolsPreviewArea from "./dashboard/area/LaunchpoolsPreview";
import { useGlobalContext } from "../app/Context/store";
import MyStakedContainer from "./containers/MyStakedContainer";


const logger = require("pino")();

export default function ProfileContainer(props:any) {
    
    const {
        allLaunchpoolReferenceGContext,
        setAllLaunchpoolReferenceGContext,
        ipfsDataGContext,
        setIpfsDataGContext,
    } = useGlobalContext();

    const type = props.type;

    logger.info(type);

    return (
        <>
            <div
                id="profileContainer" className=" flow-root"
                // className="grid grid-cols-2 grid-rows-3 overflow-auto"
            >
                {type === "staked" ? <MyStakedContainer /> : null}

            </div>
        </>
    );
}
