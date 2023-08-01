"use client";


import { useContractReads } from "wagmi";
import { wagmiContractConfig } from "../../abi/contract-abi";
import { useState } from 'react';

export function TestContracts() {
    const { data, isSuccess, isLoading } = useContractReads({
        contracts: [
            {
                ...wagmiContractConfig,
                functionName: "startLP",
            },
            {
                ...wagmiContractConfig,
                functionName: "endLP",
            },
            {
                ...wagmiContractConfig,
                functionName: "stakingLength",
            },
            {
                ...wagmiContractConfig,
                functionName: "token",
            },
            {
                ...wagmiContractConfig,
                functionName: "totalTokenToDistribute",
            },
        ],
    })

    return {
      props: {
        data: data,
      },
    };
};


export function InvestorArea({data}) {


    console.log({data});





    return (
      <div>
            <label htmlFor="">{data}</label>
      </div>
    );
}
