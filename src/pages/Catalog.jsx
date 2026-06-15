import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Icon, EmptyState } from "@/components/ui";
import { CATEGORIES, APPLICATIONS } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState("");
  const cat = params.get("cat") || "";
  const app = params.get("app") || "";

  // keep URL <-> filter in sync when chips are tapped
  const setCat = (slug) => {
    const next = new URLSearchParams(params);
    slug && slug !== cat ? next.set("cat", slug) : next.delete("cat");
    setParams(next, { replace: true });
  };
  const setApp = (key) => {
    const next = new URLSearchParams(params);
    key && key !== app ? next.set("app", key) : next.delete("app");
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (cat && p.categorySlug !== cat) return false;
      if (app && !p.applications.includes(app)) return false;
      if (needle) {
        const hay = `${p.name} ${p.blurb} ${p.sku} ${p.badges.join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [q, cat, app]);

  return (
    <div className="flex flex-col px-4 pb-8 pt-5">
      <h1 className="font-display text-[22px] font-700 text-ink">Catalog</h1>
      <p className="mt-0.5 text-[13px] text-ink/55">
        {PRODUCTS.length} products across {CATEGORIES.length} categories
      </p>

      {/* Search */}
      <div className="relative mt-4">
        <Icon name="Search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search yarns, ticking, threads…"
          className="field !pl-11"
        />
        {q && (
          <button
            onClick={() => setQ("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
            aria-label="Clear"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
        <Chip active={!cat} onClick={() => setCat("")} label="All" />
        {CATEGORIES.map((c) => (
          <Chip key={c.slug} active={cat === c.slug} onClick={() => setCat(c.slug)} label={c.short} dot={c.dot} />
        ))}
      </div>

      {/* Application chips */}
      <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4">
        {APPLICATIONS.map((a) => (
          <Chip
            key={a.key}
            active={app === a.key}
            onClick={() => setApp(a.key)}
            label={a.label}
            icon={a.icon}
            muted
          />
        ))}
      </div>

      {/* Results */}
      <div className="mt-5">
        {results.length === 0 ? (
          <EmptyState
            icon="SearchX"
            title="No matches"
            body="Try a different search or clear your filters."
            action="Clear filters"
            onAction={() => {
              setQ("");
              setParams({}, { replace: true });
            }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, label, dot, icon, muted }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95 ${
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : muted
          ? "border-line bg-white text-ink/55"
          : "border-line bg-white text-ink/70"
      }`}
    >
      {dot && !active && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
      {icon && <Icon name={icon} size={14} />}
      {label}
    </button>
  );
}
