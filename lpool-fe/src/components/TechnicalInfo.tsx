"use client";

import { InfoLabel } from "./label/InfoLabel";
const logger = require("pino")();

export default function TechnicalInfo(props: any) {
    return (
        <>
            <InfoLabel
                name={"tokenomicsInvestor"}
                value={"Technical Info"}
                className={"col-span-2"}
            />
            <InfoLabel
                name={""}
                value={"Launchpool Creator Address"}
                className={undefined}
            />
            <InfoLabel
                name={""}
                value={"0x1234567890123456789012345678901234567890"}
                className={"break-words"}
            />
            <InfoLabel
                name={""}
                value={"Token Address"}
                className={undefined}
            />
            <InfoLabel name={""} value={"10000000"} className={undefined} />
        </>
    );
}
