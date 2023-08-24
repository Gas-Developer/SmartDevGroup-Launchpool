import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useState } from "react";
import { wagmiTokenConfig } from "../../abi/token-abi";

export function ApproveButton(props: any) {

	// APPROVE
	const { write, data, error, isLoading, isError } = useContractWrite({
		...wagmiTokenConfig,
		//address: props.tokenAddress,
		address: "0x4d437Bda153924d08CE6a17A8E239fbb871dfc4b",
		functionName: 'approve',

	})
	const {
		data: receipt,
		isLoading: isPending,
		isSuccess,
	} = useWaitForTransaction(
		{ 
			hash: data?.hash,
			onSuccess(data) {
				console.log('TX Success');
				console.log('Approve effettuato corretamente');
				props.setIsTokenAllowed(true);
			},
		}
	)

	function approve() {
		console.log("Approving...");
		//function approve(address spender, uint256 amount) public virtual override returns (bool) {
		write({
			args: [
				props.launchpoolAddress,
				BigInt(props.depositQty)
			],
		})
	}

	return (
		<div>
			<input 
				type="button" 
				name="approve_button" 
				id="approve_button"
				className={props.className} 
				value="Approve" 
				onClick={approve} 
				title="Approve" 
				disabled={false}
			/>
		</div>
	);
}