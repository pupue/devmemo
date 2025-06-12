"use client";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type Props<C extends ElementType = "button"> = {
	as?: C;
	children?: React.ReactNode;
} & ComponentPropsWithoutRef<C>;

export default function HeaderNavButton<C extends ElementType = "button">({ as, children, ...props }: Props<C>) {
	const Component = as || "button";
	return (
		<Component {...props} className="bg-white flex items-center justify-center w-10 aspect-square hover:bg-[#f97930]">
			{children}
		</Component>
	);
}
