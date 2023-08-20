"use client";

import ExagonalBTNInvestor from "../../assets/images/ExagonalBTNInvestor.png";
import ExagonalBTNCreator from "../../assets/images/ExagonalBTNCreator.png";
import Image from 'next/image'

export function UserTypeButton(props: any) {

	const name = props.name;

	const marginRight = name === "Investor" ? "margin-right" : "";
	let href = name === "Investor" ? "/dashboard/investor" : "/dashboard/creator";
	let image = name === "Investor" ? ExagonalBTNInvestor : ExagonalBTNCreator;

	return (
		<>
			<a href={href}>
				<Image
					src={image}
					alt="Area Button"
					width={450}
					height={400}
				/>
			</a>
		</>

	);
}
