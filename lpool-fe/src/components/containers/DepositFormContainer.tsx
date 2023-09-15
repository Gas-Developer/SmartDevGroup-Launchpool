import { Deposit } from "../Deposit";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";


export function DepositFormContainer(props: any) {

	return (
		<>
			<TrasparentContainer className="" >
				<br/>
					<Deposit launchpoolAddress={props.launchpoolAddress} /> 
			</TrasparentContainer>
		</>
	);

}