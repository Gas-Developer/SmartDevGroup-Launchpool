"use client";

import { propTypes } from "react-bootstrap/esm/Image";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Stake } from "../Stake";
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { ControlButton } from "../buttons/ControlButton";

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
    iconURL: "",
};


export function InvestorControls(props: any) {
	// WALLET CONNECT
	const { connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();
	const { disconnect } = useDisconnect();

	connect_wallet.onClick = () => connect({ connector: connectors[0] });
	disconnect_wallet.onClick = () => disconnect();

	return (
        <>
            <h3>InvestorControls</h3>
            <ul className="list-group controls-list-group">
                {/* Wallet Connection */}
                {!isConnected ? ( // TODO: Convertire in un component WalletConnection
                    <li className="list-group-item controls-list-group-item">
                        <ControlButton {...connect_wallet} /> :
                    </li>
                ) : (
                    <li className="list-group-item controls-list-group-item">
                        <ControlButton {...disconnect_wallet} />
                    </li>
                )}
                {/* Deposit */}
                {isConnected  ? (
                    <li className="list-group-item controls-list-group-item">
						<Stake launchpoolAddress={ props.launchpoolAddress } />
                    </li>
                ) : /*
					<li className="list-group-item controls-list-group-item">
						{isConnected ? <ControlButton {...withdraw_button}/> : null}
					</li> 
					*/
                null}
            </ul>
        </>
    );
}


