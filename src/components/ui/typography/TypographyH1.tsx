import { cn } from "@/libs/utils";

type Props = {
	children: React.ReactNode;
	center?: boolean;
};
export function TypographyH1({ children, center }: Props) {
	return (
		<h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", center && "text-center")}>
			{children}
		</h1>
	);
}
