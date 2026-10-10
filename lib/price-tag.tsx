import { formatNGN } from "@/lib/format-price";

/**
 * Price is per month. When a track runs longer than a month,
 * pass `months` to show "for 3 months" underneath.
 */
export default function PriceTag({
  price,
  months ,
}: {
  price: number;
  months: number;
}) {
  if (price === 0) {
    return (
      <span className="shrink-0 text-[16px] font-semibold tracking-[-0.04em] leading-snug text-foreground">
        Free
      </span>
    );
  }

  return (
    <div className="shrink-0 text-right leading-snug">
      <div className="text-[16px] tracking-[-0.04em] text-foreground">
        {formatNGN(price)}
        <span className="med-font ml-0.5 text-[11px] font-normal tracking-normal text-muted-foreground">
          /mo
        </span>
      </div>
      {months > 1 && (
        <div className="med-font text-[11px] text-muted-foreground">for {months} months</div>
      )}
    </div>
  );
}
