import { UserTypeButton } from "../components/buttons/userType-button";
import { Connect } from "../components/Connect";
import { useContractRead } from "wagmi";
import { ReadContract } from "../components/ReadContract";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { wagmiContractConfig } from "../abi/contract-abi";

export default function Page() {

  return (
    <div>
      <div id="userTypeButtonsContainer">
        <UserTypeButton name="Investor" disabled={true} />
        <UserTypeButton name="Creator" disabled={false} />
      </div>
    </div>
  );
}
