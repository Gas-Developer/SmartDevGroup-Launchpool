"use client";
import { ContractData } from "../interfaces/ContractData";

export function AreaCreatorStats(props: ContractData) {

	const startLP = props.startLP;
	const endLP = props.endLP;

	return (
		<div>
			<label>Campo di tipo testuale</label>
			<input type="text" className="form-control" id="exampleInputText"/>
		</div>
	);
}