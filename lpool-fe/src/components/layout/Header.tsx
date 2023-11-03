"use client";

import { MenuButton } from "../buttons/MenuButton";
import { WalletButton } from "../buttons/WalletButton";
import SearchBar from "../Searchbar";
import Image from "next/image";
import TLRTitle from "../../assets/images/TheLaunchpoolReady_2.png";

// define a NavItem prop
export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export function Header() {
    return (
        <>
            <header className="grid grid-cols-8 p-2">
                <div className="col-span-4">
                    {/* <h1 id="headerTitle">The Launchpool Ready</h1> */}
                    <Image
                        className="ml-28"
                        src={TLRTitle}
                        alt={"TLRTitleDashboard"}
                        width={500}
                        height={500}
                    />
                </div>
                <div className="col-span-3 m-auto">
                    <SearchBar />
                </div>
                <div className="mt-auto mb-auto">
                    <WalletButton />
                    <MenuButton />
                </div>
            </header>
        </>
    );
}

