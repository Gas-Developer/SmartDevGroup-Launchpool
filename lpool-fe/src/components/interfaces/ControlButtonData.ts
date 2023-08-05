// ControlButtonData.ts

export interface ControlButtonData {
	name: string;
	text: string | undefined;
	tooltip: string | undefined;
	onClick: any | undefined;
	disabled: boolean | undefined;
	className: string | undefined;
	iconURL: string | undefined;
}