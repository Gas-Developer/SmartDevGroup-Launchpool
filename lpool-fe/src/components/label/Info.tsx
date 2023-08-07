// Desc: This file contains the Info component
// Date Modified: 8/20/2021
// Type: React Component
// Path: lpool-fe/src/components/label/Info.tsx


import { Col, Form } from "react-bootstrap";
import { InfoLabel } from "./InfoLabel";
import { InfoValue } from "./InfoValue";

interface InfoData {
	name: string;
	label: string | undefined;
	value: string | undefined;
	className: string | undefined;
	classNameLabel: string | undefined;
	classNameValue: string | undefined;
	size: number | undefined;
}

export function Info(props: InfoData) {

	let info_value = props.value;
	if(props.value != undefined && props.value.length > 40) 
		info_value = props.value.substring(0, 10) + "..." +props.value.substring(props.value.length - 10, props.value.length);

	return (
		<>
			<InfoLabel name={props.name+"Label"} value={props.label} className={props.classNameLabel} />
			<Col sm="8">
				<InfoValue name={props.name+"Value"} value={info_value} className={props.classNameValue} size={props.size} />
			</Col>
		</>

	);

}
