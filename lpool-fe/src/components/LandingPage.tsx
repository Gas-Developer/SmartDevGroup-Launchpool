'use client'

import { UserTypeButton } from "../components/buttons/userType-button";
import { LPCard } from "./cards/LPCard";

export default function LandingPage() {

	return (
		<>
			{/* 
				// USATO solo per testare la LPCard
			<div id="lp-card-container" className="card">
				<LPCard storageURI="bafkreiditrvu3aavo47h2igotjeqsitxjgbnyyyio7veu2n5b67yum3zoi"/>
			</div> 
			*/}
			<div id="userTypeButtonsContainer">
				<UserTypeButton name="Investor" />
				<UserTypeButton name="Creator" />
			</div>
		</>
	);
}