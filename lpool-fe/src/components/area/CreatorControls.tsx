"use client";

import '../../assets/styles/controls-list.css'

import { ControlButton } from "../buttons/ControlButton";
import { ControlButtonData } from "../interfaces/ControlButtonData";

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { CreateLaunchpool } from '../CreateLaunchpool';
import { Deposit } from '../Deposit';

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

	return (
		<>
			<ul className="list-group controls-list-group">
				{/* Wallet Connection */} 
				{!isConnected ? // TODO: Convertire in un component WalletConnection
					<li className="list-group-item controls-list-group-item">
						<ControlButton {...connect_wallet}/> :
					</li> : 
					<li className="list-group-item controls-list-group-item">
						<ControlButton {...disconnect_wallet}/>
					</li>
				}
				{/* Current Launchpool */}
				{(isConnected && props.currentLP !== "") ? 
					<li className="list-group-item controls-list-group-item">
						<h5 className="controls-title">Current Launchpool</h5>
						<div className='InfoValue'>{props.currentLP}</div>
					</li>
					: null
				}
				{/* Create Launchpool */}
				{(isConnected && props.currentLP == "") ?
					<li className="list-group-item controls-list-group-item">
						<CreateLaunchpool setTokenData={props.setTokenData} setCurrentLP={props.setCurrentLP} currentLP={props.currentLP}/> 
					</li>
				: null
				}
				{/* Deposit */}
				{(isConnected && props.currentLP !== "") ?
					<li className="list-group-item controls-list-group-item">
						 <Deposit /> 
					</li>
					/*
					<li className="list-group-item controls-list-group-item">
						{isConnected ? <ControlButton {...withdraw_button}/> : null}
					</li> 
					*/
				: null
				}
			</ul>
		</>
	);
}
