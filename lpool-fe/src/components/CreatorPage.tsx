"use client";

import { ContractData } from "./interfaces/ContractData";
import { AreasContainer } from "./area/AreasContainer";
import { LPCard } from "./cards/LPCard";
import { DeployFormContainer } from "./containers/DeployFormContainer";
import { LPCardPreviewContainer } from "./containers/LPCardPreviewContainer";
import { DeployCostsContainer } from "./containers/DeployCostsContainer";

const logger = require("pino")();

export function CreatorPage(props: any) {

	let contractData: ContractData = {} as ContractData;

	if(contractData.launchpoolAddress === undefined && props.launchpoolAddress !== undefined) 
		contractData.launchpoolAddress = props.launchpoolAddress;
	
	if(contractData.cid === undefined && props.cid !== undefined)
		contractData.cid = props.cid;

	// TODO: Verify that this is the correct way to do this
	// contractData.launchpoolAddress = contractData.launchpoolAddress ? contractData.launchpoolAddress : props.launchpoolAddress;
	// contractData.cid = contractData.cid ? contractData.cid : props.cid;

	return (
		<>
			{/* <div className="grid grid-cols-4 gap-4">
				<div className="col-span-2">
					<LPCardPreviewContainer />
				</div>
				<div className="col-span-2">
					<DeployFormContainer />
				</div>
				<div className="col-span-2">
					<DeployCostsContainer />
				</div>
			</div> */}


			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-1">
					<div className="grid grid-rows-3 grid-flow-col gap-4 ">
						<div className="row-span-2 ">
							{/* <LPCard {...contractData} /> */}
							<LPCardPreviewContainer />
						</div>
						<div className="row-span-1 ">
							{/* <DeployCosts {...contractData} /> */}
							<DeployCostsContainer />
						</div>
					</div>
				</div>
				<div className="col-span-1">
					<DeployFormContainer />
				</div>

			</div>
			{/* <AreasContainer {...contractData} /> */}
		</>
	);
}
