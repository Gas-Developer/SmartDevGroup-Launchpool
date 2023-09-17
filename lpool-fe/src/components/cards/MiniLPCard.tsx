"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
const logger = require("pino")();

export default function MiniLPCard(props: any) {
	const router = useRouter();

	const miniLPCardInfo = props;

	function toLaunchpoolPage() {
		const href =
			"/dashboard/" + miniLPCardInfo.launchpoolAddress + "/" + miniLPCardInfo.cid + "/investor";
		router.push(href);
	}

	return (
		<div className="miniLPCard bg-zinc-700 rounded-lg" onClick={() => toLaunchpoolPage()}>
			<h1>{miniLPCardInfo.name}</h1>
			<div className="miniLPCardImgContainer bg-zinc-500">
				<Image
					loader={() => miniLPCardInfo.iconURL}
					src={miniLPCardInfo.iconURL !== undefined ? miniLPCardInfo.iconURL : ""}
					alt={miniLPCardInfo.name !== undefined ? miniLPCardInfo.name : ""}
					width={50}
					height={50}
					layout="responsive"
				/>
			</div>
		</div>
	);
}