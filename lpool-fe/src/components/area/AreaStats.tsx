"use client";
import { ContractData } from "../interfaces/ContractData";
import { AreaCreatorStats } from "./AreaCreatorStats";
import { AreaInvestorStats } from "./AreaInvestorStats";

interface AreaStatsProps {
	userType: string;
	cData: ContractData;
}

export function AreaStats(props: AreaStatsProps) {

	const cData = props.cData;
	const userType = props.userType;

	return (
        <div className="stastsContainer">
            {userType === "investor" ? (
                <AreaInvestorStats {...cData} />
            ) : (
                <AreaCreatorStats {...cData} />
            )}
        </div>
    );

}


