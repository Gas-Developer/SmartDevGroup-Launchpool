import { SetStateAction, useState } from "react";
import { StakeButton } from "./buttons/StakeButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { LaunchpoolContractConfig } from "../abi/launchpool-abi";
import { useRouter } from "next/navigation";
const logger = require("pino")();


// TODO: Mettere in un file di const globale e fare l'import ovunque venga utilizzato
const defaultTF = {
	id: "",
	name: "",
	className: "controls-textfield",
	placeholder: "",
	value: "",
	onChange: undefined,
	disabled: false,
	required: undefined,
	minLength: undefined,
	maxLength: undefined,
	size: 40,
	pattern: undefined,
	readOnly: false,
};

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

	const className = "btn btn-primary controlButton " + props.className;
	const [stakeAmount, setStakeAmount] = useState("0");

	const launchpoolAddress = props.launchpoolAddress as `0x${string}`; 

		const { write, data, error, isLoading, isError } = useContractWrite({
			...LaunchpoolContractConfig,
			address: launchpoolAddress,
			functionName: 'stake',
			value: BigInt(stakeAmount)
		
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
            //TODO: Eseguire controlli di eccesso quantità e effettuare la conversione in Wei o Matic
            write({
                value: BigInt(stakeAmount),
            });
        }

	return (
        <ul className="list-group controls-list-group">
            <li className="list-group-item controls-list-group-item">
                Amount to stake
            </li>
            <li className="list-group-item controls-list-group-item">
                <Textfield
                    {...defaultTF}
                    id="stakeAmount"
                    name="stakeAmount"
                    placeholder="Stake Amount" // Wei o Matic ?
                    value={stakeAmount}
                    onChange={(e: {
                        target: { value: SetStateAction<string> };
                    }) => setStakeAmount(e.target.value)}
                />
            </li>
            <li className="list-group-item controls-list-group-item">
                <StakeButton
                    {...stake_button}
                    className={className}
                    onClick={stake}
                />
            </li>
        </ul>
    );
}