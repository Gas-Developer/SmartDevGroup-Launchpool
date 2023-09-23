"use client";

import { use, useEffect, useState } from "react";
import { InfoLabel } from "./label/InfoLabel";
import { useToken } from "wagmi";
import { weiToMatic } from "../utils/weiCasting";
const logger = require("pino")();

export default function Tokenomics(props: any) {
    const tokenAddress = props.tokenAddress as `0x${string}`;
    const [address, setAddress] = useState<`0x${string}`>();

    const { data, error, isError, isLoading, refetch } = useToken({ address });
    const [totalSupply, setTotalSupply] = useState("0");

    useEffect(() => {
        setAddress(tokenAddress);
    }, [tokenAddress]);

    useEffect(() => {
        if (data?.totalSupply !== undefined) {
            const supplyInMatic = weiToMatic(
                data.totalSupply.value.toString(),
                3
            );
            setTotalSupply(supplyInMatic.toString());
        } else {
            setTotalSupply("0");
        }
    }, [data]);

    return (
        <>
            <div className=" grid-flow-row grid-rows-6 text-sm m-4">
                {/* Riga #1 */}
                <div className=" row-span-1 grid grid-cols-2">
                    <div className="col-span-2 text-center">
                        <InfoLabel
                            name={"tokenomicLabel"}
                            value={"Tokenomic"}
                            className={
                                " text-base font-medium text-slate-200 text-opacity-75"
                            }
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
                            value={totalSupply}
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
                            value={
                                props.circulatingSupply
                                    ? props.circulatingSupply
                                    : "0"
                            }
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
                            value={props.totalTokenToDistribute}
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
                            value={
                                props.expectedListing
                                    ? props.expectedListing
                                    : "N/A"
                            }
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
                            value={
                                props.blockchainName
                                    ? props.blockchainName
                                    : "Polygon"
                            }
                            className={""}
                        />
                    </div>
                </div>
            </div>

            {/* 
			<InfoLabel
				name={"investorTotalSupply"}
				value={data?.totalSupply.value.toString()}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"Circulating Supply"}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"10000000"}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"Token to distribute "}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={
					props.totalTokenToDistribute 
				}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"Expected Listing"}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"2023-09-10"}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"Blockchain"}
				className={undefined}
			/>
			<InfoLabel
				name={"investorTotalSupply"}
				value={"Polygon"}
				className={undefined}
			/> */}
        </>
    );
}
