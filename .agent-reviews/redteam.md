# Red-Team Review — unauthenticated /store /staking /subscription

**Date:** 2026-06-24  
**Plan under review:** Remove `withConnectedWallet` HOC gate so pages render without wallet connection; fix render-time TypeErrors from `contracts.ppdex.address` accessed when `contracts = new Map([])`.

---

## Builder's Plan

1. **`withConnectedWallet.tsx`** — remove `!account` gate; always render WrappedComponent (still render `<Head>` for meta tags).
2. **`StakeCard.tsx` lines 88, 98** — `contracts.ppdex.address` → `contracts?.ppdex?.address` in `useCallback` dependency arrays (render-time crash when no wallet).
3. **`StoreCardsAside.tsx` lines 17, 142–143** — same optional chaining fix (crash when aside mounts after card click with no wallet).

---

## Round 1 — Critic

| # | Objection | Impact |
|---|-----------|--------|
| 1 | **Missing crash sites:** grep covered `views/` but `hooks/` or `components/` used by those views may also access `contracts.X.address` at render time without guards. | HIGH |
| 2 | **`correctChainIsLoaded` side-effects:** when pepemon has no chainId it returns `false` synchronously — but is it async? If it awaits and the promise never resolves or throws, the useEffect leaks silently and no data loads ever. | HIGH |
| 3 | **Staking page UX with all zeros:** APY calculates from token prices (external price feed — may also fail if contracts are needed), total supply shows 0, all balances 0. Could look like a broken/dead feature, worse than a clear "no wallet" message. | MEDIUM |
| 4 | **StoreCardsAside with `contracts?.ppdex?.address` = `undefined`:** template literal becomes `https://app.uniswap.org/#/swap?outputCurrency=undefined` — functional but ugly. No wallet also means the claim/enable buttons have undefined behavior on click (they call hooks that check account and silently no-op). | MEDIUM |
| 5 | **Subscription hooks pass undefined contracts to `useApprove`:** confirmed safe (guards inside). But `getUniV2PpdexAddress(pepemon)` returns `pepemon.uniV2PpdexAddress` — when no wallet, this is `undefined`; `useTokenBalance(undefined)` is safe (guarded by `if (account)`). | LOW — confirmed safe |

---

## Round 1 — Builder Responses

**Objection 1 (HIGH) — Missing crash sites**

Grep results from views/ are exhaustive for render-time dot-chained access. Hooks called by these views (`useTokenBalance`, `useAllowance`, `useApprove`) were read in full — all guard on `account` or contract truthiness before calling. The subscription page uses helper functions (`getPepemonLotteryContract`, etc.) that return `undefined` safely via `pepemon && pepemon.contracts && pepemon.contracts.X`. No other render-time crash sites found.

_Status: RESOLVED — no additional sites_

**Objection 2 (HIGH) — `correctChainIsLoaded` reliability**

Read the source:
```ts
export const correctChainIsLoaded = async (pepemon: any) => {
    if (!pepemon.chainId) return false;           // returns false immediately, no await
    return pepemon.chainId === parseFloat(chainId);
}
```
It is declared `async` but returns a resolved `false` immediately when `!pepemon.chainId`. No hanging promise. The `useEffect` `.then(correct => { if (!correct) return; })` exits the callback safely. No leak.

_Status: RESOLVED — exits fast_

**Objection 3 (MEDIUM) — Staking page shows zeros**

The staking page renders APY from `useTokenPrices()` which hits an external price feed (no wallet needed). Total supply calls are inside `try/catch` callbacks and `correctChainIsLoaded` returns false → they never fire → totals remain 0. So the page shows the APY percentage and the staking UI layout but 0 balances everywhere.

Decision: Accept this as the intended behavior. Showing a staking UI with APY visible (even with 0 balances) is significantly better than a blank "No wallet connected" wall. The connect-wallet button in the top bar remains the call-to-action. Users can see what staking offers before committing to connecting.

_Status: ACCEPTED — better than blank wall; no code change needed_

**Objection 4 (MEDIUM) — `undefined` in Uniswap URL**

Fix: add `|| ''` fallback: `` `...?outputCurrency=${contracts?.ppdex?.address || ''}` ``. This produces a valid (if suboptimal) URL with no address — Uniswap opens without a pre-selected token, which is acceptable for a read-only browsing state.

_Status: FIXED — add fallback_

---

## Round 2 — Critic

No new high-impact objections. The `undefined` URL is now handled. Objection 1 (crash sites) and 2 (promise) are resolved with evidence. Objection 3 is accepted with documented rationale.

The one remaining concern: **are action buttons (Claim, Enable) in StoreCardsAside visible and clickable when no wallet?** They will render (the aside renders if a card is selected), but `useRedeemCard(undefined)` and `useApprove(undefined, undefined)` both silently no-op when triggered. The buttons remain in their normal enabled/disabled state based on balance/allowance (all 0), so "Claim card" might appear enabled with 0 ppdexBalance. Impact: user clicks claim, nothing happens (hook returns false silently). Not a crash. UX is confusing but within acceptable range given goal is "see without wallet."

_Status: ACCEPTED — not a crash; out of scope for this minimal fix_

---

## Decision

**APPROVED to implement.** Five targeted changes:
1. `withConnectedWallet.tsx` — remove `!account` gate
2. `StakeCard.tsx:88` — `contracts?.ppdex?.address`
3. `StakeCard.tsx:98` — `contracts?.ppdex?.address`
4. `StoreCardsAside.tsx:17` — `contracts?.ppdex?.address`
5. `StoreCardsAside.tsx:142-143` — `contracts?.ppdex?.address || ''`

### Resolved objections
| # | Resolution |
|---|-----------|
| 1 | No additional crash sites in hooks/components used by these views |
| 2 | `correctChainIsLoaded` returns immediately; no async leak |
| 4 | `|| ''` fallback added to URL template |
| 5 | Confirmed safe |

### Accepted objections
| # | Rationale |
|---|-----------|
| 3 | Zeros > blank wall; APY still visible; connect-wallet CTA in nav |
| 4 (buttons) | Silent no-op, not a crash; within scope of minimal fix |
