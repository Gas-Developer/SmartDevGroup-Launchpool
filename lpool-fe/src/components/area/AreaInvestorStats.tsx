"use client";

const logger = require("pino")();

interface AreaInvestorStatsProps {
    contractData: ContractData;
}

interface ContractData {
	startLP: string;
	endLP: string;
	stakingLength: string;
	token: string;
	totalTokenToDistribute: string;
}

export function AreaInvestorStats(props: AreaInvestorStatsProps) {
    const contractData = props.contractData;
    const startLP = contractData.startLP;
    const endLP = contractData.endLP;

    logger.info(contractData);

    return (
        <div>
            <label className="">StartLP: {startLP}</label>
            <br />
            <label>EndLP: {endLP}</label>
            <br />
            <label>Staking lenght: {contractData.stakingLength}</label>
            <br />
            <label>Token: {contractData.token}</label>
            <br />
            <label>
                Total token to distrubuyte:{" "}
                {contractData.totalTokenToDistribute}
            </label>
        </div>
    );
}




