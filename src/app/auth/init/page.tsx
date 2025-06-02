import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AuthInitForm from "./_components/AuthInitForm";

export default async function Page() {
	const user = await currentUser();

	if (!user) {
		redirect("/");
	}

	const username = user.publicMetadata?.username;

	if (username) {
		redirect(`/${username}`);
	}

	return <AuthInitForm />;
}
