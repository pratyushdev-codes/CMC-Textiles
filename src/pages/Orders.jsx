import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { Icon, StatusPill, EmptyState } from "@/components/ui";
import { colorByName } from "@/lib/constants";
import { inr, fmtDate } from "@/lib/format";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "delivered", label: "Delivered" },
];

export default function Orders() {
  const navigate = useNavigate();
  const { orders } = useStore();
  const [filter, setFilter] = useState("all");

  const shown = useMemo(() => {
    if (filter === "active") return orders.filter((o) => o.stageIndex < 6);
    if (filter === "delivered") return orders.filter((o) => o.stageIndex === 6);
    return orders;
  }, [orders, filter]);

  if (orders.length === 0) {
    return (
      <div className="pt-8">
        <EmptyState
          icon="Package"
          title="No orders yet"
          body="When you place an order, track its production and consignment here."
          action="Start an order"
          onAction={() => navigate("/catalog")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pb-8 pt-5">
      <h1 className="font-display text-[22px] font-700 text-ink">Orders</h1>

      <div className="mt-3 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition active:scale-95 ${
              filter === f.key ? "bg-ink text-white" : "bg-white text-ink/55 border border-line"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {shown.map((o) => {
          const primary = o.items[0];
          const extra = o.items.length - 1;
          return (
            <button
              key={o.id}
              onClick={() => navigate(`/order/${o.id}`)}
              className="card flex items-center gap-3 p-3 text-left transition active:scale-[0.99]"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                <ProductVisual texture={primary.texture} color={colorByName(primary.color).hex} accent={primary.accent} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-ink/45">{o.orderNo}</span>
                  <StatusPill stageIndex={o.stageIndex} />
                </div>
                <div className="mt-0.5 line-clamp-1 font-display text-[14px] font-700 text-ink">
                  {primary.name}
                  {extra > 0 && <span className="text-ink/45"> +{extra} more</span>}
                </div>
                <div className="mt-0.5 flex items-center justify-between text-[11.5px] text-ink/50">
                  <span>{fmtDate(o.placedAt)}</span>
                  <span className="font-semibold text-ink/70">{inr(o.subtotal + o.gst)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
