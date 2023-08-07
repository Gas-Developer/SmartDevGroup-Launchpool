import { SetStateAction, useEffect, useState } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { Textfield } from "./input/Textfield";
import { wagmiTokenConfig } from "../abi/token-abi";
import { useContractReads } from "wagmi";

export function LinkToken(props: any) {

	const isConnected = props.isConnected;

	// TOKEN ADDRESS
	const [tokenAddress, setTokenAddress] = useState('');

	const newTokenAddress = tokenAddress as `0x${string}`;


	const editableWagmiTokenConfig = { ...wagmiTokenConfig, address: newTokenAddress };

	// READ CONTRACT
	const { data, isSuccess, isLoading } = useContractReads({
		contracts: [
			{
				...editableWagmiTokenConfig,
				functionName: "name",
			},
			{
				...editableWagmiTokenConfig,
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
			props.setTokenData(data, newTokenAddress);
		}
	}, [data, isLoading, isSuccess]);


	// LINK TOKEN
	function linkToken() {
		console.log("linkToken");
	}

	const link_token = {
		...props, // Spread the existing props
		onClick: linkToken, // Add the onClick property
	};

	return (
		<>
			<li className="list-group-item  controls-list-group-item">
				<Textfield 
					id="token_address" 
					name="token_address" 
					className="controls-textfield" 
					placeholder="0x..." 
					value={tokenAddress} 
					onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTokenAddress(e.target.value)} 
					disabled={link_token.disabled} 
					required={undefined} 
					minLength={undefined} 
					maxLength={undefined} 
					size={40} 
					pattern={undefined} 
					readOnly={undefined} 
				/>
			</li>
			{/* <li className="list-group-item controls-list-group-item">
				<ControlButton {...link_token}/>
			</li> */}
		</>

	)

}