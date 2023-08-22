"use client";

import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";

const logger = require("pino")();

export function CreatorPage(props: any) {

	let contractData: ContractData = {} as ContractData;

	if(contractData.launchpoolAddress === undefined && props.launchpoolAddress !== undefined) 
		contractData.launchpoolAddress = props.launchpoolAddress;
	
	if(contractData.cid === undefined && props.cid !== undefined)
		contractData.cid = props.cid;

	return (
		<>
			<AreasContainer {...contractData} />
		</>
	);
}
