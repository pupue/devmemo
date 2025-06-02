import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function Container({ children }: Props) {
	return <div className="max-w-5xl py-10 px-5 mx-auto">{children}</div>;
}
