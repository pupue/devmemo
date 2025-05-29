import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in", "/sign-up(.*)", "/auth/init(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const path = req.nextUrl.pathname;
	if (isPublicRoute(req)) return;

	const { userId } = await auth();

	// 未ログイン → /login にリダイレクト
	if (!userId) {
		return NextResponse.redirect(new URL("/sign-in", req.url));
	}

	// / にアクセスした場合のみ、/[user_id] にリダイレクト
	if (req.nextUrl.pathname === "/") {
		return NextResponse.redirect(new URL(`/${userId}`, req.url));
	}
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
