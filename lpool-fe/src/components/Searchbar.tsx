"use client";

import Link from "next/link";
import { useState } from "react";

export default function Searchbar() {
	const [query, setQuery] = useState("");


	return (
		<div id="searchbarContainer" className="text-center">
			<form id="searchbarForm">
				<input
					className="text-black border-2 border-black rounded-full px-3 py-2"
					type="text"
					placeholder="Search launchpool..."
				/>
				<button
					className="bg-zinc-700 text-white rounded-full px-3 py-2 hover:bg-black/60"
					type="submit"
				>
					Search
				</button>
			</form>
		</div>
	);
}
