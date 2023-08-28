import { SetStateAction, useState } from "react";
import { defaultTF } from "../costants";
import { Textfield } from "../input/Textfield";
import { Info } from "../label/Info";
import { InfoLabel } from "../label/InfoLabel";
import { InfoValue } from "../label/InfoValue";
import DateTimePicker from "../dateTimePicker";
import { Textarea } from "../input/Textarea";
import { Checkbox } from "../input/Checkbox";
import { ImageButton } from "../buttons/ImageButton";
import deployLaunchpoolBTN from "../../assets/images/DeployLaunchpoolBTN.png";


export function DeployForm() {

	const [formData, setFormData] = useState({
		description: "Write the Launchpool / Token description here",
		tokenAddress: "0x...",
		imageURL: "https://...",
		webURL: "https://...",
		startLPValue: BigInt(0),
		endLPValue: BigInt(0),
		checked: false
	});

	const tfStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0";
	const labelStyle = " font-['Roboto'] text-xs text-slate-200";
	const dateTimePickerStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0";

	const handleOnChange = () => {
		setFormData( {...formData, checked: !formData.checked} );
	};

	function deployLaunchpool() {
		console.log("Deploying Launchpool...");
	}

	return (
		<>
			<div className="grid grid-cols-10 gap-4">
				{/* ROW 1 */}
				<div className="col-span-10 ">
					<Textarea 
						{...defaultTF}
						id="description" 
						name="description" 
						placeholder="Write the Launchpool / Token description here"
						value={formData.description} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, description: e.target.value.toString()} )}
						className={tfStyle}
						rows={5}

					/>
				</div>
				
				{/* ROW 2 */}
				<div className="col-span-1">
					<InfoLabel name={"TokenLabel"} value={"Token*"} className={labelStyle} />
				</div>
				<div className="col-span-9">
					<Textfield 
						{...defaultTF}
						id="tokenAddress" 
						name="tokenAddress" 
						placeholder="0x..."
						value={formData.tokenAddress} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, tokenAddress: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>

				{/* ROW 3 */}
				<div className="col-span-1">
					<InfoLabel name={"fromLabel"} value={"from*"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<DateTimePicker 
						id="startLP"
						placeholder="--"
						//calendarInputClass="form-control controls-textfield"
						calendarInputClass={dateTimePickerStyle}
						calendarInputSize={20}
					/>
				</div>
				<div className="col-span-1">
					<InfoLabel name={"toLabel"} value={"to*"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<DateTimePicker 
						id="endLP"
						placeholder="--"
						//calendarInputClass="form-control controls-textfield"
						calendarInputClass={dateTimePickerStyle}
						calendarInputSize={20}
						onChange={
							(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, endLPValue: BigInt(e.valueOf().toString())} )
						}
					/>
				</div>
				<div className="col-span-2 text-xs text-end">
					<InfoLabel name={"toLabel"} value={"duration"} className={labelStyle} />
					<InfoLabel name={"toLabel"} value={"12 days"} className={labelStyle} />
				</div>

				{/* ROW 4 */}
				<div className="col-span-1">
					<InfoLabel name={"imageURLLabel"} value={"Image"} className={labelStyle} />
				</div>
				<div className={"col-span-3 "}>
					<Textfield 
						{...defaultTF}
						id="imageURL" 
						name="imageURL" 
						placeholder="0x..."
						value={formData.imageURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, imageURL: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>
				<div className="col-span-1">
					<InfoLabel name={"webURLLabel"} value={"Web site"} className={labelStyle} />
				</div>
				<div className={"col-span-5"}>
					<Textfield 
						{...defaultTF}
						id="webURL" 
						name="webURL" 
						placeholder="0x..."
						value={formData.webURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setFormData( {...formData, webURL: e.target.value.toString()} )}
						className={tfStyle}
					/>
				</div>

				{/* ROW 5 */}
				<div className="col-span-1">
					<InfoLabel name={"Featured"} value={"Featured"} className={labelStyle} />
				</div>
				<div className={"col-span-1"}>
					<Checkbox 
						{...defaultTF}
						id="featured" 
						name="featured" 
						placeholder={undefined}
						value={undefined} 
						onChange={handleOnChange}
						className={" "}
						checked={formData.checked}
					/>
				</div>
				<div className="col-span-8">
					
				</div>
				<div className="col-span-9 text-center">
					<ImageButton 
						name="deployLaunchpoolBTN" src={deployLaunchpoolBTN} tooltip="Deploy Launchpool" onClick={deployLaunchpool} 
						width={200} height={50} className=" "
					/>
				</div>
			</div>
		</>
	);

}