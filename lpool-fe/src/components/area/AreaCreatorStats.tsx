// TODO: 
// - Supporto a startLP e endLP con DatePicker in sola lettura
// - Supporto a stakingLength con calcolo della durata in giorni
// - Supporto a token con link a Polygonscan
// - Supporto a totalTokenToDistribute con calcolo del valore in token
// - Supporto a totalStaked con calcolo del valore in token
// - Supporto a name, symbol e totalSupply con visualizzazione dei dati



"use client";
import { Form, Row } from "react-bootstrap";
import { ContractData } from "../interfaces/ContractData";
import { Info } from "../label/Info";
import { ipfs_base_URI } from "../constants";
import axios from "axios";
import { useEffect, useState } from "react";

const logger = require("pino")();

export function AreaCreatorStats(props: ContractData) {

	const [lpCardInfo, setLPCardInfo] = useState({
		name: "",
		description: undefined,
		iconURL: "",
		lpWebsite: "",
		tokenWebsite: "",
		startLP: "--/--/--",
		endLP: "--/--/--",
	});

	useEffect(() => {
	// Se ho il cid nell'URI, allora recupero i dati dallo storage IPFS
		if(props.cid){
			const ipfsURI = ipfs_base_URI + props.cid;
			logger.info(ipfsURI);
			axios.get(ipfsURI).then((res) => {
				logger.info(res.data);

				setLPCardInfo({...lpCardInfo, ...res.data});
	
			});
		}
	}, [props.cid]);




	return (
		<>
			{/* Launchpool Name */}
			<h5>
				{lpCardInfo.name ? (
					lpCardInfo.name
				) : (
					""
				)}
			</h5>

			{/* Launchpool Image */}
			{lpCardInfo.iconURL ? (
				<div id="card-img-container">
					<img src={lpCardInfo.iconURL} alt="icon" width="250" height="200" />
					 {/* <Image
						loader={() => iconURL}
						src={iconURL}
						alt=""
						width={250}
						height={200}
						layout="responsive"
					/>  */}
				</div>
			) : (
				""
			)}

			{/* Launchpool Info */}
			<Form>
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"token_address"} 
						label={"Token Address"} 
						value={ props.token ? props.token : "Token Address"} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"token_name"} 
						label={"Token Name"} 
						value={ props.name ? props.name : "Token Name"} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"token_symbol"} 
						label={"Token Symbol"} 
						value={ props.symbol ? props.symbol : "Token Symbol"} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"total_rewards"} 
						label={"Total Rewards"} 
						value={"0"} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"lp_start"} 
						label={"Launchpool Start"} 
						value={lpCardInfo.startLP} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"lp_end"} 
						label={"Launchpool End"} 
						value={lpCardInfo.endLP} 
						size={40} 
						className={undefined} 
						classNameLabel={"form-label col-form-label col-sm-4"} 
						classNameValue="controls-textfield" 
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
							name={"farming_lenght"} 
							label={"Farming lenght"} 
							value={"0 days"} 
							size={40} 
							className={undefined} 
							classNameLabel={"form-label col-form-label col-sm-4"} 
							classNameValue="controls-textfield" 
						/>
				</Form.Group>
			</Form>
		</>
	);
}