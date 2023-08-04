"use client";

import { ContractData } from "../interfaces/ContractData";
import { AreaControls } from "./AreaControls";
import { AreaStats } from "./AreaStats";

export function AreasContainer(props: ContractData) {

	const cData :ContractData = props;

	const AreaStatsProps = {
		type: "investor",
		cData: cData,
	};

	return (
		<div>
			<AreaStats {...AreaStatsProps} />
			<AreaControls {...cData}/>
		</div>
	);
}




