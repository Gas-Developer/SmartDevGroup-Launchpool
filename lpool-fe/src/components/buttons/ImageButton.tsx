
"use client";

import Image from 'next/image'

const logger = require("pino")();

/*
* This is a Image button that will be used in the AreaControls component.
*
* default prosps:
* - name: string default: ""
* - src: string default: ""
* - tooltip: string default: ""
* - onClick: function ( it will be passed in from the AreaControls component) default: () => {}
* - disabled: boolean default: false
* - className: string default: ""
* - width: number default: 450
* - height: number default: 400
*/


export function ImageButton(props: any) {

	const name = props.name || "";
	const src = props.src || "";
	const tooltip = props.tooltip || "";
	const onClick = props.onClick || (() => {logger.info("You clicked [image] button!");});
	const disabled = props.disabled ? props.disabled : false;
	let className = props.className || "";
	const width = props.width || 350;
	const height = props.height || 350;

	const buttonClassName = "transparent-button h-full";
	return (
        <>
            <div id={name} className={className} onClick={onClick}>
                <button
                    type="submit"
                    disabled={disabled}
                    className={buttonClassName}
                >
                    <Image
                        className="h-full w-auto"
                        src={src}
                        alt={tooltip}
                        width={width}
                        height={height}
                    />
                </button>
            </div>
        </>
    );

}


