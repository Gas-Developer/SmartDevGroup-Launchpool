// TextareaData.ts

import { TextfieldData } from "./TextfieldData";

export interface TextareaData extends TextfieldData {
	rows: number | undefined;
}