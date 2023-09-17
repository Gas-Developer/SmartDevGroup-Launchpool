"use client";

import CreateLaunchpool from "../dashboard/area/CreateLaunchpool";
import FeaturedLaunchpools from "../dashboard/area/FeaturedLaunchpools";
import LaunchpoolsPreviewArea from "../dashboard/area/LaunchpoolsPreview";
import TLREventsArea from "../dashboard/area/TLREvents";
import { useEffect, useState } from "react";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useContractRead } from "wagmi";
import { LaunchpoolReference } from "../interfaces/LaunchpoolReference";
const logger = require("pino")();

export default function DashboardMainContainer(props:any) {

    const launchpoolsReference = props.launchpoolsReference;
    
    return (
        <>
            <div
                id="dashboardMainContainer"
                className="grid grid-cols-2 grid-rows-3 overflow-auto"
            >
                <div id="featuredArea" className=" row-span-2">
                    <FeaturedLaunchpools />
                </div>
                <div id="createLaunchpoolArea">
                    <CreateLaunchpool />
                </div>
                <div id="tlrEventsArea">
                    <TLREventsArea />
                </div>
                <div id="launchpoolsPreviewArea" className="col-span-2">
                    <LaunchpoolsPreviewArea
                        allLaunchpoolReferecence={launchpoolsReference}
                    />
                </div>
            </div>
        </>
    );
}
