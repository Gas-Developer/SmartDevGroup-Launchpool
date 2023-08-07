"use client";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ContractData } from "../interfaces/ContractData";
import { Textfield } from "../input/Textfield";
import { ControlButton } from "../buttons/ControlButton";
import { InfoValue } from "../label/InfoValue";
import { Info } from "../label/Info";

export function AreaCreatorStats(props: ContractData) {

	const startLP = props.startLP;
	const endLP = props.endLP;

	return (
		<>
			<Form>
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Info 
						name={"token_address"} 
						label={"Token Address"} 
						value={"Token Address"} 
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
						value={"Token Name"} 
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
						value={"Token Symbol"} 
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
						value={"--/--/--"} 
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
							value={"--/--/--"} 
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

			<ControlButton name="bLPoolSettings" text="Save Changes" tooltip="Save Changes" onClick={undefined} disabled={false} className="fullWidthBTN" iconURL="" />
		</>
	);
}