import type { memos } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Memo = InferSelectModel<typeof memos>;
