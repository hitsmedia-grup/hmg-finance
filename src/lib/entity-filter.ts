/**
 * Pure, client-safe helpers for account filter on entity list pages (issue #74).
 * 
 * - `?account=<uuid>` is the search param; anything invalid is dropped (= all accounts).
 * - The client further drops ids that are not in its (server-scoped) account list.
 * - Server-paginated pages (gold, receivables) pass the filter to SQL queries.
 * - Client-paginated pages (debts, subscriptions, recurring, goals, budgets) filter in-memory.
 */
import { parseAccountParam } from "./report-filter";

export { parseAccountParam };

export type EntitySearch = { account?: string };

/** Route `validateSearch` for entity list pages: keeps only a valid `account`. */
export function validateAccountSearch(search: Record<string, unknown>): EntitySearch {
  const account = parseAccountParam(search["account"]);
  return account ? { account } : {};
}

/** The account the page should show: the URL id only if it is one of the visible accounts. */
export function resolveFilterAccount(
  account: string | undefined,
  accounts: readonly { id: string }[] | null | undefined,
): string | undefined {
  if (!account) return undefined;
  return (accounts ?? []).some((a) => String(a.id).toLowerCase() === account) ? account : undefined;
}
