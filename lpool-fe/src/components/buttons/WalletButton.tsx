"use client"
import { WalletIcon } from "@heroicons/react/24/outline";
import { useAccount, useConnect } from "wagmi";
import { Connect } from "../Connect";
import { Connected } from "../Connected";

export function WalletButton(props: any) {
    
	const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect();

    return (
        <>
            <WalletIcon
                className="w-1/5 inline cursor-pointer"
                onClick={() => connect({ connector: connectors[0] })}
            />
        </>
    );
}
