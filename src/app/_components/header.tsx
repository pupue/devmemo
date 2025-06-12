import { SignedIn } from "@clerk/nextjs";
import Logo from "./logo";
import SearchButton from "./search-button";
import UserButton from "./user-button";

export default async function Header() {
	return (
		<header className="flex justify-between items-center p-6 px-10 gap-4 border-b border-key">
			<Logo />
			<div className="fixed z-10 top-6 right-10 flex gap-2">
				<SearchButton />
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</header>
	);
}
