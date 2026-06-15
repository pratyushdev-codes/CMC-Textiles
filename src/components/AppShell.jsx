import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Toaster } from "@/components/ui";

export default function AppShell() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  // Reset scroll to top on route change — feels like native push navigation.
  useEffect(() => {
    if (mainRef.current) mainRef.current.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center lg:py-7">
      {/* Desktop-only brand caption above the device */}
      <div className="hidden w-full max-w-[440px] items-center justify-between px-1.5 pb-4 lg:flex">
        <div className="flex items-center gap-2.5">
          <img src="/cmc-logo.png" alt="CMC Textile" className="h-7 w-auto" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          B2B Commerce · Live Demo
        </span>
      </div>

      {/* The phone */}
      <div className="relative flex h-[100dvh] w-full max-w-[440px] flex-col overflow-hidden bg-canvas lg:h-[862px] lg:max-h-[92vh] lg:rounded-[2.6rem] lg:border-[7px] lg:border-[#0a2138] lg:shadow-phone">
        <TopBar />
        <main ref={mainRef} className="scroll-area relative flex-1 overscroll-contain">
          <Outlet />
        </main>
        <BottomNav />
        <Toaster />
      </div>
    </div>
  );
}
