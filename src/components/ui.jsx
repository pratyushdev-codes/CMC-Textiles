import { useEffect } from "react";
import * as Lucide from "lucide-react";
import { useStore } from "@/context/StoreProvider";
import { STATUS_STYLES, stageMeta } from "@/lib/constants";
import { colorByName } from "@/lib/constants";

// Dynamic lucide icon by name.
export function Icon({ name, ...props }) {
  const Cmp = Lucide[name] || Lucide.Circle;
  return <Cmp {...props} />;
}

export function StatusPill({ stageIndex, className = "" }) {
  const s = stageMeta(stageIndex);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLES[s.key]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {s.label}
    </span>
  );
}

export function Stat({ icon, label, value, sub }) {
  return (
    <div className="card flex-1 px-3.5 py-3">
      <div className="mb-1 flex items-center gap-1.5 text-brand-500">
        <Icon name={icon} size={15} />
        <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/45">
          {label}
        </span>
      </div>
      <div className="font-display text-xl font-700 leading-none text-ink">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-ink/45">{sub}</div>}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, action, onAction }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow && <div className="eyebrow mb-0.5">{eyebrow}</div>}
        <h2 className="font-display text-[17px] font-700 text-ink">{title}</h2>
      </div>
      {action && (
        <button
          onClick={onAction}
          className="shrink-0 text-[13px] font-semibold text-brand-500 hover:text-brand-600"
        >
          {action}
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = "Inbox", title, body, action, onAction }) {
  return (
    <div className="flex flex-col items-center px-8 py-14 text-center">
      <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-400">
        <Icon name={icon} size={28} />
      </div>
      <h3 className="font-display text-lg font-700 text-ink">{title}</h3>
      {body && <p className="mt-1.5 max-w-[24ch] text-sm text-ink/55">{body}</p>}
      {action && (
        <button onClick={onAction} className="btn-primary mt-5 px-5 py-2.5 text-sm">
          {action}
        </button>
      )}
    </div>
  );
}

export function QuantityStepper({ value, onChange, step = 1, min = 0, unit = "" }) {
  const set = (v) => onChange(Math.max(min, v));
  return (
    <div className="inline-flex items-center rounded-xl border border-line bg-white">
      <button
        type="button"
        onClick={() => set(value - step)}
        className="grid h-10 w-10 place-items-center text-ink/60 transition active:scale-90 disabled:opacity-30"
        disabled={value <= min}
        aria-label="Decrease"
      >
        <Lucide.Minus size={16} />
      </button>
      <div className="flex min-w-[84px] items-baseline justify-center gap-1 px-1">
        <input
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const n = parseInt(e.target.value.replace(/\D/g, ""), 10);
            set(Number.isNaN(n) ? min : n);
          }}
          className="w-[52px] bg-transparent text-center font-display text-base font-700 text-ink outline-none"
        />
        {unit && <span className="text-xs font-medium text-ink/45">{unit}</span>}
      </div>
      <button
        type="button"
        onClick={() => set(value + step)}
        className="grid h-10 w-10 place-items-center text-ink/60 transition active:scale-90"
        aria-label="Increase"
      >
        <Lucide.Plus size={16} />
      </button>
    </div>
  );
}

export function ColorSwatch({ name, selected, onClick, size = 34 }) {
  const c = colorByName(name);
  const light = ["#F4F5F7", "#EFE7D6", "#D9CDB6", "#B9C0CA", "#E0A6A6"].includes(c.hex);
  return (
    <button
      type="button"
      onClick={onClick}
      title={name}
      className={`relative grid place-items-center rounded-full transition active:scale-90 ${
        selected ? "ring-2 ring-brand-500 ring-offset-2" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <span
        className="block h-full w-full rounded-full"
        style={{
          background: c.hex,
          boxShadow: light ? "inset 0 0 0 1px rgba(11,46,79,0.14)" : "none",
        }}
      />
      {selected && (
        <Lucide.Check
          size={size > 30 ? 15 : 12}
          className="absolute"
          color={light ? "#0B2E4F" : "#fff"}
          strokeWidth={3}
        />
      )}
    </button>
  );
}

// Bottom sheet constrained to the app column width.
export function Sheet({ open, onClose, title, children, maxH = "76vh" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 animate-fade-in bg-ink/45 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div
          className="w-full max-w-[440px] animate-slide-up rounded-t-3xl bg-white shadow-sheet"
          style={{ maxHeight: maxH }}
        >
          <div className="flex items-center justify-between px-5 pb-2 pt-3">
            <div className="mx-auto h-1.5 w-10 rounded-full bg-line" />
          </div>
          {title && (
            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="font-display text-lg font-700 text-ink">{title}</h3>
              <button
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full bg-canvas text-ink/50"
              >
                <Lucide.X size={16} />
              </button>
            </div>
          )}
          <div className="scroll-area px-5 pb-6" style={{ maxHeight: `calc(${maxH} - 64px)` }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Toast stack — pinned to top of the app column.
export function Toaster() {
  const { toasts } = useStore();
  if (!toasts.length) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 top-3 z-[70] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex animate-toast-in items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          <Lucide.CheckCircle2 size={16} className="text-emerald-300" />
          {t.msg}
        </div>
      ))}
    </div>
  );
}
