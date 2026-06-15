import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { ProductVisual } from "@/components/ProductVisual";
import ProductCard from "@/components/ProductCard";
import { Icon, Stat, SectionTitle, StatusPill } from "@/components/ui";
import { CATEGORIES, APPLICATIONS, COMPANY } from "@/lib/constants";
import { featuredProducts, popularProducts } from "@/data/products";

export default function Home() {
  const navigate = useNavigate();
  const { profile, orders, favorites } = useStore();

  const stats = useMemo(() => {
    const open = orders.filter((o) => o.stageIndex < 6).length;
    const transit = orders.filter((o) => o.stageIndex === 5).length;
    const delivered = orders.filter((o) => o.stageIndex === 6).length;
    return { open, transit, delivered };
  }, [orders]);

  const liveOrder = orders.find((o) => o.stageIndex >= 2 && o.stageIndex < 6) || orders[0];
  const featured = featuredProducts();
  const popular = popularProducts();
  const firstName = (profile.company || "there").split(" ")[0];

  return (
    <div className="flex flex-col gap-6 px-4 pb-8 pt-5">
      {/* Greeting */}
      <div>
        <div className="eyebrow mb-1">Welcome back</div>
        <h1 className="font-display text-[22px] font-700 leading-tight text-ink">
          {profile.company}
        </h1>
        <p className="mt-1 text-[13px] text-ink/55">
          Source mattress fabrics, yarns &amp; threads — and track every consignment in real time.
        </p>
      </div>

      {/* Search entry */}
      <button
        onClick={() => navigate("/catalog")}
        className="flex items-center gap-2.5 rounded-2xl border border-line bg-white px-4 py-3 text-left shadow-card transition active:scale-[0.99]"
      >
        <Icon name="Search" size={18} className="text-ink/40" />
        <span className="text-[14px] text-ink/40">Search yarns, ticking, threads…</span>
      </button>

      {/* Order stats */}
      <div className="flex gap-2.5">
        <Stat icon="Package" label="Open" value={stats.open} sub="orders" />
        <Stat icon="Truck" label="Transit" value={stats.transit} sub="shipments" />
        <Stat icon="CheckCircle2" label="Delivered" value={stats.delivered} sub="this quarter" />
      </div>

      {/* Live consignment spotlight */}
      {liveOrder && (
        <button
          onClick={() => navigate(`/order/${liveOrder.id}`)}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-brand-800 p-4 text-left text-white shadow-card transition active:scale-[0.99]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">
              Tracking now
            </span>
            <Icon name="ArrowRight" size={18} className="text-white/70" />
          </div>
          <div className="mt-2 flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20">
              <ProductVisual
                texture={liveOrder.items[0].texture}
                accent={liveOrder.items[0].accent}
                className="h-full w-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-display text-[15px] font-700">
                {liveOrder.items[0].name}
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-white/60">{liveOrder.orderNo}</div>
            </div>
            <StatusPill stageIndex={liveOrder.stageIndex} className="!bg-white/15 !text-white" />
          </div>
        </button>
      )}

      {/* Capacity banner */}
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { v: `${COMPANY.capacityMT}+`, u: "MT / month", l: "Yarn capacity", icon: "Factory" },
          { v: `${COMPANY.knitMT}`, u: "MT / month", l: "Warp-knit fabric", icon: "Grid2x2" },
          { v: `Since ${COMPANY.since}`, u: COMPANY.origin, l: "Trusted maker", icon: "BadgeCheck" },
        ].map((b) => (
          <div key={b.l} className="rounded-2xl border border-line bg-white p-3 shadow-card">
            <Icon name={b.icon} size={16} className="text-brand-500" />
            <div className="mt-1.5 font-display text-[15px] font-700 leading-none text-ink">{b.v}</div>
            <div className="text-[10.5px] text-ink/45">{b.u}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-ink/35">
              {b.l}
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div>
        <SectionTitle
          eyebrow="Browse"
          title="Product categories"
          action="All"
          onAction={() => navigate("/catalog")}
        />
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/catalog?cat=${c.slug}`)}
              className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-3 text-center shadow-card transition active:scale-95"
            >
              <span
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ background: `${c.dot}18`, color: c.dot }}
              >
                <Icon name={c.icon} size={19} />
              </span>
              <span className="text-[11px] font-semibold leading-tight text-ink/75">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Applications */}
      <div>
        <SectionTitle eyebrow="By end-use" title="Shop by application" />
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {APPLICATIONS.map((a) => (
            <button
              key={a.key}
              onClick={() => navigate(`/catalog?app=${a.key}`)}
              className="chip shrink-0 !py-2 hover:border-brand-300 hover:text-brand-600"
            >
              <Icon name={a.icon} size={15} />
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured grid */}
      <div>
        <SectionTitle eyebrow="Hand-picked" title="Featured products" />
        <div className="grid grid-cols-2 gap-3">
          {featured.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Popular rail */}
      <div>
        <SectionTitle
          eyebrow="Most ordered"
          title="Popular with buyers"
          action="See all"
          onAction={() => navigate("/catalog")}
        />
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
          {popular.map((p) => (
            <ProductCard key={p.id} product={p} variant="rail" />
          ))}
        </div>
      </div>

      {/* Enquiry CTA */}
      <button
        onClick={() => navigate("/inquiry")}
        className="flex items-center gap-3 rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 p-4 text-left transition active:scale-[0.99]"
      >
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600">
          <Icon name="MessagesSquare" size={20} />
        </div>
        <div className="flex-1">
          <div className="font-display text-[14px] font-700 text-ink">Need something custom?</div>
          <div className="text-[12px] text-ink/55">Raise an RFQ or request samples — we'll call you.</div>
        </div>
        <Icon name="ArrowRight" size={18} className="text-brand-500" />
      </button>
    </div>
  );
}
