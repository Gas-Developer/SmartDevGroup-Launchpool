'use client'

import { UserTypeButton } from "../components/buttons/userType-button";

export default function LandingPage() {

	return (
		<div>
			<div id="userTypeButtonsContainer">
				<UserTypeButton name="Investor" />
				<UserTypeButton name="Creator" />
			</div>
		</div>
	);
}