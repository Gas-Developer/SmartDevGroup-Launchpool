"use client";

import { use, useEffect, useState } from "react";
import { InfoLabel } from "./label/InfoLabel";
import { useToken } from "wagmi";
const logger = require("pino")();

export default function Tokenomics(props: any) {
    const tokenAddress = props.tokenAddress as `0x${string}`;
    const [address, setAddress] = useState<`0x${string}`>();

    const { data, error, isError, isLoading, refetch } = useToken({ address });

    useEffect(() => {
        setAddress(tokenAddress);
    }, [tokenAddress]);

    logger.info("Data: ", data);

    return (
        <>
            <InfoLabel
                name={"tokenomicsInvestor"}
                value={"Tokenomics"}
                className={"col-span-2"}
            />
            <InfoLabel
                name={"investorTotalSupply"}
                value={"Total Supply"}
                className={undefined}
            />
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
            />
        </>
    );
}
