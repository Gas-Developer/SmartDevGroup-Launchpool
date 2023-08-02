import { UserTypeButton } from "../components/buttons/userType-button";
import { Connect } from "../components/Connect";
import { useContractRead } from "wagmi";
import { ReadContract } from "../components/ReadContract";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { wagmiContractConfig } from "../abi/contract-abi";
import LandingPage from "../components/LandingPage";

export default function Page() {

	return (
		<div>
			<LandingPage />
		</div>
	);
}
