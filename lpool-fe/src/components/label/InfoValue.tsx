/*
*	props.name = "";
	props.value = "";
	props.className = "InfoValue";
	props.size = undefined;
*/


import { InfoValueData } from "../interfaces/InfoValueData";

export function InfoValue(props: InfoValueData) {

	let editableProps = {...props};
	if(props.className)
		editableProps.className = "InfoValue "+props.className;
	editableProps.size = props.size ? props.size : 35;

	return (
		<div id={props.name} {...editableProps}>
			<span >{editableProps.value}</span>
		</div>
	);

}
