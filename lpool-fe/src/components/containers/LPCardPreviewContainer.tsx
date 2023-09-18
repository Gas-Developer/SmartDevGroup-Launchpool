import { use, useEffect, useState } from "react";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { useToken } from "wagmi";
import { InfoLabel } from "../label/InfoLabel";
import { InfoValue } from "../label/InfoValue";
import Image from 'next/image'
import { defaultNoImage, toDate } from "../constants";

export function LPCardPreviewContainer(props: any) {

	console.log("LPCardPreviewContainer props: ", props);

	// SAFE DATA BINDING // TODO: Rialliniare i nomi delle props con quelli dell'interfaccia IPFSLaunchpoolData.tsx

	const iconURL = 
		props.imageURL ? props.imageURL : 
			props.iconURL ? props.iconURL :
				defaultNoImage;

	const startLP = toDate((
		props.startLP ? props.startLP : 
			props.startLPValue ? props.startLPValue :
				BigInt(0)).toString());
	
	const endLP = toDate((
		props.endLP ? props.endLP :
			props.endLPValue ? props.endLPValue :
				BigInt(0)).toString());

	const tokenAddress = props.tokenAddress ? props.tokenAddress : "";
	const [enableTokenDataRead, setEnableTokenDataRead] = useState(false);

	// Legge le info dal token ERC20
	const { data, isError, isLoading } = useToken({
		address: tokenAddress,
		enabled: enableTokenDataRead,
		onSuccess(data) {
			setEnableTokenDataRead(false);
		},
	  })

	useEffect(() => {
		// console.log("tokenAddress: ", tokenAddress);
		if(tokenAddress.length == 42 && tokenAddress.startsWith("0x"))
			setEnableTokenDataRead(true);
	}, [tokenAddress]);

	return (
		<>
			{tokenAddress.length == 42 && tokenAddress.startsWith("0x") ?
				<TrasparentContainer className="" >
					<DefaultContainer className="">

						<div className="grid grid-rows-5 grid-flow-col gap-1 text-center">
							{/* Token Name */}
							<div className="row-span-1">
								{(data?.name) ? 
									isLoading ? 
										<p>Loading...</p> : 
										<h3>{data?.name} ({data?.symbol})</h3> :
									""
								}
								<InfoLabel name={"tokenAddressLabel"} value={tokenAddress} className="font-['Roboto'] text-xs text-slate-700 text-center inline-block" />
							</div>

							{/* Launchpool Image */}
							<div className="row-span-2">
								<div className="grid grid-cols-5 gap-2" >
									<div className="col-span-1">&nbsp;</div>
									<div className="col-span-3">
										<Image
												loader={ () => iconURL }
												src={ iconURL }
												alt={data?.name ? data.name : "Launchpool Image"}
												width={150}
												height={100}
												layout="responsive"
											/>
									</div>
									<div className="col-span-1">&nbsp;</div>
								</div>
							</div>

							{/* Launchpool Dates */}
							<div className="row-span-1 text-center pl-10 pr-10">
								<div className="grid grid-cols-6 gap-1" >
									<div className="col-span-1">
										<InfoLabel name={"startLPLabel"} value="from: " className="font-['Roboto'] text-xs text-slate-600 text-right inline-block" />
									</div>
									<div className="col-span-2">
										<InfoLabel name={"startLPLabel"} value={startLP} className="font-['Roboto'] text-xs text-slate-200 text-left inline-block" /> 
									</div>
									<div className="col-span-1">
										<InfoLabel name={"endLPLabel"} value="to: " className="font-['Roboto'] text-xs text-slate-600 text-right inline-block" />
									</div>
									<div className="col-span-2">
										<InfoLabel name={"endLPLabel"} value={endLP} className="font-['Roboto'] text-xs text-slate-200 text-left inline-block" />
									</div>
								</div>
							</div>

							{/* Token to Distribute */}
							<div className="row-span-1">0 {data?.symbol} /{data?.totalSupply.formatted} {data?.symbol}</div>
						</div>

					</DefaultContainer>
				</TrasparentContainer>
			: <></>
			}
		</>
	);

}