"use client";

import '../../assets/styles/controls-list.css'

import { ControlButton } from "../buttons/ControlButton";
import { ControlButtonData } from "../interfaces/ControlButtonData";

import { useAccount, useConnect, useContractRead, useContractReads, useContractWrite, useDisconnect, useWaitForTransaction } from 'wagmi'
import { LinkToken } from '../LinkToken';

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
	disabled: false,
	className: "",
	iconURL: ""
};




// LINK TOKEN BUTTON


const link_token: ControlButtonData = {
	name: "link_token",
	text: "Link Token",
	tooltip: "Link Token",
	onClick: undefined,
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

export function CreatorControls(props: any) {

	// WALLET CONNECT
	const { connector, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
	const { disconnect } = useDisconnect()

	connect_wallet.onClick = () => connect({ connector: connectors[0] });
	disconnect_wallet.onClick = () => disconnect();

	// LINK TOKEN BUTTON
	link_token.disabled = !isConnected;
	link_token.onClick = props.setTokenData;

	const linkTokenData = {
		...link_token,
		setTokenData: props.setTokenData,
	}

	return (
		<>
			<ul className="list-group controls-list-group">
				<li className="list-group-item controls-list-group-item">
					{!isConnected ? 
						<ControlButton {...connect_wallet}/> :
						<ControlButton {...disconnect_wallet}/>
					}
				</li>
				<LinkToken {...linkTokenData} />
				<li className="list-group-item controls-list-group-item"><ControlButton {...deposit_button}/></li>
				<li className="list-group-item controls-list-group-item"><ControlButton {...withdraw_button}/></li>
			</ul>
		</>
	);
}
