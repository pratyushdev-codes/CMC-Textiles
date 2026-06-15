import { STAGES } from "@/lib/constants";
import { Icon } from "@/components/ui";
import { fmtDateTime } from "@/lib/format";

export default function Timeline({ order }) {
  const current = order.stageIndex;

  return (
    <div className="relative">
      {STAGES.map((stage, i) => {
        const done = i < current;
        const isCurrent = i === current;
        const reached = i <= current;
        const last = i === STAGES.length - 1;
        const ts = order.history?.[stage.key];

        return (
          <div key={stage.key} className="relative flex gap-3.5">
            {/* Rail */}
            <div className="relative flex w-9 flex-col items-center">
              <div
                className={`relative z-10 grid h-9 w-9 place-items-center rounded-full transition ${
                  reached
                    ? "bg-brand-500 text-white shadow-[0_4px_12px_-4px_rgba(31,98,224,0.6)]"
                    : "border-2 border-line bg-white text-ink/30"
                }`}
              >
                {isCurrent && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/40" />
                )}
                <Icon name={done ? "Check" : stage.icon} size={done ? 18 : 16} strokeWidth={done ? 3 : 2} />
              </div>

              {!last && (
                <div className="relative -mt-0.5 w-[2.5px] flex-1 overflow-hidden rounded-full bg-line">
                  {i < current && (
                    <span className="absolute inset-0 origin-top rounded-full bg-brand-500 animate-[thread-fill_500ms_ease_forwards]" />
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 ${last ? "pb-0" : "pb-5"}`}>
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-display text-[14.5px] font-700 ${
                    reached ? "text-ink" : "text-ink/40"
                  }`}
                >
                  {stage.label}
                </span>
                {isCurrent && (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-600">
                    Now
                  </span>
                )}
              </div>
              <p className={`mt-0.5 text-[12px] leading-snug ${reached ? "text-ink/55" : "text-ink/35"}`}>
                {stage.desc}
              </p>
              <span className="mt-1 block text-[11px] font-medium text-ink/40">
                {ts ? fmtDateTime(ts) : "Pending"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
