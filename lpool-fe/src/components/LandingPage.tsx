'use client'

import { UserTypeButton } from "../components/buttons/userType-button";
import { Connect } from "../components/Connect";
import { useContractRead } from "wagmi";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { wagmiContractConfig } from "../abi/launchpool-abi";
import { useState } from "react";

export default function LandingPage() {

	const [isStarted, setIsStarted] = useState(false);

	return (
		<div>
			<div id="userTypeButtonsContainer">
				<UserTypeButton name="Investor" />
				<UserTypeButton name="Creator" />
			</div>
		</div>
		);
	}