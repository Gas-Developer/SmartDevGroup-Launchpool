"use client";

import { useEffect, useState } from "react";
import { FactoryContractConfig } from "../abi/factory-abi";
import CreateLaunchpool from "./dashboard/area/CreateLaunchpool";
import FeaturedLaunchpools from "./dashboard/area/FeaturedLaunchpools";
import LaunchpoolsPreviewArea from "./dashboard/area/LaunchpoolsPreview";
import TLREventsArea from "./dashboard/area/TLREvents";
import { useContractRead } from "wagmi";
import { LaunchpoolReference } from "./interfaces/LaunchpoolReference";
const logger = require("pino")();

export default function DashboardMainContainer() {
    const { data, isLoading, isSuccess } = useContractRead({
        ...FactoryContractConfig,
        functionName: "getLaunchpools",
    });

    let allLaunchpoolReferecence: LaunchpoolReference[] = [];

    const [launchpoolsReference, setLaunchpoolsReference] = useState<LaunchpoolReference[]>([]);

    useEffect(() => {
        if (isSuccess && !isLoading && data !== undefined) {
            data.map((reference: LaunchpoolReference) => {
                allLaunchpoolReferecence.push(reference);
            });
            setLaunchpoolsReference(allLaunchpoolReferecence);
        }
    }, [data]);

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
