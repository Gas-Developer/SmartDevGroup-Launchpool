"use client";

import classNames from "classnames";
import { defaultNavItems } from "./defaultNavItems";
import Link from "next/link";
import { SetStateAction, useState } from "react";
// define a NavItem prop
export type NavItem = {
	id: number;
	label: string;
	href: string;
	icon: React.ReactNode;
};

export function Sidebar() {

	const [hoveredItem, setHoveredItem] = useState<number | null>(null);

	 const handleMouseEnter = (itemId: number ) => {
	setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
	setHoveredItem(null);
  };

	return (
		<div id="sidebarContainer" className="w-1/12 float-left">
			<div id="sidebar" className="rounded-full bg-zinc-700 w-2/6 h-3/6 relative">
				<nav className="flex flex-col justify-center items-center">
					<span className="mt-10 font-extrabold font">TLR</span>
					<hr className="sidebarHr" />
					{/* nav items */}
					<ul className="text-center sidebarGroup">
						{defaultNavItems.map((item, index) => {
							return (
								<Link
									key={item.id}
									href={item.href}
									onMouseEnter={() =>
										handleMouseEnter(item.id)
									}
									onMouseLeave={handleMouseLeave}
								>
									<li className="sidebarItem">
										{item.icon}
										{hoveredItem === item.id && (
											<span className="text-yellow-500 absolute sidebarIconLabel">
												{item.label}
											</span>
										)}
									</li>
								</Link>
							);
						})}
					</ul>
				</nav>
			</div>
		</div>
	);
}
