"use client";

import { ControlButtonData } from "../interfaces/ControlButtonData";

const logger = require("pino")();

/*
 * This is a control button that will be used in the AreaControls component.
*
* default prosps:
* - name: string default: ""
* - text: string default: "Button"
* - tooltip: string default: ""
* - onClick: function ( it will be passed in from the AreaControls component) default: () => {}
* - disabled: boolean default: false
* - className: string default: ""
* - iconURL: string default: ""

*/


export function ControlButton(props: ControlButtonData) {

	logger.info(props);

	const name = props.name || "";
	const text  = props.text || "Button";
	const tooltip = props.tooltip || "";
	const onClick = props.onClick || (() => {logger.info("You clicked ["+text+"] button!");});
	const disabled = props.disabled ? props.disabled : false;
	let className = props.className || "";
	const iconURL = props.iconURL || "";

	className = "btn btn-primary controlButton "+className;

	return (
		<div>
			<input  type="button" name={name} id={name} className={className} value={text} onClick={onClick} title={tooltip} disabled={disabled}/>
		</div>
	);

	



}
