import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { InfoLabel } from "../label/InfoLabel";


export function DeployCostsContainer(props: any) {

	let deployCost;
	props.isFeatured ? deployCost = 49 : deployCost = 9;

	console.log("DeployCostsContainer props: ", props);

	return (
		<>
		{ (props.tokenAddress && props.tokenAddress != "") ? (
			<TrasparentContainer className="" >
				<DefaultContainer className="">
					<div className="grid grid-cols-4 gap-2">
						<div className="col-span-3">
						<div className="grid grid-rows-3 gap-1">
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"TLRFeeLabel"} value={"The Launchpool Ready fee"} className={" text-sm "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"TLRFeeValue"} value={"FREE"} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"AntiSpamLabel"} value={"Anti-spam"} className={" text-sm  "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"AntiSpamValue"} value={"9 matic"} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>

								{
									props.isFeatured && (
										<div className="row-span-1">
											<div className="grid grid-cols-2 gap-1">
												<div className="col-span-1 text-right">
													<InfoLabel name={"FeaturedLabel"} value={"Featured"} className={" text-sm font-medium"} />
												</div>
												<div className="col-span-1 text-left">
													<InfoLabel name={"FeaturedValue"} value={"40 matic"} className={" text-green-500 text-sm font-medium"} />
												</div>
											</div>
										</div> 
										)
								}
							</div>
						</div>
						<div className="col-span-1">
							<div className="grid grid-rows-3  text-center align-text-bottom">
								<div className="row-span-1">
									<InfoLabel name={"DeployCostLabel"} value={"deploy cost"} className={" text-sm font-thin text-gray-500"} />
								</div>
								
								<div className="row-span-1">
									<InfoLabel name={"DeployCostLabel"} value={deployCost.toString()} className={" text-5xl font-medium text-green-500"} />
								</div>
								<div className="row-span-1">
									<InfoLabel name={"DeployCostLabel"} value={"MATIC"} className={" text-lg font-medium text-green-500"} />
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