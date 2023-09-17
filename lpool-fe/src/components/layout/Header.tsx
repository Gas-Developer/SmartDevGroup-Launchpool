"use client";

import { MenuButton } from "../buttons/MenuButton";
import { WalletButton } from "../buttons/WalletButton";
import SearchBar from "../Searchbar";

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
                    <h1 id="headerTitle">The Launchpool Ready</h1>
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

