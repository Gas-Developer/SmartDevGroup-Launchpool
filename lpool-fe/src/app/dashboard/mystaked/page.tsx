import { Connect } from "../../../components/Connect";
import { Connected } from "../../../components/Connected";
import { BaseLayout } from "../../../components/layout/BaseLayout";
import MyStakedContainer from "../../../components/containers/MyStakedContainer";

export default function Page({ params }: { params: { type: string } }) {

    return (
        <>
            <BaseLayout />
			{/* <Connect /> */}
			{/* Test */}
			<MyStakedContainer />
			<Connected>
			</Connected>
        </>
    );
}
