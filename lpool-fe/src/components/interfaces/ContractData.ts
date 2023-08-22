// ContractData.ts

export interface ContractData {
	LPAddress: string | undefined;
	startLP: number;
	endLP: number;
	stakingLength: number;
	token: string;
	totalTokenToDistribute: number;
	totalStaked: number;
	name: string;
	symbol: string;
	totalSupply: string;
}