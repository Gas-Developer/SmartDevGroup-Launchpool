import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";


export function DeployFormContainer() {

	return (
		<>
			<TrasparentContainer className="" >
				<DefaultContainer className="">
					<DeployForm />
				</DefaultContainer>
			</TrasparentContainer>
		</>
	);

}