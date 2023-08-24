"use client";

import classNames from "classnames";
import { defaultNavItems } from "./defaultNavItems";
import Link from "next/link";
// define a NavItem prop
export type NavItem = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

export function Sidebar() {
	return (
        <div id="sidebarContainer" className="w-1/12 float-left">
            <div
                id="sidebar"
                className="rounded-full bg-zinc-700 w-2/6 h-3/6 relative"
            >
                <nav className="flex flex-col justify-center items-center">
                    <span className="mt-10 font-extrabold font">TLR</span>
                    {/* nav items */}
                    <ul className="text-center sidebarGroup">
                        {defaultNavItems.map((item, index) => {
                            return (
                                <Link key={index} href={item.href}>
                                    <li className="sidebarItem">{item.icon}</li>
                                </Link>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
