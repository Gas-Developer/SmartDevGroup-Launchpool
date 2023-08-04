'use client'

import { useContractReads } from 'wagmi'

import { wagmiContractConfig } from "../abi/contract-abi";
import { stringify } from '../utils/stringify'
import { useState } from 'react';

export function ReadContracts() {
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
  });



  return (
    <div>
      <div>Data:</div>
      {isLoading && <div>loading...</div>}
      {isSuccess &&
        data?.map((data) => <pre key={stringify(data)}>{stringify(data)}</pre>)}
    </div>
  );
}
