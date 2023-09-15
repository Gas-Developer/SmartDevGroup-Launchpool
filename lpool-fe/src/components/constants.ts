import { ControlButtonData } from "./interfaces/ControlButtonData";

export const ipfs_base_URI = process.env.NEXT_PUBLIC_PINATA_GATEWAY;
export const PINATA_APIKEY = process.env.NEXT_PUBLIC_PINATA_APIKEY;
export const PINATA_SECRET = process.env.NEXT_PUBLIC_PINATA_SECRET;
export const PINATA_PIN_JSON_TO_IPFS = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
export const defaultNoImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";

export const defaultTF = {
	id: "",
	name: "",
	className: "controls-textfield",
	placeholder: "",
	value: "",
	onChange: undefined,
	disabled: false,
	required: undefined,
	minLength: undefined,
	maxLength: undefined,
	size: 40,
	pattern: undefined,
	readOnly: false,
};

export const tfStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0 placeholder-gray-500";
export const labelStyle = " font-['Roboto'] text-xs text-slate-200";
export const dateTimePickerStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0";

	// CONNECT WALLET BUTTON
export let connect_wallet: ControlButtonData = {
		name: "connect_wallet",
		text: "Connect Wallet",
		tooltip: "Connect Wallet",
		onClick: {},
		disabled: false,
		className: "",
		iconURL: ""
	};

export const disconnect_wallet: ControlButtonData = {
		name: "disconnect_wallet",
		text: "Disconnect Wallet",
		tooltip: "Disconnect Wallet",
		onClick: {},
		disabled: false,
		className: "",
		iconURL: ""
	};
