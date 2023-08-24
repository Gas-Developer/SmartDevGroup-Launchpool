"use client";

import classNames from "classnames";
import { Searchbar } from "../Searchbar";
import { MenuButton } from "../buttons/MenuButton";


// define a NavItem prop
export type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

export function Header() {
    return (
        <>
            <header className="w-full h-auto inline-flex p-2">
                <h1 id="headerTitle">The Launchpool Ready</h1>
                <Searchbar />
                <MenuButton />
            </header>
        </>
    );
}

