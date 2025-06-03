import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export default function Container({ children }: Props) {
	return <div className="max-w-5xl p-10 mx-auto">{children}</div>;
}
