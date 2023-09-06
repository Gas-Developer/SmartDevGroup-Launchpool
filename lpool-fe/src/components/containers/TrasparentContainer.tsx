import  {TrasparentContainerData}  from "../interfaces/TrasparentContainerData";

export default function TrasparentContainer({children, className } : TrasparentContainerData) {

	const clName = className+" p-3 bg-black/25 rounded-md ml-4 mr-4 ";

	return <div className={clName}> 
			{children}
		</div>;
}
