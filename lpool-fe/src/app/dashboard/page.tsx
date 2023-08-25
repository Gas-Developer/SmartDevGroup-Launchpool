import DashboardMainContainer from "../../components/DashboardMainContainer";
import { BaseLayout } from "../../components/layout/BaseLayout";
import "../../assets/styles/dashboard.css";

export default function Page() {
    return (
        <>
            <BaseLayout />
            <DashboardMainContainer />
        </>
    );
}
