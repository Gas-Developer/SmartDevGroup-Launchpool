"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import Dropdown from "../layout/DropdownMenu";
import { useState } from "react";

export interface MenuItem {
	title: string;
	route?: string;
	reference: string;

}

const menuItems: MenuItem[] = [
    {
        title: "My launchpools",
        route: "/dashboard/my-profile/",
        reference: "myLaunchpool",
    },
    {
        title: "Current Staked",
        route: "/dashboard/my-profile/",
        reference: "staked",
    },
    {
        title: "Ready to Claim",
        route: "/dashboard/my-profile/",
        reference: "toClaim",
    },
];

export function MenuButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<button
				id="menuButton"
				className="rounded-full bg-zinc-700 w-1/5"
				onClick={toggleDropdown}
			>
				<Bars3Icon className="inline w-9/12" />
			</button>
			{isOpen ? (
				<Dropdown
					id={"dropdownMenu"}
					items={menuItems}
					className={
						"bg-zinc-700 absolute grid text-right p-3 rounded-lg text-xl"
					}
				/>
			) : null}
		</>
	);
}
