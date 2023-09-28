import { use, useEffect, useState } from "react";
import DefaultContainer from "./DefaultContainer";
import TrasparentContainer from "./TrasparentContainer";
import { useBalance, useToken } from "wagmi";
import { InfoLabel } from "../label/InfoLabel";
import { InfoValue } from "../label/InfoValue";
import Image from "next/image";
import { defaultNoImage, toDate } from "../constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function LPCardPreviewContainer(props: any) {
	const pathname = usePathname();
	const isCreatorPage = pathname.includes("creator") ? true : false;

	// SAFE DATA BINDING // TODO: Rialliniare i nomi delle props con quelli dell'interfaccia IPFSLaunchpoolData.tsx
	const iconURL = props.imageURL
		? props.imageURL
		: props.iconURL
		? props.iconURL
		: defaultNoImage;

	const startLP = toDate(
		(props.startLP
			? props.startLP
			: props.startLPValue
			? props.startLPValue
			: BigInt(0)
		).toString()
	);

	const endLP = toDate(
		(props.endLP
			? props.endLP
			: props.endLPValue
			? props.endLPValue
			: BigInt(0)
		).toString()
	);

	// USE TOKEN
	const tokenAddress = props.tokenAddress ? props.tokenAddress : "";
	const launchpoolAddress = props.launchpoolAddress
		? props.launchpoolAddress
		: "";
	const [enableTokenDataRead, setEnableTokenDataRead] = useState(false);

	// Legge le info dal token ERC20
	const { data, isError, isLoading } = useToken({
		address: tokenAddress,
		enabled: enableTokenDataRead,
		onSuccess(data) {
			setEnableTokenDataRead(false);
		},
	});

	useEffect(() => {
		// console.log("tokenAddress: ", tokenAddress);
		if (tokenAddress.length == 42 && tokenAddress.startsWith("0x"))
			setEnableTokenDataRead(true);
	}, [tokenAddress]);

	// USE BALANCE ERC-20
	// Legge il balance della launchpool del token ERC20
	const [depositValue, setDepositValue] = useState("0");
	const balance = useBalance({
		address: launchpoolAddress,
		token: tokenAddress,
		enabled: enableTokenDataRead,
		onSuccess(data) {
			// setEnableTokenDataRead(false);
			// console.log("balance: ", data);
			setDepositValue(data.formatted);
		},
	});

	// USE BALANCE MATIC
	// Legge il balance della launchpool dei Matic messi in staking
	const [stakedValue, setStakedValue] = useState("0");
	const maticBalance = useBalance({
		address: launchpoolAddress,
		enabled: enableTokenDataRead,
		onSuccess(data) {
			// console.log("Matic: ", data);
			setStakedValue(data.formatted);
		},
	});

	return (
        <>
            {tokenAddress.length == 42 && tokenAddress.startsWith("0x") ? (
                <TrasparentContainer className="h-full">
                    <DefaultContainer className="h-full">
                        <div className="grid grid-rows-6 grid-flow-col gap-1 text-center h-full">
                            {/* Token Name */}
                            <div className="row-span-1 m-auto">
                                {data?.name ? (
                                    isLoading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <h1>
                                            {data?.name} ({data?.symbol})
                                        </h1>
                                    )
                                ) : (
                                    ""
                                )}
                                <InfoLabel
                                    name={"tokenAddressLabel"}
                                    value={tokenAddress}
                                    className="font-['Roboto'] text-xs inline-block"
                                />
                            </div>

                            {/* Launchpool Image */}
                            <div className="row-span-2 ml-auto mr-auto">
                                <div className="h-full w-full">
                                    <Image
                                        className="h-full w-auto m-auto"
                                        loader={() => iconURL}
                                        src={iconURL}
                                        alt={
                                            data?.name
                                                ? data.name
                                                : "Launchpool Image"
                                        }
                                        width={50}
                                        height={50}
                                        unoptimized={true}
                                    />
                                </div>
                            </div>

                            {/* Launchpool Dates */}
                            <div className="row-span-1 text-center pl-10 pr-10 m-auto">
                                <div className="grid grid-cols-6 gap-1">
                                    <div className="col-span-1">
                                        <InfoLabel
                                            name={"startLPLabel"}
                                            value="From: "
                                            className="font-['Roboto'] text-xs text-slate-400 text-right inline-block"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <InfoLabel
                                            name={"startLPLabel"}
                                            value={startLP}
                                            className="font-['Roboto'] text-xs text-slate-200 text-left inline-block"
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <InfoLabel
                                            name={"endLPLabel"}
                                            value="To: "
                                            className="font-['Roboto'] text-xs text-slate-600 text-right inline-block"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <InfoLabel
                                            name={"endLPLabel"}
                                            value={endLP}
                                            className="font-['Roboto'] text-xs text-slate-200 text-left inline-block"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Token to Distribute */}
                            <div className="row-span-1 m-auto">
                                <div className="grid grid-rows-3 gap-1">
                                    {isCreatorPage ? (
                                        <>
                                            <div className="row-span-1 m-auto">
                                                <InfoLabel
                                                    name={
                                                        "tokenToDistributeValue"
                                                    }
                                                    value={
                                                        "To Distribute / Total Supply"
                                                    }
                                                    className="font-['Roboto'] text-xs text-slate-700 text-center inline-block align-middle"
                                                />
                                            </div>

                                            <div className="row-span-1 m-auto">
                                                <InfoLabel
                                                    name={"depositValue"}
                                                    value={depositValue}
                                                    className="font-['Roboto'] text-sm text-slate-500 text-center inline-block align-middle"
                                                />
                                                <InfoLabel
                                                    name={"symbolValue1"}
                                                    value={data?.symbol}
                                                    className="font-['Roboto'] text-xs text-slate-500 text-center inline-block align-middle"
                                                />
                                                <InfoLabel
                                                    name={"symbolValue1"}
                                                    value={" / "}
                                                    className="font-['Roboto'] text-xs text-slate-700 text-center inline-block align-middle"
                                                />
                                                <InfoLabel
                                                    name={"totalSupplyValue"}
                                                    value={
                                                        data?.totalSupply
                                                            .formatted
                                                    }
                                                    className="font-['Roboto'] text-sm text-slate-700 text-center inline-block align-middle"
                                                />
                                                <InfoLabel
                                                    name={"symbolValue2"}
                                                    value={data?.symbol}
                                                    className="font-['Roboto'] text-xs text-slate-700 text-center inline-block align-middle"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="row-span-1 m-auto inline">
                                                <InfoLabel
                                                    name={
                                                        "tokenToDistributeValue"
                                                    }
                                                    value={"Actual Staked"}
                                                    className="font-['Roboto'] text-xs text-slate-300 text-center align-middle"
                                                />
                                            </div>

                                            <div className="row-span-1 m-auto">
                                                <InfoLabel
                                                    name={"stakedValue"}
                                                    value={
                                                        stakedValue + " MATIC"
                                                    }
                                                    className="font-['Roboto'] text-sm text-green-500 text-center align-middle"
                                                />
                                         
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DefaultContainer>
                </TrasparentContainer>
            ) : (
                <></>
            )}
        </>
    );
}
