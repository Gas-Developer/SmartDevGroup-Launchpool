"use client";

import { useEffect, useState, useRef } from "react";
import { FactoryContractConfig } from "../../abi/factory-abi";
import { useContractRead } from "wagmi";
import { LaunchpoolReference } from "../interfaces/LaunchpoolReference";
import { BaseLayout } from "../layout/BaseLayout";
import DashboardMainContainer from "./DashboardMainContainer";
import axios from "axios";
import { ipfs_base_URI } from "../constants";
import { IPFSLaunchpoolData } from "../interfaces/IPFSLaunchpoolData";
import { useGlobalContext } from "../../app/Context/store";
const logger = require("pino")();

export default function PageContainer() {

	const { data, isLoading, isSuccess } = useContractRead({
		...FactoryContractConfig,
		functionName: "getLaunchpools",
	});

	const [launchpoolsReference, setLaunchpoolsReference] = useState<LaunchpoolReference[]>([]);
	const [ipfsData, setIpfsData] = useState<IPFSLaunchpoolData[]>([]);
	let filled = useRef(false);
	const {
        allLaunchpoolReferenceGContext,
        setAllLaunchpoolReferenceGContext,
        ipfsDataGContext,
        setIpfsDataGContext,
    } = useGlobalContext();

	useEffect(() => {
		if (isSuccess && !isLoading && data !== undefined && !filled.current) {
			setLaunchpoolsReference([...data]);
			filled.current = true;
		}
	}, [data]);

	useEffect(() => {
		if (launchpoolsReference.length > 0) {

			const ipfsPromises: any[] = [];
			launchpoolsReference.forEach((launchpool: LaunchpoolReference) => {

				logger.info("Launchpool reference", launchpool);

				const storageURI = launchpool.storageURI;
				const launchpoolAddress = launchpool.launchpoolAddress;
				if (storageURI && storageURI !== "") {
					const ipfsURI = ipfs_base_URI + storageURI;
					ipfsPromises.push(
						axios
							.get(ipfsURI, { headers: { Accept: "text/plain" } })
							.then((res) => {
								if (res !== undefined) {

									const launchpoolData: IPFSLaunchpoolData = {
                                        ...res.data,
                                        lpAddress: launchpoolAddress,
                                        cid: storageURI,
                                    };
									return launchpoolData;
								}
							})
					);
				}
			});

			Promise.all(ipfsPromises)
				.then((ipfsResults) => {
					const filteredResults = ipfsResults.filter(
						(result) => result !== null && result !== undefined
					);

					setIpfsData([...filteredResults]);
					setIpfsDataGContext([...filteredResults]);

				})
				.catch((error) => {
					logger.error(error)
				});
		}
	}, [launchpoolsReference]);

	return (
		<>
			<BaseLayout
				ipfsData={ipfsData}
				launchpoolsReference={launchpoolsReference}
			/>
			<DashboardMainContainer
				ipfsData={ipfsData}
				launchpoolsReference={launchpoolsReference}
			/>
		</>
	);
}
