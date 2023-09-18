import { DepositForm } from "../forms/DepositForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";


export function DepositFormContainer(props: any) {

	return (
		<>
			<TrasparentContainer className="" >
				<br/>
					<DepositForm launchpoolAddress={props.launchpoolAddress} /> 
			</TrasparentContainer>
		</>
	);

}