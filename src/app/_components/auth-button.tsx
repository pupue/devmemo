"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButton() {
	const { user } = useUser();

	if (user) {
		return (
			<div className="flex justify-center">
				<Button asChild>
					<Link href="/auth/init">はじめる</Link>
				</Button>
			</div>
		);
	}

	return (
		<SignInButton mode="modal">
			<Button className="flex mx-auto">はじめる</Button>
		</SignInButton>
	);
}
