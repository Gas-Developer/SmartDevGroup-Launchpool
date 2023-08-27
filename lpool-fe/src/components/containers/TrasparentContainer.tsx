import  {TrasparentContainerData}  from "../interfaces/TrasparentContainerData";

export default function TrasparentContainer({children, className } : TrasparentContainerData) {

	const clName = " p-3 z-20 hover:z-50 shadow-2xl bg-black/25 rounded-md ml-4 mr-4 "+className;

	return <div className={clName}> 
			{children}
		</div>;
}
