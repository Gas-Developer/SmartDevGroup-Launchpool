import { DeployForm } from "../forms/DeployForm";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { InfoLabel } from "../label/InfoLabel";
import { Balance } from "../Balance";
import { useContractReads, useToken } from "wagmi";
import { LaunchpoolContractConfig } from "../../abi/launchpool-abi";
import { useEffect, useState } from "react";
import { ContractData } from "../interfaces/ContractData";
import { wagmiTokenConfig } from "../../abi/token-abi";


export function DepositInfoContainer(props: any) {
	
	const now = new Date().getTime();
	//console.log("DepositInfoContainer props: ", props);
	const launchpoolAddress = props.launchpoolAddress as `0x${string}`;
	const tokenAddress = props.tokenAddress as `0x${string}`;

	const [depositInfo , setDepositInfo] = useState({
		totalTokenToDistribute: 0,
		timeUntilStart: 0,
		myTokenSupply: 0,
		tokenName: "",
		tokenSymbol: "",
		totalTokenSupply: 0,
		mySupplyValue: 0,
		mySupplyText: "0",
	} );

	const { data, isSuccess, isLoading } = useContractReads({
		contracts: [
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "startLP",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "endLP",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "stakingLength",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "token",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "totalTokenToDistribute",
			},
			{
				...LaunchpoolContractConfig,
				address: launchpoolAddress,
				functionName: "totalStaked",
			},
			{
				...wagmiTokenConfig,
				address: tokenAddress,
				functionName: "name",
			},
			{
				...wagmiTokenConfig,
				address: tokenAddress,
				functionName: "symbol",
			},
			{
				...wagmiTokenConfig,
				address: tokenAddress,
				functionName: "totalSupply",
			},
			{
				...wagmiTokenConfig,
				address: tokenAddress,
				functionName: "balanceOf",
				args: [props.account],
			},
		],
	});

	useEffect(() => {
		if (
			isSuccess &&
			!isLoading &&
			data?.[0].result !== undefined &&
			data?.[1].result !== undefined &&
			data?.[2].result !== undefined &&
			data?.[3].result !== undefined &&
			data?.[4].result !== undefined &&
			data?.[6].result !== undefined &&
			data?.[7].result !== undefined &&
			data?.[8].result !== undefined &&
			data?.[9].result !== undefined
		) {

			const depositInfoData = {
				totalTokenToDistribute: parseInt(data?.[4].result?.toString()),
				timeUntilStart: now - parseInt(data?.[0].result?.toString()),
				myTokenSupply: 0,
				tokenName: data?.[6].result?.toString(),
				tokenSymbol: data?.[7].result?.toString(),
				totalTokenSupply: parseInt(data?.[8].result?.toString()),
				mySupplyValue: parseInt(data?.[9].result?.toString()),
				mySupplyText: data?.[9].result?.toString()+" "+data?.[7].result?.toString(),
			};
			setDepositInfo(depositInfoData);
		}

	}, [data]);


	return (
		<>
		{ (props.launchpoolAddress && props.launchpoolAddress != "") ? (
			<TrasparentContainer className="" >
				<DefaultContainer className="">
					<div className="grid grid-cols-4 gap-2">
						<div className="col-span-3">
							<div className="grid grid-rows-5 gap-1">
								<div className="row-span-1">
									&nbsp;
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"timeToStartLabel"} value={"Time until Launchpool start"} className={" text-sm "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"timeToStartValue"} value={depositInfo.timeUntilStart.toString()} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"mySupplyLabel"} value={"My token supply"} className={" text-sm  "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"mySupplyValue"} value={depositInfo.mySupplyText} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									<div className="grid grid-cols-2 gap-1">
										<div className="col-span-1 text-right">
											<InfoLabel name={"totalSupplyLabel"} value={"Total token supply"} className={" text-sm  "} />
										</div>
										<div className="col-span-1 text-left">
											<InfoLabel name={"totalSupplyValue"} value={depositInfo.totalTokenSupply.toString()} className={" text-green-500 text-sm font-medium"} />
										</div>
									</div>
								</div>
								<div className="row-span-1">
									&nbsp;
								</div>


							</div>
						</div>
						<div className="col-span-1">
							<div className="grid grid-rows-3  text-center align-text-bottom">
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={"currently deposited"} className={" text-sm font-thin text-gray-500"} />
								</div>
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={depositInfo.totalTokenToDistribute.toString()} className={" text-5xl font-medium text-green-500"} />
								</div>
								<div className="row-span-1">
									<InfoLabel name={"currentDepositLabel"} value={depositInfo.tokenSymbol} className={" text-lg font-medium text-green-500"} />
								</div>
							</div>
						</div>
					</div>

				</DefaultContainer>
			</TrasparentContainer>
			) : ("")
		}
		</>
	);

}