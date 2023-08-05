"use client";

import { usePathname, useRouter } from "next/navigation";
import { ContractData } from "../interfaces/ContractData";
import { AreaControls } from "./AreaControls";
import { AreaStats } from "./AreaStats";
const logger = require("pino")();

export function AreasContainer(props: ContractData) {

	const cData: ContractData = props;
	
	const pathname = usePathname();

	const userType = pathname.includes('investor') ? "investor" : "creator"

	const AreaStatsProps = {
        userType: userType,
        cData: cData,
    };
	
	return (
        <div id="userDashboardContainer">
            <h1 id="containerAreasTitle">
                {userType === "investor"
                    ? "Investor Dashboard"
                    : "Creator Dashboard"}{" "}
            </h1>
            <AreaStats {...AreaStatsProps} />
            <AreaControls {...cData} />
        </div>
    );
}




