import { SetStateAction, useState } from "react";
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";

import { DepositButton } from "./buttons/DepositButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";

// TODO: Mettere in un file di const globale e fare l'import ovunque venga utilizzato
const defaultTF = {
	id: "",
	name: "",
	className: "controls-textfield",
	placeholder: "",
	value: "",
	onChange: undefined,
	disabled: false,
	required: undefined,
	minLength: undefined,
	maxLength: undefined,
	size: 40,
	pattern: undefined,
	readOnly: false,
};


// DEPOSIT BUTTON
const deposit_button: ControlButtonData = {
	name: "deposit_button",
	text: "Deposit",
	tooltip: "Deposit",
	onClick: undefined,
	disabled: false,
	className: "",
	iconURL: ""
};


export function Deposit(props: any) {
	
	const className = "btn btn-primary controlButton "+props.className;
	const [depositQty, setDepositQty] = useState("0");

	const { write, data, error, isLoading, isError } = useContractWrite({
		...LaunchpoolContractConfig,
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
			},
		}
	)

	function deposit() {
		console.log("deposit");
		console.log("TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic");
		//TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic
		write({
			args: [
				BigInt(depositQty)
			],
		})
	}


	return (
		<ul className="list-group controls-list-group">
			<li className="list-group-item controls-list-group-item">
				Deposit the token you want distribute
			</li>
			<li className="list-group-item controls-list-group-item">
			<Textfield 
				{...defaultTF}
				id="deposit_qty" 
				name="deposit_qty" 
				placeholder="Deposit Quantity" 								// Wei o Matic ?
				value={depositQty} 
				onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDepositQty(e.target.value)} 
			/>
			</li>
			<li className="list-group-item controls-list-group-item">
				<DepositButton {...deposit_button} className={className} onClick={deposit}/> 
			</li>
		</ul>
		)

}
