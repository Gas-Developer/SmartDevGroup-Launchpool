"use client";

import { usePathname, useRouter } from "next/navigation";
import { ContractData } from "../interfaces/ContractData";
import { AreaControls } from "./AreaControls";
import { AreaStats } from "./AreaStats";
import { useState } from "react";
const logger = require("pino")();

export function AreasContainer(props: ContractData) {

	const cData: ContractData = {...props};
	
	const pathname = usePathname();

	const userType = pathname.includes('investor') ? "investor" : "creator";

	// GESTISCO I DATI DELLE STATS CON GLI STATI
	const [AreaStatsProps, setAreaStatsProps] = useState({
		userType: userType,
		cData: cData,
	});

	logger.info(AreaStatsProps);	

	const AreaControlsProps = {
		setTokenData: setTokenData,
		cData: cData,
	};

	// FUNCTIONS
	function setTokenData(data: any, newTokenAddress: string) {

		const newAreaStatsProps = {...AreaStatsProps};
		newAreaStatsProps.cData.name = data?.[0].result;
		newAreaStatsProps.cData.symbol = data?.[1].result;
		newAreaStatsProps.cData.token = newTokenAddress;

		setAreaStatsProps(newAreaStatsProps);

	}

	return (
		<>
		<div id="dashboardTitleContainer">
			<h1 id="containerAreasTitle">
				{userType === "investor"
					? "Investor Dashboard"
					: "Creator Dashboard"}{" "}
				</h1>
				</div>
			<AreaStats {...AreaStatsProps} />
			<AreaControls {...AreaControlsProps} />
		</>
	);
}




