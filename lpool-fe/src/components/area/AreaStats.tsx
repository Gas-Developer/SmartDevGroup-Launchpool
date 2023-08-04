"use client";
import { ContractData } from "../interfaces/ContractData";
import { AreaCreatorStats } from "./AreaCreatorStats";
import { AreaInvestorStats } from "./AreaInvestorStats";

interface AreaStatsProps {
	type: string;
	cData: ContractData;
}

export function AreaStats(props: AreaStatsProps) {

	const cData = props.cData;

	return (
		<div>
			{ props.type === "investor" ? <AreaInvestorStats {...cData}/> : <AreaCreatorStats {...cData}/> }
		</div>
	);

}


