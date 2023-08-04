"use client";
import { ContractData } from "../interfaces/ContractData";

export function AreaCreatorStats(props: ContractData) {

    const startLP = props.startLP;
    const endLP = props.endLP;

    return (
        <div>
            <label className="">StartLP: {startLP}</label>
            <br />
            <label>EndLP: {endLP}</label>
            <br />
            <label>Staking lenght: {props.stakingLength}</label>
            <br />
            <label>Token: {props.token}</label>
            <br />
            <label>
                Total token to distrubute:{" "}
                {props.totalTokenToDistribute}
            </label>
        </div>
    );
}