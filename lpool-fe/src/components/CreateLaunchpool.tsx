/*
* Crea una nuova Launchpool
* 1. Salva LPInfo in IPFS
* 2. Deploy del nuovo Launchpool
* 3. Salva l'address del nuovo Launchpool in Factory
* 4. Legge l'address del nuovo Launchpool da Factory
* 5. Reindirizza l'utente alla pagina Creator con l'address della nuova Launchpool
*/

import { useState, useEffect, SetStateAction } from "react";
import { ControlButton } from "./buttons/ControlButton";
import { ControlButtonData } from "./interfaces/ControlButtonData";
import { LinkToken } from './LinkToken';
import { useContractRead, useContractWrite, useWaitForTransaction } from "wagmi";

import { FactoryContractConfig } from "../abi/factory-abi";
import { BaseError, stringify } from "viem";
import DateTimePicker from "./dateTimePicker";
import { Textfield } from "./input/Textfield";
import { useRouter } from 'next/navigation';

import { defaultTF } from "./costants";


const logger = require("pino")();
var axios = require('axios');

/*
TODO LIST:
- [ ] Implementare controlli della checkLPInfoValidity
- [ ] Implementare gli handleTransaction 
*/

const PINATA_APIKEY = process.env.NEXT_PUBLIC_PINATA_APIKEY;
const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET;
const PINATA_PIN_JSON_TO_IPFS = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

let startLPValueInSeconds = BigInt(0);
let endLPValueInSeconds = BigInt(0);

export function CreateLaunchpool(props: any) {

	const router = useRouter();

	const [tokenAddress, setTokenAddress] = useState('');
	const [startLPValue, setStartLPValue] = useState(0);
	const [endLPValue, setEndLPValue] = useState(0);

	// Launchpool Info
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
		setLPInfo({...LPInfo, tokenAddress: tokenAddress, startLP: startLPValueInSeconds.toString(), endLP: endLPValueInSeconds.toString(),});
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
				logger.info('Launchpool deployed succesfully');
				logger.info('Reading new Launchpool address...');
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

			const lpAddress = data?.[data.length - 1].launchpoolAddress;
			const cid = data?.[data.length - 1].storageURI;

			setEnableReadProxies(false);

			logger.info('New Launchpool address: ', lpAddress);
			logger.info('New Launchpool storageURI: ', cid);
			logger.info('Redirecting Creator to Launchpool page for Creators...');
			// Reindirizzo l'utente alla pagina Creator con l'address della nuova Launchpool
			router.push("/dashboard/" + lpAddress+"/" + cid + "/creator");

		},
	})


	// SAVE LPINFO ON IPFS & THEN DEPLOY THE NEW LAUNCHPOOL
	function saveLPInfoOnIPFS(LPInfo: any) {

		startLPValueInSeconds = BigInt(startLPValue) / BigInt(1000);
		endLPValueInSeconds = BigInt(endLPValue) / BigInt(1000);

		logger.info("startLPValueInSeconds", startLPValueInSeconds);
		logger.info("endLPValueInSeconds", endLPValueInSeconds);

		// Attivo il loading spinner
		//handleTransactionStart();

		// Save LPInfo in IPFS via Pinata API and get the hash
		// https://pinata.cloud/documentation#PinJSONToIPFS
		
		LPInfo.startLP = startLPValueInSeconds.toString();
		LPInfo.endLP = endLPValueInSeconds.toString();

		let dataIPFS = JSON.stringify({
			pinataOptions: {
				cidVersion: 1,
			},
			pinataMetadata: {
				name: "The Launchpool Ready",
				keyvalues: {
					LPName: LPInfo.name,
					tokenAddress: tokenAddress,
					startLP: startLPValueInSeconds.toString(),
					endLP: endLPValueInSeconds.toString(),
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

		logger.info("Saving LPInfo on IPFS...");

		// Save LPInfo in IPFS via Pinata API and get the hash
		axios(configIPFS)
			.then(function (response: any) {

				// handleTransactionSuccess();

				logger.info("Deploying new Launchpool...");
				deployNewLaunchpool(response.data.IpfsHash);
			});

	}

	// DEPLOY NEW LAUNCHPOOL
	function deployNewLaunchpool(storageURI: string) {

		if (startLPValue != undefined && startLPValue > 0 && endLPValue != undefined && endLPValue > 0 && tokenAddress != undefined && tokenAddress.startsWith('0x')) {

			write({

				args: [
					FactoryContractConfig.templateAddress, 
					tokenAddress as `0x${string}`, 
					startLPValueInSeconds, 
					endLPValueInSeconds,
					storageURI
				],
			})

		} else {
			logger.info("ERROR: createLaunchpool");
			logger.info("Some input datas are missing or wrong");
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

		// Check LPInfo validity
		if(!checkLPInfoValidity(LPInfo))
			return;

		logger.info("Creating new Launchpool...");

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
							<DateTimePicker
								id="start_lp"
								placeholder="Enter launchpool start time"
								calendarInputClass="form-control controls-textfield"
								onChange={
									(e: { target: { value: SetStateAction<string>; }; }) => setStartLPValue( Number(e.valueOf().toString()) )
								}
								calendarInputSize={40}
							/>
						</li>
						<li className="list-group-item controls-list-group-item">
							<DateTimePicker
								id="end_lp"
								placeholder="Enter launchpool end time"
								calendarInputClass="form-control controls-textfield"
								onChange={
									(e: { target: { value: SetStateAction<string>; }; }) => setEndLPValue( Number(e.valueOf().toString()) )
								}
								calendarInputSize={40}
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

					{(!isLoading && !isPending && (props.launchpoolAddress == "" || props.launchpoolAddress == undefined)) ? 
						<ControlButton {...create_launchpool}/> 
						: null
					}

					{isSuccess && (
						<div style= {{textAlign: 'center'}}>
							<p style= {{color: 'white'}}>Launchpool created</p>
							<p style= {{color: 'white'}}>{props.launchpoolAddress}</p>
							<a href={`https://mumbai.polygonscan.com/address/${props.launchpoolAddress}`}>See on Polygonscan</a>
						</div>
					)}
					{isError && <div>{(error as BaseError)?.shortMessage}</div>}

				</li>

			</ul>
		</>
	);

}
