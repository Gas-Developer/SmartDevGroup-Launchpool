"use client";

import { useRouter } from "next/navigation";

export function LaunchAppButton() {

	const router = useRouter();

	return (
		<>
			<button onClick={() => {router.push("/dashboard");}} type="button" id="homepageButton">Launch App</button>
		</>
	);
}
