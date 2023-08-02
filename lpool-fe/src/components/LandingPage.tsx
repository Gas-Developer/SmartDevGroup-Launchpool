'use client'

import { UserTypeButton } from "../components/buttons/userType-button";
import { Connect } from "../components/Connect";
import { useContractRead } from "wagmi";
import { ReadContract } from "../components/ReadContract";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { wagmiContractConfig } from "../abi/contract-abi";
import { useState } from "react";

export default function LandingPage() {

	const [isStarted, setIsStarted] = useState(false);

	function IsStarted() {

		const { data, isRefetching, refetch } = useContractRead({
		  ...wagmiContractConfig,
		  functionName: "isStarted",
		});

		if(data?.toString() === "true") 
			setIsStarted(true);
		else 
			setIsStarted(false);

	}

	return (
		<div>
			<div id="userTypeButtonsContainer">
				<UserTypeButton name="Investor" disabled={isStarted} isStarted={isStarted} />
				<UserTypeButton name="Creator" disabled={isStarted}  isStarted={isStarted}/>
			</div>
		</div>
		);
	}