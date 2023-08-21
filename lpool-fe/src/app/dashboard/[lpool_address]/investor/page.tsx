import { InvestorPage } from "../../../../components/InvestorPage";

export default function Page({ params }:
	{ params: { lpool_address: string } }) {

	return (
		<>
			<InvestorPage launchpoolAddress={params.lpool_address} />
		</>
	);
}
