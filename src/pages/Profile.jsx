import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Icon } from "@/components/ui";
import { COMPANY, INQUIRY_TYPES } from "@/lib/constants";
import { fmtDate } from "@/lib/format";

const FIELDS = [
  { key: "company", label: "Company name" },
  { key: "contactName", label: "Contact person" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone" },
  { key: "gstin", label: "GSTIN" },
  { key: "address", label: "Address", area: true },
];

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, inquiries, favorites, resetDemo } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const save = () => {
    updateProfile(draft);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-5 px-4 pb-10 pt-5">
      {/* Identity */}
      <div className="flex items-center gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 font-display text-[20px] font-700 text-white">
          {(profile.company || "C").slice(0, 1)}
        </div>
        <div className="min-w-0">
          <h1 className="line-clamp-1 font-display text-[18px] font-700 text-ink">{profile.company}</h1>
          <p className="text-[12.5px] text-ink/55">{profile.contactName}</p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-2.5">
        <LinkCard icon="Heart" label="Saved items" sub={`${favorites.length} products`} onClick={() => navigate("/favorites")} />
        <LinkCard icon="Package" label="My orders" sub="Track consignments" onClick={() => navigate("/orders")} />
      </div>

      {/* Business profile */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="font-display text-[14px] font-700 text-ink">Business profile</span>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              <Icon name="Pencil" size={14} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={cancel} className="text-[13px] font-semibold text-ink/45">Cancel</button>
              <button onClick={save} className="text-[13px] font-700 text-brand-600">Save</button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="divide-y divide-line">
            {FIELDS.map((f) => (
              <div key={f.key} className="flex items-start justify-between gap-4 px-4 py-2.5">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-ink/40">{f.label}</span>
                <span className={`max-w-[60%] text-right text-[13px] text-ink ${f.key === "gstin" ? "font-mono" : "font-medium"}`}>
                  {profile[f.key]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                {f.area ? (
                  <textarea
                    rows={2}
                    value={draft[f.key] || ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="field resize-none"
                  />
                ) : (
                  <input
                    type={f.type || "text"}
                    value={draft[f.key] || ""}
                    onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                    className="field"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enquiries */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display text-[15px] font-700 text-ink">My enquiries</span>
          <button onClick={() => navigate("/inquiry")} className="text-[13px] font-semibold text-brand-600">
            New
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div className="card px-4 py-6 text-center text-[13px] text-ink/50">
            No enquiries yet. Raise an RFQ or request samples.
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {inquiries.map((q) => {
              const label = q.typeLabel || INQUIRY_TYPES.find((t) => t.key === q.type)?.label || "Enquiry";
              return (
                <div key={q.id} className="card p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[13px] font-700 text-ink">
                      <Icon name="MessageSquare" size={14} className="text-brand-500" />
                      {label}
                    </span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10.5px] font-bold text-amber-700">
                      {q.status}
                    </span>
                  </div>
                  {q.productName && (
                    <div className="mt-1 text-[12px] font-medium text-ink/60">{q.productName}</div>
                  )}
                  {q.message && <p className="mt-1 line-clamp-2 text-[12px] text-ink/55">{q.message}</p>}
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-ink/40">
                    <span>{fmtDate(q.createdAt)}</span>
                    {q.qty && q.qty !== "—" && <span>· {q.qty}</span>}
                    <span>· via {q.contactPref || "Email"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Company info */}
      <div className="card p-4">
        <div className="eyebrow mb-2">About the supplier</div>
        <div className="font-display text-[15px] font-700 text-ink">{COMPANY.name}</div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink/60">
          Part of {COMPANY.group}. Manufacturing knitted mattress fabrics, texturised &amp; air-texturised
          yarns, roto yarn, warp-knitted fabric, ticking, upholstery and threads since {COMPANY.since}.
        </p>
        <div className="mt-3 flex flex-col gap-2">
          <a href={`tel:${COMPANY.helpline}`} className="flex items-center gap-2.5 text-[13px] text-ink/70">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name="Phone" size={15} />
            </span>
            {COMPANY.helpline}
          </a>
          <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-[13px] text-ink/70">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-50 text-brand-600">
              <Icon name="Mail" size={15} />
            </span>
            {COMPANY.email}
          </a>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetDemo}
        className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-white py-3 text-[13px] font-semibold text-ink/55 transition active:scale-[0.99] hover:text-rose-500"
      >
        <Icon name="RotateCcw" size={15} /> Reset demo data
      </button>

      <p className="pb-2 text-center text-[11px] text-ink/35">
        CMC Textile · B2B Commerce Demo · Data stored locally on this device
      </p>
    </div>
  );
}

function LinkCard({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} className="card flex items-center gap-3 p-3.5 text-left transition active:scale-[0.98]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon name={icon} size={19} />
      </span>
      <div className="min-w-0">
        <div className="text-[13.5px] font-700 text-ink">{label}</div>
        <div className="truncate text-[11px] text-ink/50">{sub}</div>
      </div>
    </button>
  );
}
