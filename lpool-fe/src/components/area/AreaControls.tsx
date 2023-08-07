"use client";

import { CreatorControls } from "./CreatorControls";
import { InvestorControls } from "./InvestorControls";

export function AreaControls(props: any) {


	return (
		<div className="flex flex-row justify-between AreaControls controlsContainer">
			{props.userType === "investor" ? (
				<InvestorControls />
			) : (
				<CreatorControls setTokenData={props.setTokenData} />
			)}
		</div>
	);
}


