import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "../assets/styles/tlr-datetimepicker.css";

export default function DateTimePicker(props: any) {

	return (
		<>
			<Datetime
				closeOnSelect={true}
				utc={false}
				inputProps={{
					placeholder: props.placeholder,
					className: props.calendarInputClass,
					size: props.calendarInputSize,
					style: { color: "white" },
				}}
				onChange={props.onChange}
			/>
		</>
	);
}
