"use client";

import "../../assets/styles/base-layout.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function BaseLayout() {
	return (
		<>
			<Header />
			<Sidebar />
		</>
	);
}
