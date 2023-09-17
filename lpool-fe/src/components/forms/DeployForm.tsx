import { SetStateAction, useEffect, useState } from "react";
import { defaultTF, tfStyle, labelStyle, dateTimePickerStyle, PINATA_APIKEY, PINATA_SECRET, PINATA_PIN_JSON_TO_IPFS, connect_wallet, disconnect_wallet, getDuration } 
	from "../constants";
import { Textfield } from "../input/Textfield";
import { InfoLabel } from "../label/InfoLabel";
import DateTimePicker from "../dateTimePicker";
import { Textarea } from "../input/Textarea";
import { Checkbox } from "../input/Checkbox";
import { ImageButton } from "../buttons/ImageButton";
import deployLaunchpoolBTN from "../../assets/images/DeployLaunchpoolBTN.png";
import { useDebounce } from "../../hooks/useDebounce";
import { useContractWrite, useWaitForTransaction, useContractRead, useAccount, useConnect, useDisconnect } from "wagmi";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { ControlButton } from "../buttons/ControlButton";

const logger = require("pino")();

/*
TODO LIST:
- [ ] Implementare controlli della checkLPInfoValidity
- [ ] Implementare gli handleTransaction 
- [ ] Implemntare pattern nei campi del form
*/


let startLPValueInSeconds = BigInt(0);
let endLPValueInSeconds = BigInt(0);

export function DeployForm(props: any) {

	const router = useRouter();
	const now = new Date();

	const [formData, setFormData] = useState({
		description: "",
		tokenAddress: "",
		imageURL: "",
		webURL: "",
		startLPValue: BigInt(0),
		endLPValue: BigInt(0),
		isFeatured: false,
	});


		// // Launchpool Info
		// const [LPInfo, setLPInfo] = useState(
		// 	{
		// 		name: "",
		// 		description: "",
		// 		iconURL: "",
		// 		lpWebsite: "",
		// 		tokenWebsite: "",
		// 		tokenAddress: "",
		// 		startLP: "",
		// 		endLP: "",
		// 	}
		// );


	const [duration, setDuration] = useState("");

	const debouncedFormData = useDebounce(formData);

	// Setto i Preview Data al variare del Form Data - uso il debouncedFormData per evitare di fare troppe chiamate
	useEffect(() => {

		setDuration(getDuration(debouncedFormData.startLPValue, debouncedFormData.endLPValue));

		// Controllo che il token address abbia la lunghezza giusta e inizi con 0x
		// oppure sia vuoto per attivare la scomparsa delle schede Preview e Deploy Cost
		if(
			(debouncedFormData.tokenAddress.length == 42 && debouncedFormData.tokenAddress.startsWith("0x")) ||
			(debouncedFormData.tokenAddress.length == 0)
		) {
			props.setLPCardPreviewData( {...debouncedFormData} );
		}
	}, [debouncedFormData]);


	const handleOnChange = () => {
		setFormData( {...formData, isFeatured: !formData.isFeatured} );
	};

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
	function saveLPInfoOnIPFS() {

		let tokenAddress = formData.tokenAddress;

		startLPValueInSeconds = BigInt(formData.startLPValue) / BigInt(1000);
		endLPValueInSeconds = BigInt(formData.endLPValue) / BigInt(1000);

		//logger.info("startLPValueInSeconds", startLPValueInSeconds);
		//logger.info("endLPValueInSeconds", endLPValueInSeconds);

		// Attivo il loading spinner
		//handleTransactionStart();

		// Save LPInfo in IPFS via Pinata API and get the hash
		// https://pinata.cloud/documentation#PinJSONToIPFS


		const LPInfo = {
			//name: "The Launchpool Ready",
			description: formData.description,
			iconURL: formData.imageURL,
			//lpWebsite: "",
			tokenWebsite: formData.webURL,
			tokenAddress: tokenAddress,
			startLP: startLPValueInSeconds.toString(),
			endLP: endLPValueInSeconds.toString(),
			isFeatured: formData.isFeatured,
		};

		//logger.info("LPInfo", LPInfo);

		let dataIPFS = JSON.stringify({
			pinataOptions: {
				cidVersion: 1,
			},
			pinataMetadata: {
				name: "The Launchpool Ready",
				keyvalues: {
					//LPName: LPInfo.name,
					tokenAddress: tokenAddress,
					startLP:  LPInfo.startLP,
					endLP: LPInfo.endLP,
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

		let tokenAddress = formData.tokenAddress;
		let startLPValue = formData.startLPValue;
		let endLPValue = formData.endLPValue;

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

	// START
	// Deploy BTN
	function createLaunchpool() {

		// Check LPInfo validity
		if(!checkLPInfoValidity(formData))
			return;

		logger.info("Creating new Launchpool...");

		// Save LPInfo in IPFS via Pinata API and store the hash (CID/storageURI) in the LaunchpoolFactory
		saveLPInfoOnIPFS();

	}


	// WALLET CONNECT
	const { connector, isConnected } = useAccount()
	const { connect, connectors, pendingConnector } = useConnect()
	const { disconnect } = useDisconnect()


	connect_wallet.onClick = () => connect({ connector: connectors[0] });
	disconnect_wallet.onClick = () => disconnect();

	return (
		<>
			<div className="grid grid-cols-10 gap-4">
				{/* ROW 1 */}
				<div className="col-span-10 ">
					<Textarea 
						{...defaultTF}
						id="description" 
						name="description" 
						placeholder="Write the Launchpool / Token description here"
						value={formData.description} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, description: e.target.value.toString()} )}
						className={tfStyle}
						rows={5}
					/>
				</div>
				
				{/* ROW 2 */}
				<div className="col-span-1">
					<InfoLabel name={"TokenLabel"} value={"Token*"} className={labelStyle} />
				</div>
				<div className="col-span-9">
					<Textfield 
						{...defaultTF}
						id="tokenAddress" 
						name="tokenAddress" 
						placeholder="0x..."
						value={formData.tokenAddress} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, tokenAddress: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>

				{/* ROW 3 */}
				<div className="col-span-1">
					<InfoLabel name={"fromLabel"} value={"from*"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<DateTimePicker 
						id="startLP"
						placeholder={now.toLocaleString()}
						calendarInputClass={dateTimePickerStyle}
						calendarInputSize={20}
						onChange={
							(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, startLPValue: BigInt(e.valueOf().toString())} )
						}
					/>
				</div>
				<div className="col-span-1 text-right">
					<InfoLabel name={"toLabel"} value={"to*"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<DateTimePicker 
						id="endLP"
						placeholder={now.toLocaleString()}
						calendarInputClass={dateTimePickerStyle}
						calendarInputSize={20}
						onChange={
							(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, endLPValue: BigInt(e.valueOf().toString())} )
						}
					/>
				</div>
				<div className="col-span-2 text-xs text-end">
					<InfoLabel name={"toLabel"} value={duration} className={labelStyle} />
				</div>

				{/* ROW 4 */}
				<div className="col-span-1">
					<InfoLabel name={"imageURLLabel"} value={"Image"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<Textfield 
						{...defaultTF}
						id="imageURL" 
						name="imageURL" 
						placeholder="0x..."
						value={formData.imageURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, imageURL: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>
				<div className="col-span-1">
					<InfoLabel name={"webURLLabel"} value={"Web site"} className={labelStyle} />
				</div>
				<div className={"col-span-5"}>
					<Textfield 
						{...defaultTF}
						id="webURL" 
						name="webURL" 
						placeholder="http://"
						value={formData.webURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, webURL: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>

				{/* ROW 5 */}
				<div className="col-span-1">
					<InfoLabel name={"Featured"} value={"Featured"} className={labelStyle} />
				</div>
				<div className={"col-span-1"}>
					<Checkbox 
						{...defaultTF}
						id="featured" 
						name="featured" 
						placeholder={undefined}
						value={undefined} 
						onChange={handleOnChange}
						className={" "}
						checked={formData.isFeatured}
					/>
				</div>
				<div className="col-span-8">
					
				</div>
				<div className="col-span-9 text-center">

					{/* Wallet Connection */} 
					{!isConnected ? // TODO: Convertire in un component WalletConnection
						<ControlButton {...connect_wallet}/> :
						<ImageButton 
							name="deployLaunchpoolBTN" src={deployLaunchpoolBTN} tooltip="Deploy Launchpool" onClick={createLaunchpool} 
							width={200} height={50} className=" "
						/>
					}
			
				</div>
			</div>
		</>
	);

}