"use client";

import MiniLPCard from "../../cards/MiniLPCard";

export default function LaunchpoolPhase(props: any) {
	const phase = props.phase;
	const launchpools = props.launchpools;

	return (
		<>
			{launchpools?.length > 0 && (
				<div id={phase + "Container"}>
					<p className="phaseTitle">{phase} phase</p>
					<hr />
					{launchpools?.map((lpool: any) => (
						<MiniLPCard key={lpool} {...lpool} />
					))}
				</div>
			)}
		</>
	);
}
