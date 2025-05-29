export function extractFirstErrors<T>(nested: Record<string, string[] | undefined>): Partial<Record<keyof T, string>> {
	const result: Partial<Record<keyof T, string>> = {};
	for (const key of Object.keys(nested)) {
		const messages = nested[key];
		if (messages && messages?.length > 0) {
			result[key as keyof T] = messages[0];
		}
	}
	return result;
}
