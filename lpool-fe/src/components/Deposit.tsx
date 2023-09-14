import { SetStateAction, useState } from "react";
import { DepositButton } from "./buttons/DepositButton";
import { Textfield } from "./input/Textfield";
import { ApproveButton } from "./buttons/ApproveButton";

import { defaultTF } from "./constants";


export function Deposit(props: any) {
	
	const className = "btn btn-primary controlButton "+props.className;
	const [depositQty, setDepositQty] = useState("0");
	const [isTokenAllowed, setIsTokenAllowed] = useState(false);
	const [isDeposited, setIsDeposited] = useState(false);


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
				{isTokenAllowed ?
					<DepositButton 
						className={className} 
						launchpoolAddress={props.launchpoolAddress}
						depositQty={depositQty}
						setIsDeposited={setIsDeposited}
					/> 
					:
					<ApproveButton 
						className={className} 
						launchpoolAddress={props.launchpoolAddress} 
						depositQty={depositQty} 
						setIsTokenAllowed={setIsTokenAllowed}
					/> 
				}
			</li>
			<li className="list-group-item controls-list-group-item">
				{isDeposited ?
					<div style={{color: "green"}}>Deposited succesfully</div>
					:
					""
				}


			</li>
		</ul>
		)

}
