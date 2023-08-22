"use client";

import { CreatorControls } from "./CreatorControls";
import { InvestorControls } from "./InvestorControls";
const logger = require("pino")();

export function AreaControls(props: any) {

	return (
		<div className="flex flex-row justify-between AreaControls controlsContainer">

			{props.userType === "investor" ? (
				<InvestorControls {...props.cData}/>
			) : (
				<CreatorControls {...props.cData} setTokenData={props.setTokenData} />
			)}
		</div>
	);
}


