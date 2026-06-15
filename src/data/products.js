// CMC Textile catalog — modelled on the real CMC range.
// Each product carries spec groups the buyer configures before ordering.
// `texture` drives the generated SVG swatch; `accent` tints it.

const FINISH = ["Semi-Dull", "Bright", "Full Dull"];
const INTERMINGLE = ["Intermingled", "Non-Intermingled"];
const POLY = ["100% Polyester", "Polyester / Nylon", "Cationic"];
const TICKING_FIBRE = [
  "Polyester",
  "Poly / Cotton",
  "Poly / Viscose",
  "Tencel™ Blend",
  "Bamboo Blend",
  "Organic Cotton",
];
const FABRIC_STRUCT = ["Jacquard Double Jersey", "Spacer 3D", "Velour", "Single Jersey"];

const FULL = [
  "Optic White", "Ivory", "Greige", "Silver", "Charcoal", "Jet Black",
  "Navy", "Royal Blue", "Teal", "Basil", "Forest", "Mustard",
  "Rust", "Dusky Red", "Burgundy", "Blush", "Lavender",
];
const GREIGE = ["Optic White", "Greige", "Ivory", "Silver", "Charcoal"];
const CORE = ["Optic White", "Navy", "Royal Blue", "Teal", "Charcoal", "Burgundy", "Mustard", "Basil"];

const denier = (...d) => ({ key: "denier", label: "Denier", options: d });
const gsm = (...g) => ({ key: "gsm", label: "GSM", options: g });
const finish = { key: "finish", label: "Finish", options: FINISH };
const comp = (options = POLY) => ({ key: "composition", label: "Composition", options });
const inter = { key: "intermingle", label: "Intermingling", options: INTERMINGLE };

export const PRODUCTS = [
  // ---------------- Texturised Yarn (DTY) ----------------
  {
    id: "p-silky-dty",
    sku: "DTY-SLK",
    name: "Silky DTY Yarn",
    categorySlug: "texturised-yarn",
    texture: "yarn",
    accent: "#1F62E0",
    blurb: "Smooth semi-dull drawn-textured yarn with a soft silk-like hand.",
    description:
      "Our flagship draw-textured yarn, produced on high-speed texturising machines with computerised quality control on every parameter. Even dyeing, consistent crimp and a silky surface make it a default choice for mattress tickings and apparel knits.",
    unit: "kg",
    basePrice: 168,
    moq: 100,
    leadDays: 10,
    applications: ["mattress", "apparel", "home"],
    badges: ["QC Monitored", "Custom Dyeable", "Intermingled"],
    colors: FULL,
    specOptions: [denier("75D", "100D", "150D", "300D", "600D"), finish, comp(), inter],
    featured: true,
    popular: true,
  },
  {
    id: "p-melange-dty",
    sku: "DTY-MEL",
    name: "Melange DTY Yarn",
    categorySlug: "texturised-yarn",
    texture: "yarn",
    accent: "#5E8C3C",
    blurb: "Heather-melange effect from blended dope-dyed filaments.",
    description:
      "A melange yarn that brings a two-tone heathered look without post-dyeing. Excellent colour fastness and a natural, marled aesthetic favoured for home textiles and casual apparel.",
    unit: "kg",
    basePrice: 192,
    moq: 100,
    leadDays: 12,
    applications: ["apparel", "home"],
    badges: ["QC Monitored", "Space-Dyed"],
    colors: ["Greige", "Silver", "Charcoal", "Navy", "Teal", "Basil", "Burgundy"],
    specOptions: [denier("150D", "300D", "600D"), finish, comp()],
    popular: true,
  },
  {
    id: "p-dms",
    sku: "DTY-DMS",
    name: "DMS Set Yarn",
    categorySlug: "texturised-yarn",
    texture: "yarn",
    accent: "#1F8A8A",
    blurb: "Draw-mixed-set yarn engineered for stable, low-shrink knits.",
    description:
      "Draw-mixed-set (DMS) yarn delivering dimensional stability and uniform package build. A dependable body yarn for warp-knitting and circular knits.",
    unit: "kg",
    basePrice: 174,
    moq: 150,
    leadDays: 11,
    applications: ["home", "apparel", "industrial"],
    badges: ["QC Monitored", "High-Tenacity"],
    colors: CORE,
    specOptions: [denier("150D", "300D", "450D"), finish, inter],
  },
  {
    id: "p-blackberry",
    sku: "DTY-BBY",
    name: "Blackberry Fancy Yarn",
    categorySlug: "texturised-yarn",
    texture: "yarn",
    accent: "#6E1E2B",
    blurb: "Textured fancy yarn with a pebbled, berry-like surface.",
    description:
      "A character yarn with a knotted, pebbled surface that adds depth and grip to fabrics. Popular for statement upholstery and fashion knits.",
    unit: "kg",
    basePrice: 226,
    moq: 80,
    leadDays: 14,
    applications: ["apparel", "home"],
    badges: ["Custom Dyeable"],
    colors: ["Burgundy", "Dusky Red", "Forest", "Navy", "Charcoal", "Mustard"],
    specOptions: [denier("300D", "600D"), finish],
  },

  // ---------------- Air-Texturised Yarn (ATY) ----------------
  {
    id: "p-poly-slub",
    sku: "ATY-SLB",
    name: "Polyester Slub ATY",
    categorySlug: "air-texturised-yarn",
    texture: "yarn",
    accent: "#D9651E",
    blurb: "Air-jet slub yarn giving a natural linen-like irregularity.",
    description:
      "Air-texturised polyester with engineered slubs and thick-thin sections that read as linen. Produced across 150–600D for woven and knitted home textiles.",
    unit: "kg",
    basePrice: 184,
    moq: 120,
    leadDays: 12,
    applications: ["home", "apparel"],
    badges: ["QC Monitored", "Custom Dyeable"],
    colors: FULL,
    specOptions: [
      denier("150D", "300D", "600D", "900D"),
      { key: "effect", label: "Effect", options: ["Slub", "Thick-Thin", "Injecta Slub"] },
      finish,
    ],
    featured: true,
  },
  {
    id: "p-grindle",
    sku: "ATY-GRN",
    name: "Grindle ATY",
    categorySlug: "air-texturised-yarn",
    texture: "yarn",
    accent: "#4F8C3A",
    blurb: "Two-ply grindle with a salt-and-pepper colour mix.",
    description:
      "A grindle air-texturised yarn combining two shades for a speckled, denim-adjacent look. Robust and forgiving in high-volume weaving.",
    unit: "kg",
    basePrice: 196,
    moq: 120,
    leadDays: 13,
    applications: ["home", "apparel"],
    badges: ["QC Monitored"],
    colors: ["Charcoal", "Navy", "Silver", "Forest", "Burgundy"],
    specOptions: [denier("300D", "600D"), { key: "effect", label: "Effect", options: ["Grindle"] }],
  },
  {
    id: "p-multicolour-aty",
    sku: "ATY-MLT",
    name: "Multi-Colour ATY",
    categorySlug: "air-texturised-yarn",
    texture: "roto",
    accent: "#C0392B",
    blurb: "Space-dyed air-texturised yarn with rhythmic colour repeats.",
    description:
      "Multi-colour space-dyed ATY that paints repeating colour stories straight from the cone — no jacquard required. A favourite for decorative home furnishings.",
    unit: "kg",
    basePrice: 232,
    moq: 100,
    leadDays: 14,
    applications: ["home"],
    badges: ["Space-Dyed", "Custom Dyeable"],
    colors: ["Royal Blue", "Teal", "Mustard", "Rust", "Burgundy", "Lavender"],
    specOptions: [denier("300D", "600D")],
  },
  {
    id: "p-nylon-aty",
    sku: "ATY-NYL",
    name: "Nylon ATY",
    categorySlug: "air-texturised-yarn",
    texture: "yarn",
    accent: "#16335B",
    blurb: "High-abrasion nylon air-textured yarn for tough end-uses.",
    description:
      "Nylon air-texturised yarn prized for abrasion resistance and recovery. Specified where durability matters — bags, technical trims and performance knits.",
    unit: "kg",
    basePrice: 268,
    moq: 100,
    leadDays: 15,
    applications: ["industrial", "apparel", "footwear"],
    badges: ["High-Tenacity", "QC Monitored"],
    colors: CORE,
    specOptions: [denier("210D", "420D", "630D"), comp(["100% Nylon", "Nylon / Spandex"])],
  },

  // ---------------- Roto Yarn ----------------
  {
    id: "p-roto",
    sku: "ROT-PLY",
    name: "Polyester Roto Yarn",
    categorySlug: "roto-yarn",
    texture: "roto",
    accent: "#D9651E",
    blurb: "Strong, vividly coloured roto yarn at value pricing.",
    description:
      "A wide, colourful range of polyester roto yarn used to build high-quality fabrics. Known for strength and consistent shade, packed in protective high-grade polythene.",
    unit: "kg",
    basePrice: 142,
    moq: 150,
    leadDays: 9,
    applications: ["home", "apparel", "industrial"],
    badges: ["QC Monitored", "Custom Dyeable"],
    colors: FULL,
    specOptions: [denier("150D", "300D", "600D"), finish],
    popular: true,
  },

  // ---------------- FDY / Twisted ----------------
  {
    id: "p-fdy-bright",
    sku: "FDY-BRT",
    name: "FDY Bright Twisted",
    categorySlug: "fdy-twisted",
    texture: "yarn",
    accent: "#E2A019",
    blurb: "Lustrous fully-drawn yarn, twisted for weaving warp.",
    description:
      "Bright fully-drawn yarn, twisted for stable warp performance and a clean lustre. Available white, dyed and dope-dyed for fade-resistant colour.",
    unit: "kg",
    basePrice: 158,
    moq: 150,
    leadDays: 10,
    applications: ["apparel", "home"],
    badges: ["QC Monitored", "Custom Dyeable"],
    colors: FULL,
    specOptions: [
      denier("50D", "75D", "150D"),
      { key: "luster", label: "Lustre", options: ["Bright", "Dope-Dyed"] },
    ],
  },
  {
    id: "p-kota",
    sku: "FDY-KTA",
    name: "Kota Saree Yarn",
    categorySlug: "fdy-twisted",
    texture: "yarn",
    accent: "#8E86C4",
    blurb: "Fine twisted yarn engineered for traditional Kota weaves.",
    description:
      "A fine, even twisted yarn developed specifically for Kota Doria sarees, balancing translucency with the strength weaving demands.",
    unit: "kg",
    basePrice: 214,
    moq: 60,
    leadDays: 16,
    applications: ["apparel"],
    badges: ["Custom Dyeable"],
    colors: ["Optic White", "Ivory", "Blush", "Lavender", "Teal", "Mustard"],
    specOptions: [denier("30D", "50D")],
  },

  // ---------------- Warp-Knitted Fabric ----------------
  {
    id: "p-warp-greige",
    sku: "WKF-GRG",
    name: "Warp-Knit Greige Fabric",
    categorySlug: "warp-knitted",
    texture: "knit",
    accent: "#4F8C3A",
    blurb: "Karl Mayer knitted greige — ready for your print or dye.",
    description:
      "Knitted on imported Karl Mayer machines, supplied greige so you control the print or dye. From decorative drapery to technical substrates, it adapts across home and industrial use.",
    unit: "m",
    basePrice: 64,
    moq: 500,
    leadDays: 12,
    applications: ["home", "automotive", "apparel", "industrial"],
    badges: ["Karl Mayer Knit", "QC Monitored"],
    colors: GREIGE,
    specOptions: [
      gsm("120 GSM", "160 GSM", "220 GSM"),
      { key: "width", label: "Width", options: ['58"', '72"', '96"'] },
      { key: "structure", label: "Structure", options: ["Tricot", "Raschel", "Mesh"] },
    ],
    featured: true,
  },
  {
    id: "p-mosquito-net",
    sku: "WKF-NET",
    name: "Warp-Knit Mosquito Net",
    categorySlug: "warp-knitted",
    texture: "knit",
    accent: "#1F8A8A",
    blurb: "Light, dimensionally stable knitted netting.",
    description:
      "A fine knitted mesh with consistent hole geometry and good tear strength — used for mosquito nets, laundry bags and aquarium nets.",
    unit: "m",
    basePrice: 38,
    moq: 800,
    leadDays: 10,
    applications: ["home", "industrial"],
    badges: ["QC Monitored"],
    colors: ["Optic White", "Greige", "Royal Blue", "Forest"],
    specOptions: [gsm("45 GSM", "60 GSM"), { key: "mesh", label: "Mesh", options: ["Fine", "Medium"] }],
  },
  {
    id: "p-auto-liner",
    sku: "WKF-AUT",
    name: "Automotive Knit Liner",
    categorySlug: "warp-knitted",
    texture: "knit",
    accent: "#16335B",
    blurb: "Backing-ready knit for headrests, sun-shades & liners.",
    description:
      "A knitted liner engineered for automotive interiors — headrest lining, sun-shades and laminating substrates, with stable hand for PU/PVC backing.",
    unit: "m",
    basePrice: 92,
    moq: 600,
    leadDays: 15,
    applications: ["automotive", "industrial"],
    badges: ["High-Tenacity", "QC Monitored"],
    colors: ["Charcoal", "Jet Black", "Silver", "Navy"],
    specOptions: [gsm("180 GSM", "240 GSM"), { key: "backing", label: "Backing", options: ["Greige", "PU-Ready"] }],
  },

  // ---------------- Mattress Ticking ----------------
  {
    id: "p-jacquard-ticking",
    sku: "TCK-JAC",
    name: "Jacquard Mattress Ticking",
    categorySlug: "ticking-fabric",
    texture: "jacquard",
    accent: "#6E1E2B",
    blurb: "Knitted jacquard ticking with a premium, breathable face.",
    description:
      "Our specialist knitted mattress ticking — yarn preparation, knitting, dyeing and finishing under one roof. Choose natural and high-comfort fibres for a restful, breathable sleep surface in jacquard, spacer or velour structures.",
    unit: "m",
    basePrice: 148,
    moq: 400,
    leadDays: 14,
    applications: ["mattress", "home"],
    badges: ["Eco Fibre Option", "QC Monitored", "Custom Dyeable"],
    colors: ["Optic White", "Ivory", "Silver", "Navy", "Teal", "Charcoal", "Burgundy"],
    specOptions: [
      { key: "structure", label: "Structure", options: FABRIC_STRUCT },
      { key: "fibre", label: "Fibre", options: TICKING_FIBRE },
      gsm("280 GSM", "340 GSM", "420 GSM"),
    ],
    featured: true,
    popular: true,
  },
  {
    id: "p-spacer-ticking",
    sku: "TCK-SPC",
    name: "3D Spacer Ticking",
    categorySlug: "ticking-fabric",
    texture: "jacquard",
    accent: "#1F8A8A",
    blurb: "Airy 3D spacer for breathable, pressure-relieving tops.",
    description:
      "A 3D spacer ticking that adds loft and airflow to mattress and pillow tops, improving breathability and pressure distribution.",
    unit: "m",
    basePrice: 196,
    moq: 300,
    leadDays: 16,
    applications: ["mattress"],
    badges: ["Eco Fibre Option", "QC Monitored"],
    colors: ["Optic White", "Silver", "Navy", "Teal"],
    specOptions: [
      { key: "fibre", label: "Fibre", options: ["Polyester", "Poly / Viscose", "Tencel™ Blend"] },
      gsm("380 GSM", "460 GSM"),
    ],
  },

  // ---------------- Upholstery ----------------
  {
    id: "p-upholstery",
    sku: "UPH-WVE",
    name: "Upholstery Weave",
    categorySlug: "upholstery",
    texture: "weave",
    accent: "#8E86C4",
    blurb: "Hard-wearing furnishing weave with a luxe drape.",
    description:
      "A durable upholstery fabric balancing a luxurious drape with the abrasion resistance furniture demands. Equally at home on sofas and decorative cushions.",
    unit: "m",
    basePrice: 178,
    moq: 200,
    leadDays: 13,
    applications: ["home", "automotive"],
    badges: ["High-Tenacity", "Custom Dyeable"],
    colors: ["Charcoal", "Navy", "Teal", "Burgundy", "Forest", "Silver", "Mustard"],
    specOptions: [gsm("240 GSM", "300 GSM", "360 GSM"), { key: "weave", label: "Weave", options: ["Twill", "Dobby", "Plain"] }],
  },

  // ---------------- Pillow Covers ----------------
  {
    id: "p-pillow",
    sku: "PIL-KNT",
    name: "Knit Pillow Cover",
    categorySlug: "pillow-covers",
    texture: "jacquard",
    accent: "#C0392B",
    blurb: "Soft knitted covers that finish a sleep set beautifully.",
    description:
      "Stylish, soft knitted pillow covers that complement our mattress tickings and lift any bedroom set. Supplied finished and ready to fill.",
    unit: "pc",
    basePrice: 86,
    moq: 200,
    leadDays: 12,
    applications: ["mattress", "home"],
    badges: ["Eco Fibre Option"],
    colors: ["Optic White", "Ivory", "Silver", "Navy", "Teal", "Blush", "Lavender"],
    specOptions: [
      { key: "size", label: "Size", options: ['17×27"', '20×26"', '20×30"'] },
      { key: "fibre", label: "Fibre", options: ["Polyester", "Poly / Cotton", "Bamboo Blend"] },
    ],
  },

  // ---------------- Threads ----------------
  {
    id: "p-spun-thread",
    sku: "THR-SPN",
    name: "Spun Polyester Thread",
    categorySlug: "threads",
    texture: "thread",
    accent: "#16335B",
    blurb: "All-purpose sewing thread, even and lint-light.",
    description:
      "Strong, durable spun polyester sewing thread with a smooth, lint-light finish for clean stitch formation across apparel and home textiles.",
    unit: "cone",
    basePrice: 64,
    moq: 100,
    leadDays: 7,
    applications: ["apparel", "home", "industrial"],
    badges: ["QC Monitored", "Custom Dyeable"],
    colors: FULL,
    specOptions: [
      { key: "tex", label: "Count", options: ["20s/2", "30s/2", "40s/2", "60s/3"] },
      { key: "length", label: "Cone", options: ["5000 m", "10000 m"] },
    ],
  },
  {
    id: "p-ht-thread",
    sku: "THR-HTN",
    name: "High-Tenacity Thread",
    categorySlug: "threads",
    texture: "thread",
    accent: "#B5561E",
    blurb: "Bonded high-tenacity thread for load-bearing seams.",
    description:
      "A bonded high-tenacity thread for demanding seams in footwear, bags and industrial goods — high strength with reliable needle performance.",
    unit: "cone",
    basePrice: 118,
    moq: 80,
    leadDays: 9,
    applications: ["footwear", "industrial", "automotive"],
    badges: ["High-Tenacity"],
    colors: ["Jet Black", "Charcoal", "Navy", "Rust", "Optic White"],
    specOptions: [
      { key: "tex", label: "Ticket", options: ["Tkt 40", "Tkt 20", "Tkt 10"] },
      { key: "length", label: "Cone", options: ["2500 m", "5000 m"] },
    ],
  },
];

export const productById = (id) => PRODUCTS.find((p) => p.id === id);
export const productsByCategory = (slug) => PRODUCTS.filter((p) => p.categorySlug === slug);
export const featuredProducts = () => PRODUCTS.filter((p) => p.featured);
export const popularProducts = () => PRODUCTS.filter((p) => p.popular);

// Default spec object for a product (first option of each group)
export const defaultSpecs = (product) =>
  product.specOptions.reduce((acc, g) => {
    acc[g.key] = g.options[0];
    return acc;
  }, {});

// Pricing: base per-unit + small surcharge for dyed (non-greige) colours.
export const unitPriceFor = (product, color) => {
  const greige = ["Optic White", "Greige", "Ivory"];
  const dyed = color && !greige.includes(color);
  return Math.round(product.basePrice * (dyed ? 1.08 : 1));
};
