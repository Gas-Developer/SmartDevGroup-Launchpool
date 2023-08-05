"use client";

import { CreatorControls } from "./CreatorControls";
import { InvestorControls } from "./InvestorControls";


export function AreaControls(props: any) {

	return (
		<div>
			<div className="flex flex-row justify-between AreaControls">
				{props.type === "investor" ? <InvestorControls /> : <CreatorControls />}
			</div>
		</div>
	);
}


