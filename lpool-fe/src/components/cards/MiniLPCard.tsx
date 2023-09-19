"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import TrasparentContainer from "../containers/TrasparentContainer";
import DefaultContainer from "../containers/DefaultContainer";
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
			{/* <TrasparentContainer className="" >
				<DefaultContainer className=""> */}
					<div className="miniLPCard bg-zinc-700 rounded-lg" onClick={() => toLaunchpoolPage()}>
						<h1>{miniLPCardInfo.name}</h1>
						<div className="miniLPCardImgContainer bg-zinc-500">
						{ (miniLPCardInfo.iconURL != undefined && miniLPCardInfo.iconURL != "") ? (
							<Image
								loader={() => miniLPCardInfo.iconURL}
								src={miniLPCardInfo.iconURL}
								alt={miniLPCardInfo.name ? miniLPCardInfo.name : ""}
								width={50}
								height={50}
								layout="responsive"
							/>
							) : ("")
						}
						</div>

					</div>
				{/* </DefaultContainer>
			</TrasparentContainer> */}

		</>
	);
}
