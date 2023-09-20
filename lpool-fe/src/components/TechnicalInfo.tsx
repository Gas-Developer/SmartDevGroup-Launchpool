"use client";

import { InfoLabel } from "./label/InfoLabel";
const logger = require("pino")();

export default function TechnicalInfo(props: any) {
	return (
		<>

			<div className=" grid-flow-row grid-rows-6 text-sm  m-4">
				{/* Riga #1 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-2 text-center">
						<InfoLabel
							name={"TechnicalInfoLabel"}
							value={"Technical Info"}
							className={" text-base font-medium text-slate-200 text-opacity-75"}
						/>
					</div>
				</div>
				{/* Fine Riga #1 */}
				{/* Riga #2 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"LaunchpoolCreatorLabel"}
							value={"Launchpool Creator"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75 text-xs">
						<InfoLabel
							name={"LaunchpoolCreatorValue"}
							value={props.launchpoolCreator ? props.launchpoolCreator : "0x..."}
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #2 */}
				{/* Riga #3 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"TokenAddressLabel"}
							value={"Token Address"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75  text-xs">
						<InfoLabel
							name={"TokenAddressValue"}
							value={props.tokenAddress ? props.tokenAddress : "0x..."}
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #3 */}
			</div>

			{/* <InfoLabel
				name={"tokenomicsInvestor"}
				value={"Technical Info"}
				className={"col-span-2 font-bold text-4xl"}
			/> */}
			{/* <InfoLabel
				name={""}
				value={"Launchpool Creator Address"}
				className={undefined}
			/> */}
			{/* <InfoLabel
				name={""}
				value={"0x1234567890123456789012345678901234567890"}
				className={"break-words"}
			/> */}
			{/* <InfoLabel
				name={""}
				value={"Token Address"}
				className={undefined}
			/>
			<InfoLabel name={""} value={"10000000"} className={undefined} /> */}
		</>
	);
}
