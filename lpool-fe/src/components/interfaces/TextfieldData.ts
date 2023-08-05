// TextfieldData.ts

export interface TextfieldData {
	id: string;
	name: string;
	value: string | undefined;
	placeholder: string | undefined;
	onChange: any | undefined;
	disabled: boolean | undefined;
	required: boolean | undefined;
	className: string | undefined;
	minLength: number | undefined;
	maxLength: number | undefined;
	size: number | undefined;
	pattern: string | undefined;
	readonly: boolean | undefined;
}