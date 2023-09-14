import { SetStateAction, useState } from "react";
import { DepositButton } from "./buttons/DepositButton";
import { ApproveButton } from "./buttons/ApproveButton";

import { defaultTF, labelStyle, tfStyle, connect_wallet, disconnect_wallet }  from "./constants";
import { useContractWrite, useWaitForTransaction, useContractRead, useAccount, useConnect, useDisconnect } from "wagmi";
import { InfoLabel } from "./label/InfoLabel";
import { Numberfield } from "./input/Numberfield";
import { ControlButton } from "./buttons/ControlButton";
import { ImageButton } from "./buttons/ImageButton";


export function Deposit(props: any) {
	
	const className = "btn btn-primary controlButton "+props.className;
	const [depositQty, setDepositQty] = useState("0");
	const [isTokenAllowed, setIsTokenAllowed] = useState(false);
	const [isDeposited, setIsDeposited] = useState(false);

	// WALLET CONNECT
	const { connector, isConnected } = useAccount()
	const { connect, connectors, pendingConnector } = useConnect()
	const { disconnect } = useDisconnect()

	connect_wallet.onClick = () => connect({ connector: connectors[0] });
	disconnect_wallet.onClick = () => disconnect();

	return (
		<>
			<div className="grid grid-cols-10 gap-4">
				{/* ROW 1 */}
				<div className="col-span-10 text-center p-10 pl-20 pr-20 text-xl">
					It&apos;s time to deposit the tokens <br/>to be distributed with the Launchpool
				</div>

				{/* ROW 2 */}
				<div className="col-span-1">
					&nbsp;
				</div>
				<div className="col-span-2">
					<InfoLabel name={"depositQtyLabel"} value={"Tokens to deposit"} className={labelStyle} />
				</div>
				<div className="col-span-6">
					<Numberfield 
						{...defaultTF}
						id="deposit_qty" 
						name="deposit_qty" 
						placeholder="Deposit Quantity" 								// Wei o Matic ?
						value={depositQty} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDepositQty(e.target.value)}
						className={tfStyle}
					/>
				</div>
				<div className="col-span-1">
					&nbsp;
				</div>

				
				{/* ROW 3 */}
				<div className="col-span-10 text-center p-10 pl-20 pr-20 text-xl">

					{/* Wallet Connection */} 
					{!isConnected ? 
						<ControlButton {...connect_wallet}/> :
						isTokenAllowed ?
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
				</div>

				{/* ROW 4 */}
				<div className="col-span-10 text-center p-10 pl-20 pr-20 text-xl">
					{isDeposited ?
						<div style={{color: "green"}}>Deposited succesfully</div>
						:
						""
					}
				</div>
				{/* ROW 4 */}
				<div className="col-span-10 text-center p-10 pl-20 pr-20 text-xl">
					{isDeposited ?
						<div style={{color: "green"}}>Deposited succesfully</div>
						:
						""
					}
				</div>
			</div>
		</>
	)
}
