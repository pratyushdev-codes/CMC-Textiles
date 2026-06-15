// Shared domain constants for the CMC Textile B2B app.

// ---- Dye color palette (reused as data only — yarn/fabric swatches) ----
export const COLORS = [
  { name: "Optic White", hex: "#F4F5F7" },
  { name: "Ivory", hex: "#EFE7D6" },
  { name: "Greige", hex: "#D9CDB6" },
  { name: "Silver", hex: "#B9C0CA" },
  { name: "Charcoal", hex: "#4A515C" },
  { name: "Jet Black", hex: "#1A1A1A" },
  { name: "Navy", hex: "#16335B" },
  { name: "Royal Blue", hex: "#1F62E0" },
  { name: "Teal", hex: "#1F8A8A" },
  { name: "Basil", hex: "#5E8C3C" },
  { name: "Forest", hex: "#2F6B3A" },
  { name: "Mustard", hex: "#E2A019" },
  { name: "Rust", hex: "#B5561E" },
  { name: "Dusky Red", hex: "#A8423C" },
  { name: "Burgundy", hex: "#6E1E2B" },
  { name: "Blush", hex: "#E0A6A6" },
  { name: "Lavender", hex: "#8E86C4" },
];

export const colorByName = (name) =>
  COLORS.find((c) => c.name === name) || { name, hex: "#9aa4b2" };

// ---- Category metadata ----
// dot = accent used for the small category indicator (drawn from brand spectrum)
export const CATEGORIES = [
  { slug: "texturised-yarn", name: "Texturised Yarn", short: "DTY", dot: "#1F62E0", icon: "Cable" },
  { slug: "air-texturised-yarn", name: "Air-Texturised Yarn", short: "ATY", dot: "#1F8A8A", icon: "Wind" },
  { slug: "roto-yarn", name: "Roto Yarn", short: "Roto", dot: "#D9651E", icon: "Disc" },
  { slug: "fdy-twisted", name: "FDY / Twisted", short: "FDY", dot: "#E2A019", icon: "Sparkles" },
  { slug: "warp-knitted", name: "Warp-Knitted Fabric", short: "Knit", dot: "#4F8C3A", icon: "Grid2x2" },
  { slug: "ticking-fabric", name: "Mattress Ticking", short: "Ticking", dot: "#6E1E2B", icon: "BedDouble" },
  { slug: "upholstery", name: "Upholstery Fabric", short: "Uphol.", dot: "#8E86C4", icon: "Sofa" },
  { slug: "pillow-covers", name: "Pillow Covers", short: "Pillow", dot: "#C0392B", icon: "Square" },
  { slug: "threads", name: "Sewing Threads", short: "Thread", dot: "#16335B", icon: "Scissors" },
];

export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);

// ---- Applications / end-uses (browse by use-case) ----
export const APPLICATIONS = [
  { key: "mattress", label: "Mattress", icon: "BedDouble" },
  { key: "apparel", label: "Apparel", icon: "Shirt" },
  { key: "home", label: "Home Textile", icon: "Home" },
  { key: "automotive", label: "Automotive", icon: "Car" },
  { key: "industrial", label: "Industrial", icon: "Factory" },
  { key: "footwear", label: "Footwear", icon: "Footprints" },
];

// ---- Order production timeline (the signature tracker) ----
export const STAGES = [
  { key: "placed", label: "Order Placed", desc: "Purchase order received", icon: "FileCheck2" },
  { key: "confirmed", label: "Confirmed", desc: "Specs & pricing locked", icon: "BadgeCheck" },
  { key: "production", label: "In Production", desc: "Texturising / knitting line", icon: "Factory" },
  { key: "qc", label: "Quality Check", desc: "Lab parameters verified", icon: "ScanLine" },
  { key: "dispatched", label: "Dispatched", desc: "Packed & invoiced", icon: "PackageCheck" },
  { key: "transit", label: "In Transit", desc: "On the way to your dock", icon: "Truck" },
  { key: "delivered", label: "Delivered", desc: "Received at destination", icon: "Home" },
];

export const stageMeta = (index) => STAGES[Math.max(0, Math.min(index, STAGES.length - 1))];

// Status pill styling per stage index
export const STATUS_STYLES = {
  placed: "bg-slate-100 text-slate-600",
  confirmed: "bg-brand-50 text-brand-600",
  production: "bg-amber-50 text-amber-700",
  qc: "bg-violet-50 text-violet-700",
  dispatched: "bg-sky-50 text-sky-700",
  transit: "bg-indigo-50 text-indigo-700",
  delivered: "bg-emerald-50 text-emerald-700",
};

export const INQUIRY_TYPES = [
  { key: "quote", label: "Request a Quote (RFQ)" },
  { key: "sample", label: "Request Samples" },
  { key: "custom", label: "Custom Development" },
  { key: "general", label: "General Enquiry" },
];

export const COMPANY = {
  name: "CMC Textile",
  group: "CMC Group",
  since: 1999,
  origin: "Daman, India",
  capacityMT: 700, // yarn, monthly
  knitMT: 800, // warp-knitted fabric, monthly
  helpline: "+91 90000 00000",
  email: "sales@cmctextile.com",
};
