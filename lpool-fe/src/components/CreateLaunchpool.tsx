import { SetStateAction, useEffect, useState } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LinkToken } from './LinkToken';
import { useContractWrite, useWaitForTransaction } from "wagmi";
import { wagmiContractConfig } from "../abi/launchpool-abi";
import { write } from "fs";
import { FactoryContractConfig } from "../abi/factory-abi";
import { BaseError, stringify } from "viem";

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

		if(startLPValue != undefined && startLPValue > 0 && endLPValue != undefined && endLPValue > 0 && tokenAddress != undefined && tokenAddress.startsWith('0x')) {

			write({
				args: [
					FactoryContractConfig.templateAddress, 
					tokenAddress as `0x${string}`, 
					BigInt(startLPValue), 
					BigInt(endLPValue)
				],
			})

		} else {
			console.log("ERROR: createLaunchpool");
			console.log("Some input datas are missing or wrong");
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
			Create Launchpool
			<ul className="list-group controls-list-group">
				<li className="list-group-item  controls-list-group-item">
					<LinkToken {...linkTokenData} />
				</li>
				<li className="list-group-item controls-list-group-item">
					<Textfield {...defaultTF}
							id="start_lp" 
							name="start_lp" 
							placeholder="Start: --/--/---- --:--:--" 
							value={startLPValue} 
							onChange={(e: { target: { value: SetStateAction<undefined>; }; }) => setStartLPValue(e.target.value)} 
					/>
				</li>
				<li className="list-group-item controls-list-group-item">
					<Textfield {...defaultTF}
							id="end_lp" 
							name="end_lp" 
							placeholder="End: --/--/---- --:--:--" 
							value={endLPValue} 
							onChange={(e: { target: { value: SetStateAction<undefined>; }; }) => setEndLPValue(e.target.value)} 
					/>
				</li>
				<li className="list-group-item controls-list-group-item">
					{ 
						isPending ?
							<div>Transaction pending...</div> :
							<ControlButton {...create_launchpool}/>
					}

					{isSuccess && (
						<div>
							<a href={`https://mumbai.polygonscan.com/address/${data?.hash}`}>Transaction</a>
						</div>
					)}
					{isError && <div>{(error as BaseError)?.shortMessage}</div>}

				</li>
			</ul>
		</>
	);
}
