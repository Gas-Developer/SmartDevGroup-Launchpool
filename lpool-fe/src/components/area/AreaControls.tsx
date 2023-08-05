"use client";

import { CreatorControls } from "./CreatorControls";
import { InvestorControls } from "./InvestorControls";

export function AreaControls(props: any) {

	console.log(props);

    return (
        <div className="flex flex-row justify-between AreaControls controlsContainer">
            {props.userType === "investor" ? (
                <InvestorControls />
            ) : (
                <CreatorControls />
            )}
        </div>
    );
}


