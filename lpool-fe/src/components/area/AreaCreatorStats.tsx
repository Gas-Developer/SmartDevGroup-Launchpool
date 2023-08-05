"use client";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ContractData } from "../interfaces/ContractData";

export function AreaCreatorStats(props: ContractData) {

	const startLP = props.startLP;
	const endLP = props.endLP;

	return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4"> Token Address</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue="token address"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
					<Form.Label column sm="4"> Token Name:</Form.Label>
					<Form.Label column sm="4"></Form.Label>
				</Form.Group>
				
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4"> Token Symbol</Form.Label>
					<Form.Label column sm="4"></Form.Label>
				</Form.Group>
				
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4"> Total Rewards</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue="Total rewards"/>
                    </Col>
				</Form.Group>
								
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4">Launchpool Start</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue="Launchpool start"/>
                    </Col>
				</Form.Group>
				
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4">Launchpool End</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue="Launchpool end"/>
                    </Col>
				</Form.Group>
				
				<Form.Group as={Row} className="mb-2" controlId="formPlaintextEmail">
                    <Form.Label column sm="4">Farming Period</Form.Label>
                    <Col sm="8">
                        <Form.Control type="text" defaultValue="Farming period"/>
                    </Col>
                </Form.Group>
			</Form>

			<Button id="bLPoolSettings" variant="dark">Save Changes</Button>
        </>
    );
}