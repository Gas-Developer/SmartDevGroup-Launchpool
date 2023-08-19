import { SetStateAction, useEffect, useState } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { Textfield } from "./input/Textfield";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LinkToken } from './LinkToken';
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";
import { FactoryContractConfig } from "../abi/factory-abi";
import { BaseError, stringify } from "viem";

var axios = require('axios');

/*
TODO LIST:
- [x] Spostare defaultTF in un file di const globale
- [x] Implementare controlli della checkLPInfoValidity
- [x] Implementare gli handleTransaction

*/



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

const PINATA_APIKEY = process.env.NEXT_PUBLIC_PINATA_APIKEY;
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET;
const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
const PINATA_PIN_JSON_TO_IPFS = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

export function CreateLaunchpool(props: any) {

	const [tokenAddress, setTokenAddress] = useState('');
	const [startLPValue, setStartLPValue] = useState(BigInt(0));
	const [endLPValue, setEndLPValue] = useState(BigInt(0));

	// Launchpool Info
	const [IpfsHash, setIPFSHash] = useState('');
	const [LPInfo, setLPInfo] = useState(
		{
			name: "",
			description: "",
			iconURL: "",
			lpWebsite: "",
			tokenWebsite: "",
			tokenAddress: "",
			startLP: "",
			endLP: "",
		}
	);

	// Intercetto la modifica di tokenAddress, startLPValue e endLPValue per aggiornare LPInfo
	useEffect(() => {
		setLPInfo({...LPInfo, tokenAddress: tokenAddress, startLP: startLPValue.toString(), endLP: endLPValue.toString(),});
	}, [tokenAddress, startLPValue, endLPValue]);

	// Read Launchpool Address Activator/Disactivator
	const [enableReadProxies, setEnableReadProxies] = useState(false);

	// Prepare deployClone
	// deployClone(address _implementationContract, ERC20 _token, uint _startLP, uint _endLP)
	const { write, data, error, isLoading, isError } = useContractWrite({
		...FactoryContractConfig,
		functionName: 'deployClone',
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
		functionName: 'getLaunchpools',
		enabled: enableReadProxies,
		onSuccess(data) {
			console.log('Read Success');
			console.log(data);

			//props.setCurrentLP(data);
			setEnableReadProxies(false);

		},
	})


	// SAVE LPINFO ON IPFS & THEN DEPLOY THE NEW LAUNCHPOOL
	function saveLPInfoOnIPFS(LPInfo: any) {

		// Attivo il loading spinner
		//handleTransactionStart();

		// Save LPInfo in IPFS via Pinata API and get the hash
		// https://pinata.cloud/documentation#PinJSONToIPFS

		let dataIPFS = JSON.stringify({
			pinataOptions: {
				cidVersion: 1,
			},
			pinataMetadata: {
				name: "The Launchpool Ready",
				keyvalues: {
					LPName: LPInfo.name,
					tokenAddress: tokenAddress,
					startLP: startLPValue.toString(),
					endLP: endLPValue.toString(),
				},
			},
			pinataContent: LPInfo,
		});

		let configIPFS = {
			method: "post",
			url: PINATA_PIN_JSON_TO_IPFS,
			headers: {
				pinata_api_key: PINATA_APIKEY,
				pinata_secret_api_key: PINATA_SECRET,
				"Content-Type": "application/json",
			},
			data: dataIPFS,
		};

		// Save LPInfo in IPFS via Pinata API and get the hash
		axios(configIPFS)
			.then(function (response: any) {
				console.log("response: ", response);
				// handleTransactionSuccess();
				setIPFSHash(response.data.IpfsHash);
				deployNewLaunchpool(response.data.IpfsHash);
				//deployNewLaunchpool(storageURI);
			});

	}

	// DEPLOY NEW LAUNCHPOOL
	function deployNewLaunchpool(storageURI: string) {
		if(startLPValue != undefined && startLPValue > 0 && endLPValue != undefined && endLPValue > 0 && tokenAddress != undefined && tokenAddress.startsWith('0x')) {

			write({
				args: [
					FactoryContractConfig.templateAddress, 
					tokenAddress as `0x${string}`, 
					BigInt(startLPValue), 
					BigInt(endLPValue),
					storageURI
				],
			})

		} else {
			console.log("ERROR: createLaunchpool");
			console.log("Some input datas are missing or wrong");
		}
	}

	// CHECK LPINFO VALIDITY
	function checkLPInfoValidity(LPInfo: any) {
		
		let validity = true;

		// TODO: Check LPInfo validity

		if(!validity)
			console.log("ERROR: checkLPInfoValidity");

		return validity;

	}

	// HANDLE TRANSACTION
	function handleTransactionStart() {
		console.log("handleTransactionStart");
	}

	function handleTransactionSuccess() {
		console.log("handleTransactionSuccess");
	}

	function handleTransactionError() {
		console.log("handleTransactionError");
	}

	// FUNCTIONS
	function createLaunchpool() {

		console.log("createLaunchpool");
		console.log("props.currentLP: ", props.currentLP);

		// Check LPInfo validity
		if(!checkLPInfoValidity(LPInfo))
			return;

		// Save LPInfo in IPFS via Pinata API and store the hash (CID/storageURI) in the LaunchpoolFactory
		saveLPInfoOnIPFS(LPInfo);

	}

	// RENDERING
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
								name="start_lp" 
								placeholder="Start: --/--/---- --:--:--" 
								value={startLPValue.toString()} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									try {
										setStartLPValue(BigInt(e.target.value));
									} catch (err) {
										// The user is probably typing something that is not a number
										//console.error("Valore non valido per StartLp BigInt:", e.target.value);
									}
								}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="end_lp" 
								placeholder="End: --/--/---- --:--:--" 
								value={endLPValue.toString()} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									try {
										setEndLPValue(BigInt(e.target.value));
									} catch (err) {
										// The user is probably typing something that is not a number
										//console.error("Valore non valido per EndLP BigInt:", e.target.value);
									}
								}}
							/>
						</li>

						<li>
							<hr/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="lp_name" 
								placeholder="Launchpool Name"
								value={LPInfo.name} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setLPInfo({...LPInfo, name: e.target.value});
								}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="lp_description" 
								placeholder="Description"
								value={LPInfo.description} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setLPInfo({...LPInfo, description: e.target.value});
								}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="lp_iconURL" 
								placeholder="Icon URL"
								value={LPInfo.iconURL} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setLPInfo({...LPInfo, iconURL: e.target.value});
								}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="lp_website" 
								placeholder="Launchpool Website"
								value={LPInfo.lpWebsite} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setLPInfo({...LPInfo, lpWebsite: e.target.value});
								}}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<Textfield {...defaultTF}
								name="lp_token_website" 
								placeholder="Token Website"
								value={LPInfo.tokenWebsite} 
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									setLPInfo({...LPInfo, tokenWebsite: e.target.value});
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
