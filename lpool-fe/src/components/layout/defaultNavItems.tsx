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
        label: "Dashboard",
        href: "/",
        icon: <HomeIcon className="sidebarIcon" />,
    },
    {
        label: "Stats",
        href: "/",
        icon: <ChartBarIcon className="sidebarIcon" />,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: <Cog8ToothIcon className="sidebarIcon" />,
    },
    {
        label: "Wallet",
        href: "/wallet",
        icon: <WalletIcon className="sidebarIcon" />,
    }
];
