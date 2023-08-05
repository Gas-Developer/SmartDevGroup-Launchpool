"use client";

import { ContractData } from "../interfaces/ContractData";
import "../../assets/styles/stats-list.css";
const logger = require("pino")();

function secondsToDate(seconds: number): Date {
	const milliseconds = seconds * 1000;
	return new Date(milliseconds);
}

export function AreaInvestorStats(props: ContractData) {

	const startLP = secondsToDate(props.startLP);
	const endLP = secondsToDate(props.endLP);

	const startLPDate = startLP.toLocaleDateString();
	const startLPTime = startLP.toLocaleTimeString();
	const endLPDate = endLP.toLocaleDateString();
	const endLPTime = endLP.toLocaleTimeString();

	const launchpoolDuration = Math.floor(props.stakingLength / 86400);

	const totalSupply = props.totalSupply;

	return (
		<>
			<ul className="list-group stats-list-group">
				<li className="list-group-item  stats-list-group-item">
					<label>
						Token name: {props.name}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>
						Token symbol: {props.symbol}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>
						Total supply: {totalSupply}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>
						Total rewards: {props.totalTokenToDistribute}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>
						Launchpool start: {startLPDate + " at " + startLPTime}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>
						Launchpool end: {endLPDate + " at " + endLPTime}
					</label>
				</li>
				<li className="list-group-item  stats-list-group-item">
					<label>Farming period: {launchpoolDuration} Days</label>
				</li>
			</ul>
		</>
	);

}




