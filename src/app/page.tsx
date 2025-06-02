import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography/TypographyH1";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getUserPath } from "./utils/path";

export default async function Home() {
	const user = await currentUser();
	const username = user?.publicMetadata?.username;

	return (
		<div className="p-6">
			<div className="space-y-4">
				<TypographyH1 center>Write freely. See your journey.</TypographyH1>
				<p className="text-sm text-center">
					Noteonは気軽にメモを残せる、自分専用のノートアプリです。
					<br />
					書き続けることで、あとから成長がちゃんと見えてきます。
				</p>

				{username ? (
					<div className="flex justify-center">
						<Button asChild>
							<Link href={getUserPath(user)}>はじめる</Link>
						</Button>
					</div>
				) : user ? (
					<div className="flex justify-center">
						<Button asChild>
							<Link href="/auth/init">はじめる</Link>
						</Button>
					</div>
				) : (
					<SignInButton mode="modal">
						<Button className="flex mx-auto">はじめる</Button>
					</SignInButton>
				)}

				<div className="max-w-sm bg-gray-100 w-full aspect-square mx-auto" />
			</div>
		</div>
	);
}
