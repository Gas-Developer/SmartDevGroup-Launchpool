"use client";

import {
    Bars3Icon
} from "@heroicons/react/24/outline";


export function MenuButton() {
    return (
        <>
            <button id="menuButton" className="rounded-full bg-zinc-700 w-11">
                <Bars3Icon className="w-4/6 inline" />
            </button>
        </>
    );
}
