import InvestorMainContainer from "../../../../../components/InvestorMainContainer";
import { BaseLayout } from "../../../../../components/layout/BaseLayout";
import "../../../../../assets/styles/investor.css";

export default function Page({ params }: { params: { lpool_address: string; cid: string } }) {
    return (
        <>
            <BaseLayout />
            <InvestorMainContainer
                launchpoolAddress={params.lpool_address}
                cid={params.cid}
            />
        </>
    );
}
