import { useContractRead } from "wagmi";
import { ControlButtonData } from "../interfaces/ControlButtonData";

export function StakeButton(props: ControlButtonData) {

	const className = "btn btn-primary controlButton "+ props.className;

	return (
		<>
			<input 
				type="button" 
				name={props.name} 
				id={props.name} 
				className={className} 
				value={props.text} 
				onClick={props.onClick} 
				title={props.tooltip} 
				disabled={props.disabled}
				size={100}
			/>
		</>
	);
}