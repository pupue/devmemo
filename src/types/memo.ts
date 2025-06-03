import type { memos } from "@/db/schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type InsertMemo = InferInsertModel<typeof memos>;
export type Memo = InferSelectModel<typeof memos>;
