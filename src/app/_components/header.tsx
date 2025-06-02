import { SignedIn } from "@clerk/nextjs";
import Logo from "./logo";
import UserButton from "./user-button";

export default async function Header() {
	return (
		<header className="flex justify-between items-center p-6 px-10 gap-4">
			<Logo />
			<SignedIn>
				<UserButton />
			</SignedIn>
		</header>
	);
}
