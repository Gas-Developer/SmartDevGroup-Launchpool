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
const logger = require("pino")();

export default function PageContainer() {
    const { data, isLoading, isSuccess } = useContractRead({
        ...FactoryContractConfig,
        functionName: "getLaunchpools",
    });

    const allLaunchpoolReferecence: LaunchpoolReference[] = [];

    const [launchpoolsReference, setLaunchpoolsReference] = useState<
        LaunchpoolReference[]
    >([]);

	const [ipfsData, setIpfsData] = useState<IPFSLaunchpoolData[]>([]);
	

	let filled = useRef(false);

    useEffect(() => {
        if (isSuccess && !isLoading && data !== undefined && !filled.current) {
			setLaunchpoolsReference([...data]);
			filled.current = true;
        }
    }, [data]);

    let count = 0;

    // useEffect(() => {
    //     launchpoolsReference.forEach((launchpool: LaunchpoolReference) => {
    //         const storageURI = launchpool.storageURI;
    //         if (storageURI && storageURI !== "") {
    // 			const ipfsURI = ipfs_base_URI + storageURI;
    // 			logger.info("sto facendo una chiamata a ", ipfsURI);
    // 			count++;
    // 			logger.info(count)
    //             axios
    //                 .get(ipfsURI, { headers: { Accept: "text/plain" } })
    //                 .then((res) => {
    //                     if (res !== undefined) {
    //                         setIpfsData((prevData) => [
    //                             ...prevData,
    //                             { ...res.data },
    //                         ]);
    //                     }
    //                 });
    //         }
    //     });
    // }, [launchpoolsReference]);

    useEffect(() => {
        // Verifica se ci sono launchpoolsReference validi e non vuoti
        if (launchpoolsReference.length > 0) {
            // Crea un array temporaneo per memorizzare le promesse delle chiamate IPFS
            const ipfsPromises: any[] = [];

            // Itera su launchpoolsReference per effettuare le chiamate IPFS
            launchpoolsReference.forEach((launchpool: LaunchpoolReference) => {
                const storageURI = launchpool.storageURI;
                if (storageURI && storageURI !== "") {
                    const ipfsURI = ipfs_base_URI + storageURI;
                    logger.info("sto facendo una chiamata a ", ipfsURI);
                    logger.info(count++);
                    ipfsPromises.push(
                        axios
                            .get(ipfsURI, { headers: { Accept: "text/plain" } })
                            .then((res) => {
                                if (res !== undefined) {
                                    return { ...res.data };
                                }
                            })
                    );
                }
            });

            // Usa Promise.all per attendere che tutte le chiamate IPFS siano complete
            Promise.all(ipfsPromises)
                .then((ipfsResults) => {
                    // Filtra eventuali risultati nulli o undefined
                    const filteredResults = ipfsResults.filter(
                        (result) => result !== null && result !== undefined
                    );

                    // Aggiorna ipfsData una sola volta con tutti i risultati validi
                    setIpfsData([...filteredResults]);
                })
                .catch((error) => {
                    // Gestisci gli errori se necessario
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
