"use client";

import '../../assets/styles/controls-list.css'

import { ControlButton } from "../buttons/ControlButton";
import { ControlButtonData } from "../interfaces/ControlButtonData";

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Textfield } from '../input/Textfield';

const logger = require("pino")();


// CONNECT WALLET BUTTON
let connect_wallet: ControlButtonData = {
	name: "connect_wallet",
	text: "Connect Wallet",
	tooltip: "Connect Wallet",
	onClick: {},
	disabled: false,
	className: "",
	iconURL: ""
};
const disconnect_wallet: ControlButtonData = {
	name: "disconnect_wallet",
	text: "Disconnect Wallet",
	tooltip: "Disconnect Wallet",
	onClick: {},
	disabled: true,
	className: "",
	iconURL: ""
};

// LINK TOKEN BUTTON
function linkToken() {
	console.log("linkToken");
}

const link_token: ControlButtonData = {
	name: "link_token",
	text: "Link Token",
	tooltip: "Link Token",
	onClick: linkToken,
	disabled: true,
	className: "",
	iconURL: ""
};

// DEPOSIT BUTTON
function deposit() {
	console.log("deposit");
}

const deposit_button: ControlButtonData = {
	name: "deposit_button",
	text: "Deposit",
	tooltip: "Deposit",
	onClick: deposit,
	disabled: true,
	className: "",
	iconURL: ""
};

// WITHDRAW BUTTON
function withdraw() {
	console.log("withdraw");
}

const withdraw_button: ControlButtonData = {
	name: "withdraw_button",
	text: "Withdraw",
	tooltip: "Withdraw",
	onClick: withdraw,
	disabled: true,
	className: "",
	iconURL: ""
};

export function CreatorControls() {

	const { connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
	const { disconnect } = useDisconnect()

	connect_wallet.onClick = () => connect({ connector: connectors[0] });
	disconnect_wallet.onClick = () => disconnect();

	return (
		<>
			<ul className="list-group controls-list-group">
				<li className="list-group-item controls-list-group-item">

					{!isConnected ? 
						<ControlButton {...connect_wallet}/> :
						<ControlButton {...disconnect_wallet}/>
					}

				</li>
				<li className="list-group-item  controls-list-group-item">
					<Textfield 
						id="token_address" 
						name="token_address" 
						className="controls-textfield" 
						placeholder="Token Address" 
						value={undefined} 
						onChange={undefined} 
						disabled={true} 
						required={undefined} 
						minLength={undefined} 
						maxLength={undefined} 
						size={40} 
						pattern={undefined} 
						readonly={undefined} 
					/>
				</li>
				<li className="list-group-item controls-list-group-item">
					<ControlButton {...link_token}/>
				</li>
				<li className="list-group-item controls-list-group-item"><ControlButton {...deposit_button}/></li>
				<li className="list-group-item controls-list-group-item"><ControlButton {...withdraw_button}/></li>

			</ul>

		</>
	);
}


