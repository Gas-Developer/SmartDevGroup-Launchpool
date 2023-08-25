import React from "react";
import {
	HomeIcon,
	ChartBarIcon,
	Cog8ToothIcon,
	WalletIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
	{
		id: 0,
		label: "Dashboard",
		href: "/",
		icon: <HomeIcon className="sidebarIcon" />,
	},
	{
		id: 1,
		label: "Stats",
		href: "/",
		icon: <ChartBarIcon className="sidebarIcon" />,
	},
	{
		id: 2,
		label: "Settings",
		href: "/settings",
		icon: <Cog8ToothIcon className="sidebarIcon" />,
	},
	{
		id: 3,
		label: "Wallet",
		href: "/wallet",
		icon: <WalletIcon className="sidebarIcon" />,
	},
];
