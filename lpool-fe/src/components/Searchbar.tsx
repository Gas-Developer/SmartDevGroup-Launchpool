"use client";

import { useState } from "react";

export default function Searchbar() {
	const [query, setQuery] = useState("");


	return (
		<>
			<form >
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
		</>
	);
}
