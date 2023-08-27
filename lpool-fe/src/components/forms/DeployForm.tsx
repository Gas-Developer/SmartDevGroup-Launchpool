import { SetStateAction, useState } from "react";
import { defaultTF } from "../costants";
import { Textfield } from "../input/Textfield";
import { Info } from "../label/Info";
import { InfoLabel } from "../label/InfoLabel";
import { InfoValue } from "../label/InfoValue";
import DateTimePicker from "../dateTimePicker";
import { Textarea } from "../input/Textarea";
import { Checkbox } from "../input/Checkbox";



export function DeployForm() {

	const [description, setDescription] = useState("Write the Launchpool / Token description here");
	const [tokenAddress, setTokenAdrress] = useState("0x...");
	const [imageURL, setImageURL] = useState("https://...");
	const [webURL, setWebURL] = useState("https://...");
	const [startLPValue, setStartLPValue] = useState(0);
	const [endLPValue, setEndLPValue] = useState(0);
	const [checked, setChecked] = useState(false);
	

	const tfStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0";
	const labelStyle = " font-['Roboto'] text-xs text-slate-200";
	const dateTimePickerStyle = " bg-slate-800 rounded-md pl-2 pt-1.5 pb-1 pr-2 font-['Roboto'] text-slate-200 text-xs shadow border-0";

	const handleOnChange = () => {
		setChecked(!checked);
		console.log("checked: "+checked);
	  };

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
						value={description} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
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
						value={tokenAddress} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTokenAdrress(e.target.value)}
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
						setStartLPValue={setStartLPValue}
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
						setEndLPValue={setEndLPValue}
						calendarInputSize={20}
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
						value={imageURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setImageURL(e.target.value)}
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
						value={webURL} 
						onChange={(e: { target: { value: SetStateAction<string>; }; }) => setWebURL(e.target.value)}
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
						checked={checked}
					/>
				</div>
				<div className="col-span-8">
					
				</div>

			</div>

			
		</>
	);

}