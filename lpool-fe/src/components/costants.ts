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

