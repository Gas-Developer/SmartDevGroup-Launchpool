import { SetStateAction, useState } from "react";
import { StakeButton } from "./buttons/StakeButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";
import { defaultTF } from "./costants";
import { InfoLabel } from "./label/InfoLabel";
import TLRModal from "./Modal";

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
	const [showModal, setShowModal] = useState(false);

	const toggleModal = () => {
		setShowModal(!showModal);
	};

	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;

	const { write, data, error, isLoading, isError } = useContractWrite({
		...LaunchpoolContractConfig,
		address: launchpoolAddress,
		functionName: "stake",
		value: BigInt(stakeAmount),
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
		},
	});

	function stake() {
		logger.info("Staking");
		logger.info(
			"TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic"
		);
		logger.info("Stake amount: " + stakeAmount);
		logger.info("Laucnhpool addres " + launchpoolAddress);
		//TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic
		write({
			value: BigInt(stakeAmount),
		});
	}

	return (
        <>
            <StakeButton
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
                        placeholder="Stake Amount" // Wei o Matic ?
                        value={stakeAmount}
                        onChange={(e: {
                            target: { value: SetStateAction<string> };
                        }) => setStakeAmount(e.target.value)}
                    />
                    <div className="flex justify-center col-span-2">
                        <StakeButton
                            {...stake_button}
                            className={className + " "}
                            onClick={stake}
                        />
                    </div>
                </div>
            </TLRModal>
        </>
    );
}
