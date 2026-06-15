import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { ProductVisual } from "@/components/ProductVisual";
import { Icon, ColorSwatch, QuantityStepper, EmptyState } from "@/components/ui";
import { categoryBySlug, colorByName, APPLICATIONS } from "@/lib/constants";
import { productById, defaultSpecs, unitPriceFor } from "@/data/products";
import { inr, qty } from "@/lib/format";

const STEP_BY_UNIT = { kg: 50, m: 100, cone: 10, pc: 25 };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isFavorite, toggleFavorite } = useStore();
  const product = productById(id);

  if (!product) {
    return (
      <EmptyState
        icon="PackageX"
        title="Product not found"
        body="It may have been moved."
        action="Back to catalog"
        onAction={() => navigate("/catalog")}
      />
    );
  }

  const cat = categoryBySlug(product.categorySlug);
  const [specs, setSpecs] = useState(() => defaultSpecs(product));
  const [color, setColor] = useState(product.colors[0]);
  const [count, setCount] = useState(product.moq);

  const step = STEP_BY_UNIT[product.unit] || 10;
  const unitPrice = useMemo(() => unitPriceFor(product, color), [product, color]);
  const total = unitPrice * count;
  const dyed = unitPrice > product.basePrice;

  const buildLine = () => ({
    productId: product.id,
    sku: product.sku,
    name: product.name,
    texture: product.texture,
    accent: product.accent,
    unit: product.unit,
    specs,
    color,
    qty: count,
    unitPrice,
    lineTotal: unitPrice * count,
  });

  const onAdd = () => {
    addToCart(buildLine());
  };

  return (
    <div className="pb-28">
      {/* Hero swatch */}
      <div className="relative h-56 w-full">
        <ProductVisual
          texture={product.texture}
          color={colorByName(color).hex}
          accent={product.accent}
          className="h-full w-full"
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 backdrop-blur transition active:scale-90"
          aria-label="Save"
        >
          <Icon
            name="Heart"
            size={18}
            className={isFavorite(product.id) ? "text-rose-500" : "text-ink/50"}
            fill={isFavorite(product.id) ? "currentColor" : "none"}
          />
        </button>
        <div className="absolute bottom-3 left-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-ink/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full" style={{ background: cat?.dot }} />
            {cat?.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-4">
        {/* Title */}
        <div>
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display text-[20px] font-700 leading-tight text-ink">{product.name}</h1>
            <span className="shrink-0 rounded-md bg-canvas px-2 py-1 font-mono text-[11px] text-ink/55">
              {product.sku}
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/65">{product.description}</p>
        </div>

        {/* Badges */}
        {product.badges?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.badges.map((b) => (
              <span key={b} className="chip !py-1 text-[11px]">
                <Icon name="Check" size={12} className="text-brand-500" />
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Applications */}
        <div>
          <div className="label">Suitable for</div>
          <div className="flex flex-wrap gap-1.5">
            {product.applications.map((key) => {
              const a = APPLICATIONS.find((x) => x.key === key);
              return (
                <span key={key} className="inline-flex items-center gap-1.5 rounded-lg bg-canvas px-2.5 py-1.5 text-[12px] font-medium text-ink/65">
                  <Icon name={a?.icon || "Dot"} size={14} className="text-ink/45" />
                  {a?.label || key}
                </span>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-line" />

        {/* Spec configurator */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Icon name="SlidersHorizontal" size={16} className="text-brand-500" />
            <span className="font-display text-[15px] font-700 text-ink">Configure specification</span>
          </div>

          {product.specOptions.map((group) => (
            <div key={group.key}>
              <div className="label">{group.label}</div>
              <div className="flex flex-wrap gap-2">
                {group.options.map((opt) => {
                  const selected = specs[group.key] === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => setSpecs((s) => ({ ...s, [group.key]: opt }))}
                      className={`rounded-xl border px-3 py-2 text-[13px] font-semibold transition active:scale-95 ${
                        selected
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-line bg-white text-ink/70 hover:border-brand-300"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Colour */}
          <div>
            <div className="label flex items-center justify-between">
              <span>Colour</span>
              <span className="font-mono text-[11px] font-medium text-ink/50">{color}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((name) => (
                <ColorSwatch
                  key={name}
                  name={name}
                  selected={color === name}
                  onClick={() => setColor(name)}
                />
              ))}
            </div>
            {dyed && (
              <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink/50">
                <Icon name="Info" size={13} className="text-brand-400" />
                Dyed shade — includes a small colour surcharge over greige.
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <div className="label flex items-center justify-between">
              <span>Quantity</span>
              <span className="text-[11.5px] font-medium text-ink/50">
                MOQ {qty(product.moq, product.unit)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <QuantityStepper value={count} onChange={setCount} step={step} min={product.moq} unit={product.unit} />
              <div className="text-right">
                <div className="font-display text-[13px] font-700 text-ink/70">
                  {inr(unitPrice)} <span className="text-[11px] font-medium text-ink/45">/ {product.unit}</span>
                </div>
                <div className="text-[11px] text-ink/45">Lead time · {product.leadDays} days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="flex gap-2.5">
          <button
            onClick={() => navigate("/inquiry", { state: { productId: product.id, type: "sample" } })}
            className="btn-outline flex-1 px-3 py-2.5 text-[13px]"
          >
            <Icon name="Inbox" size={16} /> Request sample
          </button>
          <button
            onClick={() => navigate("/inquiry", { state: { productId: product.id, type: "quote" } })}
            className="btn-ghost flex-1 px-3 py-2.5 text-[13px]"
          >
            <Icon name="FileText" size={16} /> Ask for quote
          </button>
        </div>
      </div>

      {/* Sticky buy bar */}
      <div className="sticky bottom-0 z-20 mt-6 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="text-[11px] font-medium text-ink/45">Order total</div>
            <div className="font-display text-[19px] font-700 text-ink">{inr(total)}</div>
          </div>
          <button onClick={onAdd} className="btn-primary ml-auto flex-1 px-4 py-3 text-[15px]">
            <Icon name="ShoppingCart" size={18} /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
