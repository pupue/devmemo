export default function ErrorMessage({
	children,
}: {
	children: React.ReactNode;
}) {
	return <p className="text-red-500 text-sm mt-1">{children}</p>;
}
