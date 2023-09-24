import { SetStateAction, useEffect, useState } from "react";
import { LaunchpoolInteractionsButton } from "./buttons/LaunchpoolInteractionsButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import {
	useContractWrite,
	useWaitForTransaction,
	useConnect,
	useAccount,
} from "wagmi";
import { LaunchpoolContractConfig } from "../abi/template-abi";
import { connect_wallet, defaultTF } from "./constants";
import { InfoLabel } from "./label/InfoLabel";
import TLRModal from "./Modal";
import { maticToWei } from "../utils/weiCasting";

const logger = require("pino")();

// STAKE BUTTON
const stake_button: ControlButtonData = {
	name: "stake_button",
	text: "Stake",
	tooltip: "Stake",
	onClick: undefined,
	disabled: false,
	className: "",
	iconURL: "",
};

export function Stake(props: any) {
	const className = props.className;
	const [stakeAmount, setStakeAmount] = useState("0");
	let convertedStakedAmount = "0";
	const [showModal, setShowModal] = useState(false);
	const [stakeSuccess, setStakeSuccess] = useState(false);
	const { connect, connectors } = useConnect();
	const { isConnected } = useAccount();

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	connect_wallet.onClick = () => connect({ connector: connectors[0] });

	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;

	const { write, data, error, isLoading, isError } = useContractWrite({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "stake",
		value: BigInt(convertedStakedAmount),
	});

	const {
		data: receipt,
		isLoading: isPending,
		isSuccess,
	} = useWaitForTransaction({
		hash: data?.hash,
		onSuccess(data) {
			logger.info("TX Success");
			logger.info("Staked tokens correctly");
			setStakeSuccess(true);
			// setShowModal(false);
		},
	});

	function stake() {
		const stakeAmountNumber = parseFloat(stakeAmount.replace(",", "."));
		if (!isNaN(stakeAmountNumber)) {
			const convertedStakedAmount = maticToWei(
				stakeAmountNumber.toString()
			);
			write({
				value: convertedStakedAmount,
			});
		}
	}

	return (
		<>
			{isConnected ? (
				<>
					<LaunchpoolInteractionsButton
						{...stake_button}
						className={className}
						onClick={toggleModal}
					/>
					<TLRModal
						isVisible={showModal}
						className={
							"fixed inset-0 bg-gray-500 bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
						}
						onClose={() => setShowModal(false)}
					>
						<div className="grid grid-cols-2 grid-rows-2 gap-6 p-4">
							<InfoLabel
								name={""}
								value={"Amount to stake"}
								className={"m-auto"}
							></InfoLabel>
							<Textfield
								{...defaultTF}
								className="h-fit m-auto"
								id="stakeAmount"
								name="stakeAmount"
								placeholder="Stake Amount"
								value={stakeAmount}
								onChange={(e: {
									target: { value: SetStateAction<string> };
								}) => setStakeAmount(e.target.value)}
							/>
							<div className="flex justify-center col-span-2">
								{stakeSuccess ? (
									<InfoLabel
										name={""}
										value={"Amount to stake"}
										className={""}
									></InfoLabel>
								) : (
									<LaunchpoolInteractionsButton
										{...stake_button}
										className={className + " "}
										onClick={stake}
									/>
								)}
							</div>
						</div>
					</TLRModal>
				</>
			) : null}
		</>
	);
}
