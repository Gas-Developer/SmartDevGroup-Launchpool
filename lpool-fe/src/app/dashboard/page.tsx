import DashboardMainContainer from "../../components/containers/DashboardMainContainer";
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
