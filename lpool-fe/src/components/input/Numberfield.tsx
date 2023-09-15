/*
*	props.name = "";
	props.value = "";
	props.placeholder = "";
	props.onChange = {};
	props.disabled = false;
	props.required = false;
	props.className = "form-control";
	props.minlength = undefined;
	props.maxlength = undefined;
	props.size = undefined;
	props.pattern = undefined;
*/


import { TextfieldData } from "../interfaces/TextfieldData";

export function Numberfield(props: TextfieldData) {

	let editableProps = {...props};
	editableProps.className = "form-control "+props.className;
	editableProps.size = props.size ? props.size : 35;
	editableProps.id = props.id ? props.id : props.name;

	return (
		<>
			<input type="number" {...editableProps}/>
		</>
	);

}
