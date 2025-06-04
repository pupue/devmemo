"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import HeaderNavButton from "./header-nav-button";
import SearchForm from "./search-form";

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
					<DialogTitle>Search</DialogTitle>
					<DialogDescription>検索してみてね</DialogDescription>
				</DialogHeader>
				<SearchForm />
				<DialogFooter>
					<Button type="submit">検索</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
