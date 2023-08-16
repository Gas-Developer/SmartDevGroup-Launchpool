import { useState } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LinkToken } from './LinkToken';
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { BaseError, stringify } from "viem";
import DateTimePicker from "./dateTimePicker";
const logger = require("pino")();

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

export function CreateLaunchpool(props: any) {

	//const [tokenAddress, setTokenAddress] = useState(undefined); 
	const [tokenAddress, setTokenAddress] = useState('');
	const [startLPValue, setStartLPValue] = useState(undefined);
	const [endLPValue, setEndLPValue] = useState(undefined);

	// function deployClone(address _implementationContract, ERC20 _token, uint _startLP, uint _endLP) external returns (address) {
	const { write, data, error, isLoading, isError } = useContractWrite({
		...FactoryContractConfig,
		functionName: 'deployClone',
		args: [
			FactoryContractConfig.templateAddress, 
			"0xeecf1cb6050bc14d5a77e25a30ef698d917b2c23", 
			startLPValue ? startLPValue : BigInt(0), 
			endLPValue ? endLPValue : BigInt(0)
		],
	})

	const {
		data: receipt,
		isLoading: isPending,
		isSuccess,
	} = useWaitForTransaction({ hash: data?.hash })


	function createLaunchpool() {

		console.log("createLaunchpool");
		logger.info("startLPValue", startLPValue);
		logger.info("createLauendLPValuenchpool", endLPValue);

		if (startLPValue != undefined && startLPValue > 0 && endLPValue != undefined && endLPValue > 0 && tokenAddress != undefined && tokenAddress.startsWith('0x')) {
			
			const startLPValueInSeconds = startLPValue / 1000;
			const endLPValueInSeconds = endLPValue / 1000;

			logger.info("startLPValueInSeconds", startLPValueInSeconds);
            logger.info("endLPValueInSeconds", endLPValueInSeconds);

			logger.info("createLaunchpool",setEndLPValue);
			write({
                args: [
                    FactoryContractConfig.templateAddress,
                    tokenAddress as `0x${string}`,
                    BigInt(startLPValueInSeconds),
                    BigInt(endLPValueInSeconds),
                ],
            });

		} else {
			logger.info("ERROR: createLaunchpool");
			logger.info("Some input datas are missing or wrong");
		}

	}



	let create_launchpool: ControlButtonData = {
		name: "create_launchpool",
		text: "Create Launchpool",
		tooltip: "Create Launchpool",
		onClick: createLaunchpool,
		disabled: false,
		className: "",
		iconURL: ""
	};

	const linkTokenData: any = {
		name: "link_token",
		text: "Link Token",
		tooltip: "Link Token",
		onClick: undefined,
		disabled: false,
		className: "",
		iconURL: "",
		setTokenData: props.setTokenData,
		tokenAddress: tokenAddress,
		setTokenAddress: setTokenAddress

	};

	// TOKEN ADDRESS

	return (
        <>
            <h4 style={{ color:'white'}}>Create Launchpool</h4>
            <ul className="list-group controls-list-group">
                <li className="list-group-item  controls-list-group-item">
                    <LinkToken {...linkTokenData} />
                </li>
                <li className="list-group-item controls-list-group-item">
                    <DateTimePicker
                        id="start_lp"
                        placeholder="Enter launchpool start time"
                        calendarInputClass="form-control controls-textfield"
                        setStartLPValue={setStartLPValue}
                        calendarInputSize={40}
                    />
                </li>
                <li className="list-group-item controls-list-group-item">
                    <DateTimePicker
                        id="end_lp"
                        placeholder="Enter launchpool end time"
                        calendarInputClass="form-control controls-textfield"
                        setEndLPValue={setEndLPValue}
                        calendarInputSize={40}
                    />
                </li>
                <li className="list-group-item controls-list-group-item">
                    {isPending ? (
                        <div>Transaction pending...</div>
                    ) : (
                        <ControlButton {...create_launchpool} />
                    )}

                    {isSuccess && (
                        <div>
                            <a
                                href={`https://mumbai.polygonscan.com/address/${data?.hash}`}
                            >
                                Transaction
                            </a>
                        </div>
                    )}
                    {isError && <div>{(error as BaseError)?.shortMessage}</div>}
                </li>
            </ul>
        </>
    );
}
