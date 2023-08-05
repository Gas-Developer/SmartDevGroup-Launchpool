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

export function Textfield(props: TextfieldData) {

	let editableProps = {...props};
	editableProps.className = "form-control "+props.className;
	editableProps.size = props.size ? props.size : 35;

	return (
		<div>
			<input type="text" {...editableProps}/>
		</div>
	);

}
