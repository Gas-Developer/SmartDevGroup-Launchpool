import { use, useEffect, useState } from "react";
import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { useContractRead, useContractReads, useToken } from "wagmi";
import { InfoLabel } from "../label/InfoLabel";
import { InfoValue } from "../label/InfoValue";
import Image from 'next/image'
import { defaultNoImage } from "../costants";






export function LPCardPreviewContainer(props: any) {

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
		console.log("tokenAddress: ", tokenAddress);
		if(tokenAddress.length == 42 && tokenAddress.startsWith("0x"))
			setEnableTokenDataRead(true);
	}, [tokenAddress]);

	// useEffect(() => {
	// 	console.log("startLPValue: ", startLPValue);
	// }, [startLPValue]);

	useEffect(() => {
		console.log("props: ", props);
	}, [props]);
	
	return (
		<>
			{tokenAddress.length == 42 && tokenAddress.startsWith("0x") ?

				<TrasparentContainer className="" >
					<DefaultContainer className="">
						<div className="grid grid-rows-5 grid-flow-col gap-2 text-center">

							{/* Token Name */}
							<div className="row-span-1">
								{(data?.name) ? 
									isLoading ? 
										<p>Loading...</p> : 
										<h3>{data?.name} ({data?.symbol})</h3> :
									""
								}
								<InfoLabel name={"tokenAddressLabel"} value={tokenAddress} className="font-['Roboto'] text-xs text-slate-700" />
							</div>

							{/* Launchpool Image */}
							<div className="row-span-2">
								<div className="grid grid-cols-5 gap-2" >
									<div className="col-span-1">&nbsp;</div>
									<div className="col-span-3">
										<Image
												loader={ () => 
													props.imageURL ? 
														props.imageURL : 
														defaultNoImage
												}
												src={props.imageURL ? 
													props.imageURL : 
													defaultNoImage
												}
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
							<div className="row-span-1 inline-flex text-center">
								<InfoLabel name={"startLPLabel"} value="from: " className="font-['Roboto'] text-xs text-slate-200" /> &nbsp;&nbsp;
								<InfoValue name={"startLPValue"} value={props.startLPValue.toString()} className="font-['Roboto'] text-xs text-slate-700" size={undefined} />
								&nbsp;&nbsp;&nbsp;
								<InfoLabel name={"endLPLabel"} value="to: " className="font-['Roboto'] text-xs text-slate-200" />&nbsp;&nbsp;
								<InfoValue name={"endLPValue"} value={props.startLPValue.toString()} className="font-['Roboto'] text-xs text-slate-700" size={undefined} />
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