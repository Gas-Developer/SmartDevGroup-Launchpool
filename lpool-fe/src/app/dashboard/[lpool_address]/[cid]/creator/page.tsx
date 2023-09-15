import { CreatorLPCreatedPage } from "../../../../../components/CreatorLPCreatedPage";
import { BaseLayout } from "../../../../../components/layout/BaseLayout";

export default function Page({ params }: { params: { lpool_address: string, cid: string } }) {
	return (
		<>
			<BaseLayout />
			<CreatorLPCreatedPage launchpoolAddress={params.lpool_address} cid={params.cid}/>
		</>
	);
}
