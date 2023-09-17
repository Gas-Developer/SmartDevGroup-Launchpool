import ProfileContainer from "../../../../components/ProfileContainer";
import { BaseLayout } from "../../../../components/layout/BaseLayout";

export default function Page({ params }: { params: { type: string } }) {
    return (
        <>
            <BaseLayout />
            <ProfileContainer type={params.type} />
        </>
    );
}
