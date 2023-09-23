"use client";

import { use, useEffect, useState } from "react";
import { InfoLabel } from "./label/InfoLabel";
import { useToken } from "wagmi";

export default function Tokenomics(props: any) {
	const tokenAddress = props.tokenAddress as `0x${string}`;
	const [address, setAddress] = useState<`0x${string}`>();

	const { data, error, isError, isLoading, refetch } = useToken({ address });

	useEffect(() => {
		setAddress(tokenAddress);
	}, [tokenAddress]);

	return (
		<>
			<div className=" grid-flow-row grid-rows-6 text-sm m-4">
				{/* Riga #1 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-2 text-center">
						<InfoLabel
							name={"tokenomicLabel"}
							value={"Tokenomic"}
							className={" text-base font-medium text-slate-200 text-opacity-75"}
						/>
					</div>
				</div>
				{/* Fine Riga #1 */}
				{/* Riga #2 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"TotalSupplyLabel"}
							value={"Total Supply"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75">
						<InfoLabel
							name={"TotalSupplyValue"}
							value={data?.totalSupply.value.toString()}
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #2 */}
				{/* Riga #3 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"CirculatingSupplyLabel"}
							value={"Circulating Supply"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75">
						<InfoLabel
							name={"CirculatingSupplyValue"}
							value={props.circulatingSupply ? props.circulatingSupply : "0"}
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #3 */}
				{/* Riga #4 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"TokenToDistributeLabel"}
							value={"Token to distribute "}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75">
						<InfoLabel
							name={"TokenToDistributeValue"}
							value={props.totalTokenToDistribute }
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #4 */}
				{/* Riga #5 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"ExpectedListingLabel"}
							value={"Expected Listing"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75">
						<InfoLabel
							name={"TokenToDistributeValue"}
							value={props.expectedListing ? props.expectedListing : "N/A" }
							className={""}
						/>
					</div>
				</div>
				{/* Fine Riga #5 */}
				{/* Riga #6 */}
				<div className=" row-span-1 grid grid-cols-2">
					<div className="col-span-1 text-right pr-3 text-slate-200 text-opacity-25 ">
						<InfoLabel
							name={"BlockchainLabel"}
							value={"Blockchain"}
							className={""}
						/>
					</div>
					<div className="col-span-1 text-left pl-3  text-slate-200 text-opacity-75">
						<InfoLabel
							name={"TokenToDistributeValue"}
							value={props.blockchainName ? props.blockchainName : "Polygon" }
							className={""}
						/>
					</div>
				</div>
			</div>


		</>
	);
}
