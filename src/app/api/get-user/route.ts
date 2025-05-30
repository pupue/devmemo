import { getUser } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	console.log("GET!!!! /api/get-user");
	const { searchParams } = new URL(req.url);
	const uuid = searchParams.get("uuid");

	if (!uuid) return NextResponse.json({ error: "Missing uuid" }, { status: 400 });

	const user = await getUser(uuid);
	if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

	return NextResponse.json({ username: user.username });
}
