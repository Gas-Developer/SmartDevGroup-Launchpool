import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useState } from "react";
import { LaunchpoolContractConfig } from "../../abi/launchpool-abi";

export function DepositButton(props: any) {

	// DEPOSIT
	const { write, data, error, isLoading, isError } = useContractWrite({
		...LaunchpoolContractConfig,
		address: props.launchpoolAddress,
		functionName: 'depositTokenToDistribute',

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
				console.log('Deposito effettuato corretamente');
				props.setIsDeposited(true);
			},
		}
	)

	function deposit() {
		console.log("deposit");
		console.log("TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic");
		//TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic

		// DEPOSIT
		write({
			args: [
				BigInt(props.depositQty)
			],
		})
	}

	return (
		<div>
			<input 
				type="button" 
				name="deposit_button"
				id="deposit_button"
				className={props.className} 
				value="Deposit" 
				onClick={deposit} 
				title="Deposit"
				disabled={false}
			/>
		</div>
	);
}