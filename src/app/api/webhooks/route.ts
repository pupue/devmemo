import { users } from "@/db/schema";
import { db } from "@/lib/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);
		const eventType = evt.type;

		if (eventType === "user.created") {
			const uuid = evt.data.id;

			await db.insert(users).values({
				uuid,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			});

			console.log("✅ ユーザー登録完了:", uuid);
		}
		return new Response("Webhook received", { status: 200 });
	} catch (error) {
		console.error("Error verifying webhook:", error);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
