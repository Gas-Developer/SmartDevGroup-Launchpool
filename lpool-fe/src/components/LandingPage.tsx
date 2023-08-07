'use client'

import { UserTypeButton } from "../components/buttons/userType-button";
//import { useState } from "react";

export default function LandingPage() {

	//const [isStarted, setIsStarted] = useState(false);

	return (
		<div>
			<div id="userTypeButtonsContainer">
				<UserTypeButton name="Investor" />
				<UserTypeButton name="Creator" />
			</div>
		</div>
		);
	}