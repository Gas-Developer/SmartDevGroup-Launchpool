"use client";

import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";

const logger = require("pino")();

export function CreatorPage() {

	let contractData: ContractData = {} as ContractData;

	return (
		<>
			<AreasContainer {...contractData} />
		</>
	);
}
