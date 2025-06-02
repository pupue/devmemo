import type { User } from "@clerk/nextjs/server";

export function getUserPath(user: User | null | undefined): string {
	return user ? `/${user.publicMetadata.username}` : "/";
}
