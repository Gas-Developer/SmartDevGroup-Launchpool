export default function TLRModal({ isVisible, onClose, className, children }: any) {
	
	if (!isVisible) return null;

	const handleClose = (e:any) => {
		if (e.target.id === "wrapper") {
			onClose();
		}
	 };

	return (
		<div className={className} id="wrapper" onClick={handleClose}>
			<div className=" w-auto h-auto flex flex-col">
				<button
					className=" text-green-300 text-xl place-self-end"
					onClick={() => onClose()}
				>
					X
				</button>
				<div className="bg-zinc-700 p-2 rounded-lg">{children}</div>
			</div>
		</div>
	);
}
