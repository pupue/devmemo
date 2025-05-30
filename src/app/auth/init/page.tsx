import { getUser } from "@/actions/user";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthInitForm from "./_components/AuthInitForm";

export default async function Page() {
	const { userId } = await auth();

	if (!userId) {
		redirect("/");
	}

	const user = await getUser(userId);

	if (user.username) {
		redirect(`/${user.username}`);
	}

	return <AuthInitForm />;
}
