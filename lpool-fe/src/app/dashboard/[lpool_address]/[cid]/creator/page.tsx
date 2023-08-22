import { CreatorPage } from "../../../../../components/CreatorPage";

export default function Page({ params }: { params: { lpool_address: string, cid: string } }) {
	return (
		<>
			<CreatorPage launchpoolAddress={params.lpool_address} cid={params.cid}/>
		</>
	);
}
