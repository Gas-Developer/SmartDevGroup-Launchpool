import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";


export function DeployFormContainer(props: any) {

	return (
		<>
			<TrasparentContainer className="" >
				<DefaultContainer className="">
					<DeployForm {...props} />
				</DefaultContainer>
			</TrasparentContainer>
		</>
	);

}