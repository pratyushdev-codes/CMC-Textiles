import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Icon, EmptyState } from "@/components/ui";
import { inr, qty } from "@/lib/format";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, profile, placeOrder } = useStore();
  const [po, setPo] = useState("");
  const [deliveryTo, setDeliveryTo] = useState(profile.address || "");
  const [notes, setNotes] = useState("");

  const gst = Math.round(cartTotal * 0.05);
  const grand = cartTotal + gst;

  if (cart.length === 0) {
    return (
      <div className="pt-8">
        <EmptyState
          icon="ShoppingCart"
          title="Nothing to check out"
          body="Add items to your cart first."
          action="Browse catalog"
          onAction={() => navigate("/catalog")}
        />
      </div>
    );
  }

  const submit = () => {
    const order = placeOrder({ poNumber: po, deliveryTo, notes });
    if (order) navigate(`/order/${order.id}`, { replace: true });
  };

  return (
    <div className="flex flex-col px-4 pb-28 pt-5">
      {/* Buyer */}
      <div className="card p-4">
        <div className="eyebrow mb-2">Billing to</div>
        <div className="font-display text-[15px] font-700 text-ink">{profile.company}</div>
        <div className="mt-1 space-y-0.5 text-[12.5px] text-ink/55">
          <div className="font-mono text-[11.5px]">GSTIN {profile.gstin}</div>
          <div>{profile.contactName} · {profile.phone}</div>
          <div>{profile.email}</div>
        </div>
      </div>

      {/* Order form */}
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <label className="label">Purchase Order number (optional)</label>
          <input value={po} onChange={(e) => setPo(e.target.value)} placeholder="e.g. SSI/PO/2406/121" className="field" />
        </div>
        <div>
          <label className="label">Deliver to</label>
          <textarea
            value={deliveryTo}
            onChange={(e) => setDeliveryTo(e.target.value)}
            rows={3}
            className="field resize-none"
            placeholder="Delivery address"
          />
        </div>
        <div>
          <label className="label">Notes for CMC (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="field resize-none"
            placeholder="Special packing, dispatch instructions, target dates…"
          />
        </div>
      </div>

      {/* Items recap */}
      <div className="card mt-4 divide-y divide-line">
        {cart.map((it) => (
          <div key={it.lineId} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0">
              <div className="line-clamp-1 text-[13px] font-semibold text-ink">{it.name}</div>
              <div className="text-[11px] text-ink/45">
                {qty(it.qty, it.unit)} · {it.color}
              </div>
            </div>
            <span className="shrink-0 text-[13px] font-semibold text-ink">{inr(it.lineTotal)}</span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-3 space-y-1 px-1">
        <div className="flex justify-between text-[13px]">
          <span className="text-ink/55">Subtotal</span>
          <span className="font-semibold text-ink">{inr(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-ink/55">GST (5%)</span>
          <span className="font-semibold text-ink">{inr(gst)}</span>
        </div>
      </div>

      {/* Place order */}
      <div className="sticky bottom-0 z-20 mt-5 border-t border-line bg-white/95 px-1 py-3 backdrop-blur-md">
        <button onClick={submit} className="btn-primary w-full px-4 py-3.5 text-[15px]">
          <Icon name="CheckCircle2" size={18} /> Place order · {inr(grand)}
        </button>
        <p className="mt-2 text-center text-[11px] text-ink/45">
          A CMC representative confirms specs &amp; pricing before production.
        </p>
      </div>
    </div>
  );
}
