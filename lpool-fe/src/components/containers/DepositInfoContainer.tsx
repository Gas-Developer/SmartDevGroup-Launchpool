import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { InfoLabel } from "../label/InfoLabel";


export function DepositInfoContainer(props: any) {

	//console.log("DepositInfoContainer props: ", props);

	let currentDeposit = BigInt(0);


	return (
		<>
		{ (props.launchpoolAddress && props.launchpoolAddress != "") ? (
			<TrasparentContainer className="" >
				<DefaultContainer className="">
					<div className="grid grid-cols-4 gap-2">
						<div className="col-span-3">
							<div className="grid grid-rows-5 gap-1">
								<div className="row-span-1">
									&nbsp;
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"timeToStartLabel"} value={"Time until Launchpool start"} className={" text-sm "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"timeToStartValue"} value={"12 days"} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"mySupplyLabel"} value={"My token supply"} className={" text-sm  "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"mySupplyValue"} value={"1.000.000 GC"} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"totalSupplyLabel"} value={"Total token supply"} className={" text-sm  "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"totalSupplyValue"} value={"2.000.000 GC"} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									&nbsp;
								</div>


							</div>
						</div>
						<div className="col-span-1">
							<div className="grid grid-rows-3  text-center align-text-bottom">
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={"currently deposited"} className={" text-sm font-thin text-gray-500"} />
								</div>
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={currentDeposit.toString()} className={" text-5xl font-medium text-green-500"} />
								</div>
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={"GC"} className={" text-lg font-medium text-green-500"} />
								</div>
							</div>
						</div>
					</div>

				</DefaultContainer>
			</TrasparentContainer>
			) : ("")
		}
		</>
	);

}