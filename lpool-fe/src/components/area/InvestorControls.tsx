"use client";

import { propTypes } from "react-bootstrap/esm/Image";
import { ControlButton } from "../buttons/ControlButton";


export function InvestorControls(props: any) {

	return (
		<div>
			<h3>InvestorControls</h3>
			<h3>LP Address: {props.launchpoolAddress}</h3>
			
		</div>
	);
}


