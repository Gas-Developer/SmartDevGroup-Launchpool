"use client";

import { useRouter } from "next/navigation";

export function LaunchAppButton() {

	const router = useRouter();

	return (
		<>
			<button onClick={() => {router.push("/dashboard");}} type="button">Launch App</button>
		</>
	);
}
