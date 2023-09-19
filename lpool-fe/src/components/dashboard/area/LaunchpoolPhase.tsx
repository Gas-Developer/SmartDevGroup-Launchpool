"use client";

import MiniLPCard from "../../cards/MiniLPCard";
import DefaultContainer from "../../containers/DefaultContainer";
import TrasparentContainer from "../../containers/TrasparentContainer";

export default function LaunchpoolPhase(props: any) {
	const phase = props.phase;
	const launchpools = props.launchpools;

	return (
		<>
			{launchpools?.length > 0 && (
				<div id={phase + "Container"}>
					<TrasparentContainer className="" >
					<p className="phaseTitle">{phase} phase</p>
					<hr />

						{/* <DefaultContainer className=""> */}
							{launchpools?.map((lpool: any, index: number) => (
								<MiniLPCard key={index} {...lpool} />
							))}
						{/* </DefaultContainer> */}
					</TrasparentContainer>
				</div>
				
			)}
		</>
	);
}
