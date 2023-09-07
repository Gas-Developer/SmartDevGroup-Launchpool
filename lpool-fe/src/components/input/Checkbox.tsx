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


import { CheckboxData } from "../interfaces/CheckboxData";


export function Checkbox(props: CheckboxData) {

	let editableProps = {...props};
	editableProps.size = props.size ? props.size : 35;
	editableProps.id = props.id ? props.id : props.name;
	editableProps.checked = props.checked ? props.checked : false;
	editableProps.className = "w-5 h-5 bg-gray-100 rounded-lg dark:bg-gray-700 "+props.className;

	return (
		<>
			<div className="checkbox-container">
				<input type="checkbox" {...editableProps}  /> 
				<span className="checkmark"></span>
			</div>
		</>
	);

}
