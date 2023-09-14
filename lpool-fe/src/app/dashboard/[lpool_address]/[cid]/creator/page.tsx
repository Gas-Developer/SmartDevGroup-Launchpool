import { CreatorLPCreatedPage } from "../../../../../components/CreatorLPCreatedPage";

export default function Page({ params }: { params: { lpool_address: string, cid: string } }) {
	return (
		<>
			<CreatorLPCreatedPage launchpoolAddress={params.lpool_address} cid={params.cid}/>
		</>
	);
}
