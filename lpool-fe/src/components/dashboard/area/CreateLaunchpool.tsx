"use client";

import { ImageButton } from "../../buttons/ImageButton";
import CreateYourLaunchpoolBTN from "../../../assets/images/CreateYourLaunchpoolBTN_1.png"
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
            <ImageButton
                name="createLaunchpoolBTN"
                src={CreateYourLaunchpoolBTN}
                tooltip="Create Launchpool"
                onClick={openCreatorPage}
                width={1000}
                height={1000}
                className={"m-auto"}
            />
        </>
    );
}
