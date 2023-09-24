"use client";

import { LaunchpoolInteractionsButton } from "./buttons/LaunchpoolInteractionsButton";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import {
	useAccount,
	useConnect,
	useContractRead,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import { LaunchpoolContractConfig } from "../abi/template-abi";
import { useEffect, useState } from "react";
import { ContractFunctionExecutionError } from "viem";
import { connect_wallet } from "./constants";
import { ControlButton } from "./buttons/ControlButton";
import { Account } from "./Account";
import type { Address } from "wagmi";

const logger = require("pino")();

const claim_button: ControlButtonData = {
	name: "claim_button",
	text: "Claim",
	tooltip: "Claim",
	onClick: undefined,
	disabled: false,
	className: "",
	iconURL: "",
};

const unstake_button: ControlButtonData = {
	name: "unstake_button",
	text: "Unstake",
	tooltip: "Unstake",
	onClick: undefined,
	disabled: false,
	className: "",
	iconURL: "",
};

export function Claim(props: any) {
	const className = props.className;
	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;
	const [myTotalStaked, setMyTotalStaked] = useState(BigInt(0));
	const [claimVisibility, setClaimVisibility] = useState(false);
	const [unstakeVisibility, setUnstakeVisibility] = useState(true);
	const { connect, connectors } = useConnect();
	const { address, isConnected } = useAccount();

	connect_wallet.onClick = () => connect({ connector: connectors[0] });

	const {
		write: claimFunction,
		data: claimData,
		error: claimError,
	} = useContractWrite({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "claim",
	});

	const {
		write: unstakeFunction,
		data: unstakeData,
		error: unstakeError,
	} = useContractWrite({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "unstake",
	});

	useWaitForTransaction({
		hash: claimData?.hash,
		onSuccess(data) {
			logger.info("Claimed", data);
			logger.info("Claimed tokens correctly");
			setClaimVisibility(false);
		},
		onError(claimError) {
			logger.info("Error", claimError);
		},
	});

	useWaitForTransaction({
		hash: unstakeData?.hash,
		onSuccess(data) {
			logger.info("Unstake Success", data);
			logger.info("Unstake tokens correctly");
			setUnstakeVisibility(false);
			setClaimVisibility(true);
		},
	});

	useEffect(() => {
		if (address !== undefined && isConnected) {
			logger.info("L'address è ", address);
			refetch().then((myStaked) => {
				logger.info(myStaked);
			});
			refetchClaim().then((hasToClaim) => {
				logger.info(hasToClaim);
			});
		}
	}, [isConnected]);


	const { data: dataClaim, refetch: refetchClaim } = useContractRead({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "userHasClaimed",
		enabled: false,
		args: [address?.toString() as Address],
	});
	
	const { data, refetch } = useContractRead({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "getUserTotalStaked",
		args: [address?.toString() as Address],
	});

	useEffect(() => {
		if (data !== undefined) {
			setMyTotalStaked(data?.valueOf());
		}
	}, [data]);

	useEffect(() => {
		if (dataClaim !== undefined) {
			if (dataClaim === false)
				setClaimVisibility(true);
		}
	}, [dataClaim]);

	return (
		<>
			{isConnected ? (
				myTotalStaked > 0 ? (
					<>
						{unstakeVisibility ? (
							<LaunchpoolInteractionsButton
								{...unstake_button}
								className={className}
								onClick={unstakeFunction}
							/>
						) : claimVisibility ? (
							<LaunchpoolInteractionsButton
								{...claim_button}
								className={className}
								onClick={claimFunction}
							/>
						) : null}
					</>
				) : claimVisibility ? (
					<LaunchpoolInteractionsButton
						{...claim_button}
						className={className}
						onClick={claimFunction}
					/>
				) : null
			) : (
				<ControlButton {...connect_wallet} />
			)}
		</>
	);
}
