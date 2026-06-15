import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { Icon, QuantityStepper, EmptyState } from "@/components/ui";
import { colorByName } from "@/lib/constants";
import { productById } from "@/data/products";
import { inr, qty } from "@/lib/format";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, cartTotal, updateLineQty, removeLine } = useStore();
  const gst = Math.round(cartTotal * 0.05);
  const grand = cartTotal + gst;

  if (cart.length === 0) {
    return (
      <div className="pt-8">
        <EmptyState
          icon="ShoppingCart"
          title="Your cart is empty"
          body="Browse the catalog and configure a product to place a B2B order."
          action="Browse catalog"
          onAction={() => navigate("/catalog")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pb-28 pt-5">
      <h1 className="font-display text-[22px] font-700 text-ink">Cart</h1>
      <p className="mt-0.5 text-[13px] text-ink/55">
        {cart.length} line item{cart.length > 1 ? "s" : ""}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {cart.map((it) => {
          const p = productById(it.productId);
          const specSummary = Object.values(it.specs || {}).join(" · ");
          return (
            <div key={it.lineId} className="card flex gap-3 p-3">
              <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
                <ProductVisual texture={it.texture} color={colorByName(it.color).hex} accent={it.accent} className="h-full w-full" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <span className="line-clamp-1 font-display text-[14px] font-700 text-ink">{it.name}</span>
                  <button
                    onClick={() => removeLine(it.lineId)}
                    className="-mr-1 -mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink/35 transition active:scale-90 hover:bg-canvas hover:text-rose-500"
                    aria-label="Remove"
                  >
                    <Icon name="Trash2" size={15} />
                  </button>
                </div>

                <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ink/55">
                  <span className="h-2.5 w-2.5 rounded-full ring-1 ring-line" style={{ background: colorByName(it.color).hex }} />
                  {it.color}
                </div>
                {specSummary && (
                  <span className="mt-0.5 line-clamp-1 text-[11.5px] text-ink/45">{specSummary}</span>
                )}

                <div className="mt-2 flex items-end justify-between">
                  <QuantityStepper
                    value={it.qty}
                    onChange={(v) => updateLineQty(it.lineId, v)}
                    step={p?.unit === "kg" ? 50 : p?.unit === "m" ? 100 : 10}
                    min={p?.moq || 1}
                    unit={it.unit}
                  />
                  <div className="text-right">
                    <div className="font-display text-[15px] font-700 text-ink">{inr(it.lineTotal)}</div>
                    <div className="text-[10.5px] text-ink/45">{inr(it.unitPrice)}/{it.unit}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="card mt-4 p-4">
        <Row label="Subtotal" value={inr(cartTotal)} />
        <Row label="GST (5%)" value={inr(gst)} />
        <div className="my-2.5 h-px bg-line" />
        <div className="flex items-center justify-between">
          <span className="font-display text-[15px] font-700 text-ink">Total payable</span>
          <span className="font-display text-[20px] font-700 text-brand-600">{inr(grand)}</span>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-ink/45">
          Indicative pricing. Final invoice confirmed by CMC after spec &amp; quantity review.
        </p>
      </div>

      {/* Sticky checkout */}
      <div className="sticky bottom-0 z-20 mt-5 border-t border-line bg-white/95 px-1 py-3 backdrop-blur-md">
        <button onClick={() => navigate("/checkout")} className="btn-primary w-full px-4 py-3.5 text-[15px]">
          Proceed to checkout
          <Icon name="ArrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1 text-[13.5px]">
      <span className="text-ink/55">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
    </div>
  );
}
