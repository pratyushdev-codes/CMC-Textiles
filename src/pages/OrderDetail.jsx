import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import Timeline from "@/components/Timeline";
import { ProductVisual } from "@/components/ProductVisual";
import { Icon, StatusPill, EmptyState } from "@/components/ui";
import { colorByName, STAGES } from "@/lib/constants";
import { inr, qty, fmtDate } from "@/lib/format";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, advanceOrder, reorder } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <EmptyState
        icon="PackageX"
        title="Order not found"
        body="It may have been removed."
        action="Back to orders"
        onAction={() => navigate("/orders")}
      />
    );
  }

  const c = order.consignment;
  const delivered = order.stageIndex >= STAGES.length - 1;
  const dispatched = order.stageIndex >= 4;

  return (
    <div className="flex flex-col gap-5 px-4 pb-10 pt-5">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[12px] text-ink/50">{order.orderNo}</span>
          <StatusPill stageIndex={order.stageIndex} />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[12px] text-ink/55">
          <span>Placed {fmtDate(order.placedAt)}</span>
          {order.poNumber && order.poNumber !== "—" && (
            <span className="flex items-center gap-1">
              <Icon name="FileText" size={12} /> PO {order.poNumber}
            </span>
          )}
        </div>
      </div>

      {/* Consignment card */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <div className="flex items-center gap-2 border-b border-line bg-canvas/60 px-4 py-2.5">
          <Icon name="Boxes" size={16} className="text-brand-500" />
          <span className="font-display text-[14px] font-700 text-ink">Consignment details</span>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line">
          <Detail icon="Scale" label="Total quantity" value={qty(c.totalQty, c.unit)} />
          <Detail
            icon="Palette"
            label="Colour"
            value={
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full ring-1 ring-line" style={{ background: colorByName(c.color).hex }} />
                {c.color}
              </span>
            }
          />
          <Detail icon="Ruler" label="Specification" value={c.spec} />
          <Detail icon="CalendarClock" label="Est. delivery" value={fmtDate(c.eta)} />
          {dispatched ? (
            <>
              <Detail icon="ScanLine" label="Tracking ID" value={<span className="font-mono text-[12.5px]">{c.trackingId}</span>} />
              <Detail icon="Truck" label="Vehicle" value={<span className="font-mono text-[12.5px]">{c.vehicle}</span>} />
              <Detail icon="PackageCheck" label="Dispatched" value={fmtDate(c.dispatchDate)} />
              <Detail icon="MapPin" label="Inward dock" value={c.dock} />
            </>
          ) : (
            <Detail icon="MapPin" label="Inward dock" value={c.dock} full />
          )}
        </div>
        {!delivered && (
          <div className="flex items-center gap-2 border-t border-line bg-brand-50/40 px-4 py-2.5 text-[12px] text-brand-700">
            <Icon name="Truck" size={14} />
            {dispatched ? "On the way to your dock." : "Will dispatch once production & QC complete."}
          </div>
        )}
      </div>

      {/* Tracker */}
      <div className="card p-4">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="GitCommitVertical" size={16} className="text-brand-500" />
          <span className="font-display text-[15px] font-700 text-ink">Production &amp; delivery</span>
        </div>
        <Timeline order={order} />
      </div>

      {/* Demo control */}
      {!delivered && (
        <button
          onClick={() => advanceOrder(order.id)}
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 py-3 text-[13px] font-semibold text-brand-700 transition active:scale-[0.99]"
        >
          <Icon name="FastForward" size={16} />
          Advance to next stage
          <span className="rounded-full bg-brand-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">Demo</span>
        </button>
      )}

      {/* Items */}
      <div>
        <div className="mb-2 font-display text-[14px] font-700 text-ink">Items</div>
        <div className="card divide-y divide-line">
          {order.items.map((it) => (
            <div key={it.lineId} className="flex items-center gap-3 px-3 py-2.5">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                <ProductVisual texture={it.texture} color={colorByName(it.color).hex} accent={it.accent} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="line-clamp-1 text-[13px] font-semibold text-ink">{it.name}</div>
                <div className="line-clamp-1 text-[11px] text-ink/50">
                  {qty(it.qty, it.unit)} · {it.color}
                  {it.specs && Object.values(it.specs).length > 0 && ` · ${Object.values(it.specs).join(", ")}`}
                </div>
              </div>
              <span className="shrink-0 text-[13px] font-semibold text-ink">{inr(it.lineTotal)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="card p-4">
        <div className="flex justify-between py-0.5 text-[13px]">
          <span className="text-ink/55">Subtotal</span>
          <span className="font-semibold text-ink">{inr(order.subtotal)}</span>
        </div>
        <div className="flex justify-between py-0.5 text-[13px]">
          <span className="text-ink/55">GST (5%)</span>
          <span className="font-semibold text-ink">{inr(order.gst)}</span>
        </div>
        <div className="my-2 h-px bg-line" />
        <div className="flex items-center justify-between">
          <span className="font-display text-[14px] font-700 text-ink">Order value</span>
          <span className="font-display text-[18px] font-700 text-brand-600">{inr(order.subtotal + order.gst)}</span>
        </div>
      </div>

      {/* Reorder */}
      <button
        onClick={() => {
          reorder(order.id);
          navigate("/cart");
        }}
        className="btn-outline w-full px-4 py-3 text-[14px]"
      >
        <Icon name="RotateCcw" size={16} /> Reorder these items
      </button>
    </div>
  );
}

function Detail({ icon, label, value, full }) {
  return (
    <div className={`bg-white px-4 py-3 ${full ? "col-span-2" : ""}`}>
      <div className="mb-1 flex items-center gap-1.5 text-ink/40">
        <Icon name={icon} size={13} />
        <span className="text-[10.5px] font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-[13.5px] font-700 text-ink">{value}</div>
    </div>
  );
}
