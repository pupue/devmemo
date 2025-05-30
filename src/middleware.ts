import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/api/(.*)", "/sign-in", "/sign-up(.*)", "/auth/init(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	if (isPublicRoute(req)) return;

	const { userId } = await auth();

	if (!userId) {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	if (req.nextUrl.pathname === "/") {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-user?uuid=${userId}`);

		if (!res.ok) return NextResponse.redirect(new URL("/setup", req.url));

		const { username } = await res.json();
		return NextResponse.redirect(new URL(`/${username}`, req.url));
	}
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
