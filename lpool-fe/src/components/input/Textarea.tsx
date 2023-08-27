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
	prosps.rows = undefined;
	props.pattern = undefined;
*/


import { TextareaData } from "../interfaces/TextareaData";

export function Textarea(props: TextareaData) {

	let editableProps = {...props};
	editableProps.className = "form-control "+props.className;
	editableProps.size = props.size ? props.size : 35;
	editableProps.rows = props.rows ? props.rows : 5;
	editableProps.id = props.id ? props.id : props.name;

	return (
		<>
			<textarea {...editableProps} defaultValue={props.value} name={editableProps.name} cols={props.size} />
		</>
	);

}
