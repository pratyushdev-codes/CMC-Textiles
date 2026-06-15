import { NavLink } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Icon } from "@/components/ui";

const TABS = [
  { to: "/", label: "Home", icon: "House" },
  { to: "/catalog", label: "Catalog", icon: "LayoutGrid" },
  { to: "/cart", label: "Cart", icon: "ShoppingCart", badge: "cart" },
  { to: "/orders", label: "Orders", icon: "Package" },
  { to: "/account", label: "Account", icon: "User" },
];

export default function BottomNav() {
  const { cartCount } = useStore();

  return (
    <nav className="relative z-30 grid shrink-0 grid-cols-5 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-nav backdrop-blur-md">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.to === "/"}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center gap-1 py-2.5 text-[10.5px] font-semibold transition ${
              isActive ? "text-brand-600" : "text-ink/45"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="relative">
                <Icon
                  name={t.icon}
                  size={22}
                  strokeWidth={isActive ? 2.4 : 1.9}
                />
                {t.badge === "cart" && cartCount > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-[16px] min-w-[16px] place-items-center rounded-full bg-brand-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </span>
              {t.label}
              {isActive && (
                <span className="absolute -top-px h-[3px] w-7 rounded-full bg-brand-500" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
