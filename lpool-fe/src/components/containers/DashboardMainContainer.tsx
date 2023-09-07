"use client";

import CreateLaunchpool from "../dashboard/area/CreateLaunchpool";
import FeaturedLaunchpools from "../dashboard/area/FeaturedLaunchpools";
import LaunchpoolsPreviewArea from "../dashboard/area/LaunchpoolsPreview";
import TLREventsArea from "../dashboard/area/TLREvents";

export default function DashboardMainContainer() {
    return (
        <>
            <div
                id="dashboardMainContainer"
                className="grid grid-cols-2 grid-rows-3"
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
                <div className="col-span-2">
                    <LaunchpoolsPreviewArea />
                </div>
            </div>
        </>
    );
}
