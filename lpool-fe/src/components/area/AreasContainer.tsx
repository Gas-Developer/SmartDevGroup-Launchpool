"use client";

import { usePathname, useRouter } from "next/navigation";
import { ContractData } from "../interfaces/ContractData";
import { AreaControls } from "./AreaControls";
import { AreaStats } from "./AreaStats";
import { useEffect, useRef, useState } from "react";
const logger = require("pino")();

export function AreasContainer(props: ContractData) {

	const cData: ContractData = {...props};

	const pathname = usePathname();
	const userType = pathname.includes('investor') ? "investor" : "creator";

	let filled = useRef(false);

	// GESTISCO I DATI DELLE STATS CON GLI STATI
	const [areaStatsProps, setAreaStatsProps] = useState({
		userType: userType,
		cData: cData,
	});

	useEffect(() => {

		const newAreaStatsProps = { ...areaStatsProps };
		newAreaStatsProps.cData = cData;

		if (Object.keys(newAreaStatsProps.cData).length !== 0 && !filled.current) {
			setAreaStatsProps(newAreaStatsProps);
			filled.current = true;
		}

	}, [cData]);

	const areaControlsProps = {
		setTokenData: setTokenData,
		userType: userType,
		cData: cData,
	};

	// FUNCTIONS
	function setTokenData(data: any, newTokenAddress: string) {

		const newAreaStatsProps = {...areaStatsProps};
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
						: "Creator Dashboard"}
				</h1>
			</div>
			<AreaStats {...areaStatsProps} />
			<AreaControls {...areaControlsProps} />
		</>
	);
}




