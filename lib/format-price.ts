/**
 * Formats a naira amount, e.g. 15000 -> "₦15,000". Returns "Free" for 0.
 * Swap the return for `NGN ${amount.toLocaleString("en-NG")}` if you prefer
 * the "NGN 15,000" style over the ₦ symbol.
 */
export function formatNGN(amount: number): string {
  if (amount === 0) return "Free";
  return `NGN ${amount.toLocaleString("en-NG")}`
}
