"use client";

import { ImageButton } from "../../buttons/ImageButton";
import CreateYourLaunchpoolBTN from "../../../assets/images/CreateYourLaunchpoolBTN.png"
import { InfoValue } from "../../label/InfoValue";
// import { useRouter } from 'next/navigation';

import "../../../assets/styles/stats-list.css";



export default function CreateLaunchpool() {

	// const router = useRouter();

	function openCreatorPage() {
		const href = "/dashboard/creator";
		//router.push(href);					// Rimosso perchè molto lento al click

		window.open(href, '_self');
	}


	return (
		<>
			<ImageButton name="createLaunchpoolBTN" src={CreateYourLaunchpoolBTN} tooltip="Create Launchpool" onClick={openCreatorPage} className={"h-full w-full" } />
			<InfoValue 
				name="createLaunchpoolInfo" 
				value="Are you ready to create your own launchpool, in a couple of clicks?" 
				className={"m-auto"} 
				size={70} 
			/>
		</>
	);
}
