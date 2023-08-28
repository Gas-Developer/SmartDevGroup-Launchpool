"use client";

import { useEffect, useState } from "react";
import MiniLPCard from "../../cards/MiniLPCard";
import { stringify } from "../../../utils/stringify";

const logger = require("pino")();

export default function LaunchpoolPhase(props: any) {
	const phase = props.phase;
	const launchpools = props.launchpools;

	return (
		<div id={phase + "Container"}>
			<p className="phaseTitle">{phase} phase</p>
			<hr />
			{launchpools?.map((data: any) => (
				<MiniLPCard key={stringify(data)} launchpoolInfo={data} />
			))}
		</div>
	);
}
