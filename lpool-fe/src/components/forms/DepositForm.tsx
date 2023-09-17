import { SetStateAction, useState } from "react";
import { defaultTF, tfStyle, labelStyle, PINATA_APIKEY, PINATA_SECRET, PINATA_PIN_JSON_TO_IPFS } from "../constants";
import { Numberfield } from "../input/Numberfield";
import { InfoLabel } from "../label/InfoLabel";
import { ControlButton } from "../buttons/ControlButton";
import { ImageButton } from "../buttons/ImageButton";
import depositLaunchpoolBTN from "../../assets/images/DepositLaunchpoolBTN.png";

export function DepositForm(props: any) {

	const [formData, setFormData] = useState({
		tokenQty: "0",
	});

	function depositTokens() {	
		console.log("formData: ", formData);
	}

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
						id="tokenAddress" 
						name="tokenAddress" 
						placeholder="0x..."
						value={formData.tokenQty} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, tokenQty: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>
				<div className="col-span-1">
					&nbsp;
				</div>

				{/* ROW 3 */}
				<div className="col-span-10 text-center p-10 pl-20 pr-20 text-xl">
					{/* Wallet Connection */} 
					{/* {!isConnected ? // TODO: Convertire in un component WalletConnection
						<ControlButton {...connect_wallet}/> :
						<ImageButton 
							name="deployLaunchpoolBTN" src={depositLaunchpoolBTN} tooltip="Deploy Launchpool" onClick={depositTokens} 
							width={247} height={50} className=" "
						/>
					} */}

					<ImageButton 
						name="deployLaunchpoolBTN" src={depositLaunchpoolBTN} tooltip="Deploy Launchpool" onClick={depositTokens} 
						width={247} height={50} className=" "
					/>
				</div>

			</div>
		</>
	);

}
