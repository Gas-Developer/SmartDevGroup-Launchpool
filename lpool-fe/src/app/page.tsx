import { UserTypeButton } from "../components/buttons/userType-button";
import { contractAbi } from "../abi/contract-abi";

export default function Page() {

  const contractAddress = process.env.NEXT_CONTRACT_ADDRESS as `0x${string}`;


  return (
    <div id="userTypeButtonsContainer">
      <UserTypeButton name="Investor" disabled={true} />
      <UserTypeButton name="Creator" disabled={false} />
    </div>
  );
}
