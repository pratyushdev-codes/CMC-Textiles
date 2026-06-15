// Small formatting + id helpers.

export const inr = (n) =>
  "₹" +
  Number(n || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

// Compact currency for big numbers (e.g. ₹4.2L)
export const inrCompact = (n) => {
  const v = Number(n || 0);
  if (v >= 1e7) return "₹" + (v / 1e7).toFixed(2).replace(/\.00$/, "") + "Cr";
  if (v >= 1e5) return "₹" + (v / 1e5).toFixed(2).replace(/\.00$/, "") + "L";
  if (v >= 1e3) return "₹" + (v / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return inr(v);
};

export const qty = (n, unit) =>
  Number(n || 0).toLocaleString("en-IN") + " " + (unit || "");

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtDateTime = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export const relativeTime = (d) => {
  const diff = Date.now() - new Date(d).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  return fmtDate(d);
};

export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

let counter = 0;
export const uid = (prefix = "id") =>
  `${prefix}_${Date.now().toString(36)}${(counter++).toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;

// Human order number e.g. CMC-2406-0042
export const makeOrderNo = (seq) => {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `CMC-${yy}${mm}-${String(seq).padStart(4, "0")}`;
};

export const makeTrackingId = () =>
  "TRK-" + Math.random().toString(36).slice(2, 8).toUpperCase();
