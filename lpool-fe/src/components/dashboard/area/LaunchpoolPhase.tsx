"use client";

import MiniLPCard from "../../cards/MiniLPCard";
const logger = require("pino")();

export default function LaunchpoolPhase(props: any) {
	const phase = props.phase;
	const launchpools = props.launchpools;

	return (
		<div id={phase + "Container"}>
			<p className="phaseTitle">{phase} phase</p>
			<hr />
			{launchpools?.map((lpool: any) => (
				<MiniLPCard key={lpool} {...lpool} />
			))}
		</div>
	);
}
