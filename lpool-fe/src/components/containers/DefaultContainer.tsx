
export default function DefaultContainer({children, className } : any) {

	const clName = " p-4 bg-black/50 rounded-md"+className;

	return <div className={clName}> 
			{children}
		</div>;
}
