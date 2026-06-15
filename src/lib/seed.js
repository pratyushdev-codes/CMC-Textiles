// First-run demo data so the app feels populated during a pitch.
import { productById, unitPriceFor } from "@/data/products";
import { STAGES } from "@/lib/constants";
import { addDays, makeOrderNo, makeTrackingId, uid } from "@/lib/format";

const now = Date.now();
const daysAgo = (d) => new Date(now - d * 86400000).toISOString();

// Build an order item from a product id + chosen specs/color/qty.
function lineItem(productId, specs, color, qtyVal) {
  const p = productById(productId);
  const unitPrice = unitPriceFor(p, color);
  return {
    lineId: uid("li"),
    productId: p.id,
    sku: p.sku,
    name: p.name,
    texture: p.texture,
    accent: p.accent,
    unit: p.unit,
    specs,
    color,
    qty: qtyVal,
    unitPrice,
    lineTotal: unitPrice * qtyVal,
  };
}

// Build history timestamps for completed stages, spaced between placed & now.
function history(placedAt, stageIndex) {
  const start = new Date(placedAt).getTime();
  const span = now - start;
  const out = {};
  for (let i = 0; i <= stageIndex; i++) {
    const t = start + (span * i) / Math.max(1, stageIndex + 0.5);
    out[STAGES[i].key] = new Date(t).toISOString();
  }
  return out;
}

function buildOrder({ orderNo, placedAt, stageIndex, items, poNumber, dispatchOffset, etaOffset, vehicle }) {
  const primary = items[0];
  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  return {
    id: uid("ord"),
    orderNo,
    placedAt,
    stageIndex,
    items,
    subtotal,
    gst: Math.round(subtotal * 0.05),
    poNumber,
    deliveryTo: "Plant 2, Survey 114, Sarigam GIDC, Valsad, Gujarat 396155",
    consignment: {
      totalQty: items.reduce((s, it) => s + it.qty, 0),
      unit: primary.unit,
      color: primary.color,
      spec:
        primary.specs.denier ||
        primary.specs.gsm ||
        primary.specs.tex ||
        primary.specs.size ||
        "—",
      trackingId: stageIndex >= 4 ? makeTrackingId() : null,
      vehicle: stageIndex >= 4 ? vehicle : null,
      dispatchDate: stageIndex >= 4 ? addDays(placedAt, dispatchOffset) : null,
      eta: addDays(placedAt, etaOffset),
      dock: "Inward Dock B",
    },
    history: history(placedAt, stageIndex),
  };
}

export function buildSeed() {
  const profile = {
    company: "Serene Sleep Industries Pvt. Ltd.",
    contactName: "Procurement Desk",
    email: "buying@serenesleep.in",
    phone: "+91 98250 11223",
    gstin: "24AABCS1429K1Z7",
    address: "Plant 2, Survey 114, Sarigam GIDC, Valsad, Gujarat 396155",
  };

  const o1 = buildOrder({
    orderNo: makeOrderNo(1),
    placedAt: daysAgo(6),
    stageIndex: 2, // In Production
    poNumber: "SSI/PO/2406/118",
    etaOffset: 18,
    dispatchOffset: 12,
    vehicle: "GJ-15-CT-4421",
    items: [
      lineItem(
        "p-jacquard-ticking",
        { structure: "Jacquard Double Jersey", fibre: "Tencel™ Blend", gsm: "340 GSM" },
        "Navy",
        1200
      ),
    ],
  });

  const o2 = buildOrder({
    orderNo: makeOrderNo(2),
    placedAt: daysAgo(12),
    stageIndex: 5, // In Transit
    poNumber: "SSI/PO/2405/097",
    etaOffset: 14,
    dispatchOffset: 9,
    vehicle: "GJ-01-DT-7780",
    items: [
      lineItem(
        "p-silky-dty",
        { denier: "150D", finish: "Semi-Dull", composition: "100% Polyester", intermingle: "Intermingled" },
        "Royal Blue",
        2500
      ),
    ],
  });

  const o3 = buildOrder({
    orderNo: makeOrderNo(3),
    placedAt: daysAgo(26),
    stageIndex: 6, // Delivered
    poNumber: "SSI/PO/2405/061",
    etaOffset: 16,
    dispatchOffset: 11,
    vehicle: "GJ-15-AA-1190",
    items: [
      lineItem("p-roto", { denier: "300D", finish: "Bright" }, "Teal", 1500),
    ],
  });

  const orders = [o1, o2, o3];

  const notifications = [
    {
      id: uid("n"),
      time: o2.history[STAGES[5].key],
      title: "Consignment in transit",
      body: `${o2.orderNo} dispatched · ${o2.consignment.vehicle}. ETA shown in tracking.`,
      orderId: o2.id,
      read: false,
    },
    {
      id: uid("n"),
      time: o1.history[STAGES[2].key],
      title: "Production started",
      body: `${o1.orderNo} is on the knitting line — Jacquard Double Jersey, Navy.`,
      orderId: o1.id,
      read: false,
    },
    {
      id: uid("n"),
      time: o3.history[STAGES[6].key],
      title: "Delivered",
      body: `${o3.orderNo} received at your dock. Reorder in one tap.`,
      orderId: o3.id,
      read: true,
    },
  ];

  const inquiries = [
    {
      id: uid("inq"),
      type: "sample",
      productId: "p-jacquard-ticking",
      productName: "Jacquard Mattress Ticking",
      qty: "Swatch card",
      message: "Please send the Tencel™ blend swatch set in Navy and Teal for approval.",
      contactPref: "Email",
      status: "In review",
      createdAt: daysAgo(3),
    },
  ];

  return {
    profile,
    orders,
    inquiries,
    notifications,
    favorites: ["p-silky-dty", "p-warp-greige", "p-spun-thread"],
    orderSeq: 4,
    seeded: true,
  };
}
