import { useContractRead } from "wagmi";
import { ControlButtonData } from "../interfaces/ControlButtonData";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useState } from "react";

export function StakeButton(props: ControlButtonData) {

	const className = "btn btn-primary controlButton "+props.className;

	return (
		<div>
			<input 
				type="button" 
				name={props.name} 
				id={props.name} 
				className={className} 
				value={props.text} 
				onClick={props.onClick} 
				title={props.tooltip} 
				disabled={props.disabled}
			/>
		</div>
	);
}