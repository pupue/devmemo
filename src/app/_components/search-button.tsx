"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import HeaderNavButton from "./header-nav-button";

export default function SearchButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<HeaderNavButton>
					<Search color="black" size={18} />
				</HeaderNavButton>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you&apos;re done.</DialogDescription>
				</DialogHeader>
				<div>本文</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
