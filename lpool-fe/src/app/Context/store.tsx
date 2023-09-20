"use client";

import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react";
import { LaunchpoolReference } from "../../components/interfaces/LaunchpoolReference";
import { IPFSLaunchpoolData } from "../../components/interfaces/IPFSLaunchpoolData";


interface ContextProps {
    allLaunchpoolReferenceGContext: LaunchpoolReference[];
    setAllLaunchpoolReferenceGContext: Dispatch<
        SetStateAction<LaunchpoolReference[]>
    >;
    ipfsDataGContext: IPFSLaunchpoolData[];
    setIpfsDataGContext: Dispatch<SetStateAction<IPFSLaunchpoolData[]>>;
}

const GlobalContext = createContext<ContextProps>({
    allLaunchpoolReferenceGContext: [],
    setAllLaunchpoolReferenceGContext: (): LaunchpoolReference[] => [],
    ipfsDataGContext: [],
    setIpfsDataGContext: (): IPFSLaunchpoolData[] => [],
});

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [allLaunchpoolReferenceGContext, setAllLaunchpoolReferenceGContext] = useState<[] | LaunchpoolReference[]>([]);
    const [ipfsDataGContext, setIpfsDataGContext] = useState<[] | IPFSLaunchpoolData[]>([]);

    return (
        <GlobalContext.Provider
            value={{
                allLaunchpoolReferenceGContext,
                setAllLaunchpoolReferenceGContext,
                ipfsDataGContext,
                setIpfsDataGContext,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);