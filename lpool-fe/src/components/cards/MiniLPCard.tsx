"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import TrasparentContainer from "../containers/TrasparentContainer";
import DefaultContainer from "../containers/DefaultContainer";
import { defaultNoImage } from "../constants";
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
		<>
			<div className="miniLPCard  bg-zinc-700 bg-opacity-25 rounded-lg text-xs text-slate-500 text-center" onClick={() => toLaunchpoolPage()}>
				{(miniLPCardInfo.name ? miniLPCardInfo.name : " - - - ")}
				<div className="miniLPCardImgContainer bg-zinc-500">
				{ 
					<Image
						loader={() => (miniLPCardInfo.iconURL ? miniLPCardInfo.iconURL : defaultNoImage)}
						src={miniLPCardInfo.iconURL ? miniLPCardInfo.iconURL : defaultNoImage}
						alt={miniLPCardInfo.name ? miniLPCardInfo.name : ""}
						width={50}
						height={50}
						layout="responsive"
						unoptimized={true}
					/>
				}
				</div>
			</div>
		</>
	);
}
