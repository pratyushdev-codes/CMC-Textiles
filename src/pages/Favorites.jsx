import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import ProductCard from "@/components/ProductCard";
import { EmptyState } from "@/components/ui";
import { productById } from "@/data/products";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites } = useStore();
  const items = favorites.map(productById).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="pt-8">
        <EmptyState
          icon="Heart"
          title="No saved items"
          body="Tap the heart on any product to save it here for quick reordering."
          action="Browse catalog"
          onAction={() => navigate("/catalog")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pb-8 pt-5">
      <h1 className="font-display text-[22px] font-700 text-ink">Saved items</h1>
      <p className="mt-0.5 text-[13px] text-ink/55">{items.length} product{items.length > 1 ? "s" : ""}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
