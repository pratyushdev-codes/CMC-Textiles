import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { Icon } from "@/components/ui";
import { categoryBySlug } from "@/lib/constants";
import { inr, qty } from "@/lib/format";

export default function ProductCard({ product, variant = "grid" }) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useStore();
  const fav = isFavorite(product.id);
  const cat = categoryBySlug(product.categorySlug);

  if (variant === "rail") {
    // Compact horizontal card for "popular" rails
    return (
      <button
        onClick={() => navigate(`/product/${product.id}`)}
        className="card flex w-[208px] shrink-0 flex-col overflow-hidden text-left transition active:scale-[0.98]"
      >
        <div className="relative h-28 w-full">
          <ProductVisual texture={product.texture} accent={product.accent} className="h-full w-full" />
          {product.badges?.[0] && (
            <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-bold text-ink/70 backdrop-blur">
              {product.badges[0]}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <span className="text-[10px] font-bold uppercase tracking-wide text-ink/40">
            {cat?.name}
          </span>
          <span className="mt-0.5 line-clamp-1 font-display text-[14px] font-700 text-ink">
            {product.name}
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-[15px] font-700 text-brand-600">{inr(product.basePrice)}</span>
            <span className="text-[11px] text-ink/45">/ {product.unit}</span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="card group relative flex cursor-pointer flex-col overflow-hidden transition active:scale-[0.98]"
    >
      <div className="relative h-32 w-full">
        <ProductVisual texture={product.texture} accent={product.accent} className="h-full w-full" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-white/85 backdrop-blur transition active:scale-90"
          aria-label={fav ? "Remove from saved" : "Save"}
        >
          <Icon
            name="Heart"
            size={16}
            className={fav ? "text-rose-500" : "text-ink/45"}
            fill={fav ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ background: cat?.dot }} />
          <span className="text-[10.5px] font-bold uppercase tracking-wide text-ink/40">
            {cat?.short}
          </span>
        </div>
        <h3 className="line-clamp-1 font-display text-[14.5px] font-700 text-ink">{product.name}</h3>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-ink/55">{product.blurb}</p>

        <div className="mt-3 flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-base font-700 text-brand-600">{inr(product.basePrice)}</span>
            <span className="text-[11px] text-ink/45">/ {product.unit}</span>
          </div>
          <span className="rounded-full bg-canvas px-2 py-1 text-[10.5px] font-semibold text-ink/50">
            MOQ {qty(product.moq, product.unit)}
          </span>
        </div>
      </div>
    </div>
  );
}
