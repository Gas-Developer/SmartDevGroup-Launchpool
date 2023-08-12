import { SetStateAction, useEffect, useState } from "react";
import { Textfield } from "./input/Textfield";
import { wagmiTokenConfig } from "../abi/token-abi";
import { useContractReads } from "wagmi";

export function LinkToken(props: any) {


	// READ CONTRACT
	const { data, isSuccess, isLoading } = useContractReads({
		contracts: [
			{
				...wagmiTokenConfig,
				address: props.tokenAddress as `0x${string}`,
				functionName: "name",
			},
			{
				...wagmiTokenConfig,
				address: props.tokenAddress as `0x${string}`,
				functionName: "symbol",
			},
		],
	});


	useEffect(() => {

		if (
			isSuccess &&
			!isLoading &&
			data?.[0].result !== undefined &&
			data?.[1].result !== undefined
		) {

			//console.log("props", props);
			props.setTokenData(data, props.tokenAddress);
		}
	}, [data, isLoading, isSuccess]);

	return (
		<>
				<Textfield 
					id="token_address" 
					name="token_address" 
					className="controls-textfield" 
					placeholder="0x..." 
					value={props.tokenAddress} 
					onChange={(e: { target: { value: SetStateAction<string>; }; }) => props.setTokenAddress(e.target.value)} 
					disabled={props.disabled} 
					required={undefined} 
					minLength={undefined} 
					maxLength={undefined} 
					size={40} 
					pattern={undefined} 
					readOnly={undefined} 
				/>
		</>

	)

}