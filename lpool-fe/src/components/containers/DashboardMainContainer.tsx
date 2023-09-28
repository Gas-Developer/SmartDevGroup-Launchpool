"use client";

import CreateLaunchpool from "../dashboard/area/CreateLaunchpool";
import FeaturedLaunchpools from "../dashboard/area/FeaturedLaunchpools";
import LaunchpoolsPreviewArea from "../dashboard/area/LaunchpoolsPreview";
import TLREventsArea from "../dashboard/area/TLREvents";
const logger = require("pino")();

export default function DashboardMainContainer(props:any) {

    const launchpoolsReference = props.launchpoolsReference;
    const ipfsData = props.ipfsData;

    return (
        <>
            <div
                id="dashboardMainContainer"
                className="grid grid-cols-2 grid-rows-4 overflow-auto"
            >
				<div id="featuredArea" className="row-span-2 h-full">
					<FeaturedLaunchpools launchpoolsReference={launchpoolsReference} ipfsData={ipfsData} />
				</div>
                <div id="createLaunchpoolArea" className="row-span-2h-full flex">
                    <CreateLaunchpool />
                </div>
                {/* <div id="tlrEventsArea">
                    <TLREventsArea />
                </div> */}
                <div id="launchpoolsPreviewArea" className="col-span-2">
                    <LaunchpoolsPreviewArea
                        ipfsData={ipfsData}
                        allLaunchpoolReferecence={launchpoolsReference}
                    />
                </div>
            </div>
        </>
    );

}
