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
			<div className=" grid-rows-2 text-center">
				<div className="row-span-1 text-center">
					<ImageButton name="createLaunchpoolBTN" src={CreateYourLaunchpoolBTN} tooltip="Create Launchpool" onClick={openCreatorPage} className={"h-full w-full" } />
				</div>
				<div className="row-span-1">
					<InfoValue 
						name="createLaunchpoolInfo" 
						value="Are you ready to create your own launchpool, in a couple of clicks?" 
						className={"m-auto text-ellipsis text-slate-200 text-center text-base font-['Roboto']"} 
						size={70} 
					/>
				</div>
			</div>

		</>
	);
}
