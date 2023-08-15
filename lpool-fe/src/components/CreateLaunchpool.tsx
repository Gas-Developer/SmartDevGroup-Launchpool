import { SetStateAction, useEffect, useState } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LinkToken } from './LinkToken';
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { BaseError, stringify } from "viem";

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

export function CreateLaunchpool(props: any) {

	const [tokenAddress, setTokenAddress] = useState('');
	const [startLPValue, setStartLPValue] = useState(BigInt(0));
	const [endLPValue, setEndLPValue] = useState(BigInt(0));

	const [enableReadProxies, setEnableReadProxies] = useState(false);

	// DEPLOY CLONE
	// deployClone(address _implementationContract, ERC20 _token, uint _startLP, uint _endLP)
	const { write, data, error, isLoading, isError } = useContractWrite({
		...FactoryContractConfig,
		functionName: 'deployClone',
		args: [
			FactoryContractConfig.templateAddress, 
			tokenAddress as `0x${string}`, 
			startLPValue, 
			endLPValue
		],
	})

	const {
		data: receipt,
		isLoading: isPending,
		isSuccess,
	} = useWaitForTransaction(
		{ 
			hash: data?.hash,
			onSuccess(data) {
				console.log('TX Success');
				console.log('Adesso dovrei fare una read su Factory (proxy[proxy.lenght - 1]) per prendere l\'address del nuovo launchpool');
				console.log('Per il momento setto currentLP a 0x...');
				setEnableReadProxies(true);
			},
		}
	)

	// READ LAUNCHPOOL ADDRESS
	useContractRead({
		...FactoryContractConfig,
		functionName: 'proxies',
		args: [
			BigInt(0)						/* ATTENZIONE LEGGO LA PRIMA LAUNCHPOOL CREATA, NON QUELLA CORRETTA APPENA CREATA */ /* TODO */
		],
		enabled: enableReadProxies,
		onSuccess(data) {
			//console.log('Read Success');
			//console.log(data);
			console.log("ATTENZIONE LEGGO E USO IL PRIMO LAUNCHPOOL CREATO, NON QUELLO CORRETTO APPENA CREATO");
			props.setCurrentLP(data);
			setEnableReadProxies(false);

		},
	})


	// FUNCTIONS
	function createLaunchpool() {

		console.log("createLaunchpool");
		console.log("props.currentLP: ", props.currentLP);

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

	return (
		<>
			Create Launchpool
			<ul className="list-group controls-list-group">
				{!isSuccess ? 
					<>
						<li className="list-group-item  controls-list-group-item">
							<LinkToken {...linkTokenData} />
						</li> 
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
									id="start_lp" 
									name="start_lp" 
									placeholder="Start: --/--/---- --:--:--" 
									value={startLPValue.toString()} 
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										try {
											setStartLPValue(BigInt(e.target.value));
										} catch (err) {
											console.error("Valore non valido per StartLp BigInt:", e.target.value);
										}
									}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
									id="end_lp" 
									name="end_lp" 
									placeholder="End: --/--/---- --:--:--" 
									value={endLPValue.toString()} 
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										try {
											setEndLPValue(BigInt(e.target.value));
										} catch (err) {
											console.error("Valore non valido per EndLP BigInt:", e.target.value);
										}
									}}
							/>
						</li>
					</>
				: null}
				<li className="list-group-item controls-list-group-item">
					{isPending ?
						<div style= {{color: 'white', fontWeight: 'bold'}}>
							Transaction pending...
						</div> 
						: null
					}

					{(!isLoading && !isPending && props.currentLP == "") ? 
				 		<ControlButton {...create_launchpool}/> 
						: null
					}

					{isSuccess && (
						<div style= {{textAlign: 'center'}}>
							<p style= {{color: 'white'}}>Launchpool created</p>
							<p style= {{color: 'white'}}>{props.currentLP}</p>
							<a href={`https://mumbai.polygonscan.com/address/${props.currentLP}`}>See on Polygonscan</a>
						</div>
					)}
					{isError && <div>{(error as BaseError)?.shortMessage}</div>}

				</li>

			</ul>
		</>
	);
}
