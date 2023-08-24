'use client'

import { useContractRead } from "wagmi";
import { UserTypeButton } from "../components/buttons/userType-button";
import { LPCard } from "./cards/LPCard";
import { FactoryContractConfig } from "../abi/factory-abi";

export default function LandingPage() {

	const { data, isLoading, isSuccess } = useContractRead({
		...FactoryContractConfig,
		functionName: "getLaunchpools"
	});

	return (
		<div id="appContainer">
			{isSuccess &&
				data?.map((data) => (
					<LPCard
						key={data.storageURI}
						storageURI={data.storageURI}
						launchpoolAddress={data.launchpoolAddress}
					/>
				))}

		</div>
	);
}