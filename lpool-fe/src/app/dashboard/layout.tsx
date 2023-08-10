export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="mainContainer">
		{children}
	</div>;
}
