import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreProvider";
import { Icon } from "@/components/ui";
import { INQUIRY_TYPES, COMPANY } from "@/lib/constants";
import { PRODUCTS, productById } from "@/data/products";

const CONTACT = ["Email", "Phone", "WhatsApp"];

export default function Inquiry() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addInquiry } = useStore();

  const [type, setType] = useState(state?.type || "quote");
  const [productId, setProductId] = useState(state?.productId || "");
  const [qtyText, setQtyText] = useState("");
  const [message, setMessage] = useState("");
  const [contactPref, setContactPref] = useState("Email");
  const [done, setDone] = useState(false);

  const typeLabel = INQUIRY_TYPES.find((t) => t.key === type)?.label;

  const submit = () => {
    const p = productId ? productById(productId) : null;
    addInquiry({
      type,
      typeLabel,
      productId: productId || null,
      productName: p?.name || null,
      qty: qtyText || "—",
      message: message.trim(),
      contactPref,
    });
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex flex-col items-center px-6 pt-16 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-500 animate-[scale-in_0.3s_ease]">
          <Icon name="CheckCircle2" size={40} />
        </div>
        <h1 className="mt-5 font-display text-[20px] font-700 text-ink">Enquiry sent</h1>
        <p className="mt-2 max-w-[30ch] text-[13.5px] leading-relaxed text-ink/60">
          Thanks — our team will reach out via <b>{contactPref}</b> shortly to take this forward.
          You can track replies under your notifications.
        </p>
        <div className="mt-7 flex w-full max-w-[300px] flex-col gap-2.5">
          <button onClick={() => navigate("/account")} className="btn-ghost w-full px-4 py-3 text-[14px]">
            View my enquiries
          </button>
          <button onClick={() => navigate("/")} className="btn-outline w-full px-4 py-3 text-[14px]">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 px-4 pb-28 pt-5">
      <p className="text-[13px] leading-relaxed text-ink/60">
        Tell us what you need. CMC Textile responds to B2B enquiries from {COMPANY.origin} with quotes,
        swatches and custom development.
      </p>

      {/* Type */}
      <div>
        <div className="label">What do you need?</div>
        <div className="grid grid-cols-1 gap-2">
          {INQUIRY_TYPES.map((t) => {
            const active = type === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition active:scale-[0.99] ${
                  active ? "border-brand-500 bg-brand-50" : "border-line bg-white"
                }`}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-full border-2 ${active ? "border-brand-500" : "border-line"}`}>
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />}
                </span>
                <span className={`text-[14px] font-semibold ${active ? "text-brand-700" : "text-ink/75"}`}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product */}
      <div>
        <label className="label">Related product (optional)</label>
        <div className="relative">
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className="field appearance-none pr-10">
            <option value="">No specific product</option>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <Icon name="ChevronDown" size={18} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40" />
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="label">Approx. quantity / requirement</label>
        <input
          value={qtyText}
          onChange={(e) => setQtyText(e.target.value)}
          placeholder="e.g. 2,000 kg / month, or swatch card"
          className="field"
        />
      </div>

      {/* Message */}
      <div>
        <label className="label">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Share specs, colours, deniers, GSM, target price or timelines…"
          className="field resize-none"
        />
      </div>

      {/* Contact pref */}
      <div>
        <div className="label">Preferred contact</div>
        <div className="flex gap-2">
          {CONTACT.map((c) => (
            <button
              key={c}
              onClick={() => setContactPref(c)}
              className={`flex-1 rounded-xl border py-2.5 text-[13px] font-semibold transition active:scale-95 ${
                contactPref === c ? "border-brand-500 bg-brand-500 text-white" : "border-line bg-white text-ink/65"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="sticky bottom-0 z-20 -mx-4 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md">
        <button onClick={submit} className="btn-primary w-full px-4 py-3.5 text-[15px]">
          <Icon name="Send" size={17} /> Submit enquiry
        </button>
      </div>
    </div>
  );
}
