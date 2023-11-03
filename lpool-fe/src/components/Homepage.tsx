"use client";

import { LaunchAppButton } from "./homepage/buttons/LaunchAppButton";
import "../assets/styles/homepage.css";
import TLRTitle from "../assets/images/TheLaunchpoolReady_1.png";
import Image from "next/image";


export default function Homepage() {

	return (
        <>
            <section>
                <Image
                    src={TLRTitle}
                    alt={"TLRTitleHomepage"}
                    width={800}
                    height={800}
                />
                <LaunchAppButton />
            </section>
        </>
    );
}
