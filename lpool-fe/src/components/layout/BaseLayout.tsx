"use client";

import "../../assets/styles/base-layout.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
const logger = require("pino")();

export function BaseLayout(props: any) {
	
	logger.info("le props sono",props.ipfsData);
	return (
		<>
			<Header />
			<Sidebar />
		</>
	);
}
