// ContractData.ts

export interface ContractData {
	launchpoolAddress: string | undefined;
	cid: string;
	startLP: number;
	endLP: number;
	stakingLength: number;
	token: string;
	totalTokenToDistribute: number;
	totalStaked: number;
}