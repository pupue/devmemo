import { TypographyH1 } from "@/components/ui/typography/TypographyH1";
import AuthButton from "./_components/auth-button";

export default function Home() {
	return (
		<div className="space-y-6">
			<TypographyH1 center>Devmemo</TypographyH1>
			<p className="text-center">
				このアプリは、あなたが日々の中で感じた「ちょっとした学び」や「気づき」を気軽に残せる成長ログです。
			</p>
			<AuthButton />
		</div>
	);
}
