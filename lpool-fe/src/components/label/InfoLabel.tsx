/*
*	props.name = "";
	props.value = "";
	props.className = "InfoLabel";
*/


import { InfoLabelData } from "../interfaces/InfoLabelData";

export function InfoLabel(props: InfoLabelData) {

	let editableProps = { ...props };
	
	if(props.className)
		editableProps.className = "InfoLabel "+props.className;

	return (
		<>
			<label id={props.name} className={editableProps.className}> {editableProps.value}</label>
		</>
	);

}
