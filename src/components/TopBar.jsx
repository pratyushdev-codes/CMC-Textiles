import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Icon } from "@/components/ui";
import NotificationSheet from "@/components/NotificationSheet";

// Tab roots show the logo; everything else shows a back button + title.
const TAB_ROOTS = new Set(["/", "/catalog", "/cart", "/orders", "/account"]);

const TITLES = {
  "/checkout": "Checkout",
  "/inquiry": "Raise an Enquiry",
  "/favorites": "Saved Items",
  "/product": "Product Details",
  "/order": "Order Tracking",
};

export default function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useStore();
  const [bellOpen, setBellOpen] = useState(false);

  const isRoot = TAB_ROOTS.has(pathname);
  const base = "/" + (pathname.split("/")[1] || "");
  const title = TITLES[base] || "";

  return (
    <>
      <header className="relative z-30 flex h-[58px] shrink-0 items-center gap-3 border-b border-line/80 bg-white/90 px-4 backdrop-blur-md">
        {isRoot ? (
          <img src="/cmc-logo.png" alt="CMC Textile" className="h-7 w-auto" />
        ) : (
          <>
            <button
              onClick={() => navigate(-1)}
              className="-ml-1 grid h-9 w-9 place-items-center rounded-full text-ink/70 transition active:scale-90 hover:bg-canvas"
              aria-label="Back"
            >
              <Icon name="ChevronLeft" size={22} />
            </button>
            <h1 className="font-display text-[16px] font-700 text-ink">{title}</h1>
          </>
        )}

        <button
          onClick={() => setBellOpen(true)}
          className="relative ml-auto grid h-9 w-9 place-items-center rounded-full text-ink/70 transition active:scale-90 hover:bg-canvas"
          aria-label="Notifications"
        >
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>
      </header>

      <NotificationSheet open={bellOpen} onClose={() => setBellOpen(false)} />
    </>
  );
}
