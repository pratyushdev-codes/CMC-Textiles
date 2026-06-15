import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { storage } from "@/lib/storage";
import { buildSeed } from "@/lib/seed";
import { productById, unitPriceFor } from "@/data/products";
import { STAGES } from "@/lib/constants";
import { addDays, makeOrderNo, makeTrackingId, uid } from "@/lib/format";

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const EMPTY_PROFILE = {
  company: "",
  contactName: "",
  email: "",
  phone: "",
  gstin: "",
  address: "",
};

function usePersistentState(key, initial) {
  const [val, setVal] = useState(() => storage.get(key, initial));
  useEffect(() => {
    storage.set(key, val);
  }, [key, val]);
  return [val, setVal];
}

export function StoreProvider({ children }) {
  // Seed only once, on a truly fresh browser.
  const seed = useMemo(() => (storage.get("seeded") ? null : buildSeed()), []);

  const [profile, setProfile] = usePersistentState("profile", seed?.profile ?? EMPTY_PROFILE);
  const [cart, setCart] = usePersistentState("cart", []);
  const [orders, setOrders] = usePersistentState("orders", seed?.orders ?? []);
  const [inquiries, setInquiries] = usePersistentState("inquiries", seed?.inquiries ?? []);
  const [favorites, setFavorites] = usePersistentState("favorites", seed?.favorites ?? []);
  const [notifications, setNotifications] = usePersistentState(
    "notifications",
    seed?.notifications ?? []
  );
  const [orderSeq, setOrderSeq] = usePersistentState("orderSeq", seed?.orderSeq ?? 1);

  useEffect(() => {
    if (seed) storage.set("seeded", true);
  }, [seed]);

  // ---- ephemeral toasts ----
  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((msg, tone = "success") => {
    const id = uid("t");
    setToasts((prev) => [...prev, { id, msg, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
  }, []);

  // ---- notifications ----
  const pushNotification = useCallback((n) => {
    setNotifications((prev) => [
      { id: uid("n"), time: new Date().toISOString(), read: false, ...n },
      ...prev,
    ]);
  }, [setNotifications]);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setNotifications]);

  // ---- cart ----
  const addToCart = useCallback(
    (item) => {
      setCart((prev) => [...prev, { ...item, lineId: uid("li") }]);
      pushToast("Added to cart");
    },
    [setCart, pushToast]
  );

  const updateLineQty = useCallback(
    (lineId, qty) => {
      setCart((prev) =>
        prev.map((it) =>
          it.lineId === lineId ? { ...it, qty, lineTotal: it.unitPrice * qty } : it
        )
      );
    },
    [setCart]
  );

  const removeLine = useCallback(
    (lineId) => setCart((prev) => prev.filter((it) => it.lineId !== lineId)),
    [setCart]
  );

  const clearCart = useCallback(() => setCart([]), [setCart]);

  // ---- orders ----
  const placeOrder = useCallback(
    ({ poNumber, deliveryTo, notes }) => {
      if (!cart.length) return null;
      const orderNo = makeOrderNo(orderSeq);
      const primary = cart[0];
      const subtotal = cart.reduce((s, it) => s + it.lineTotal, 0);
      const placedAt = new Date().toISOString();
      const maxLead = Math.max(...cart.map((it) => productById(it.productId)?.leadDays || 10));
      const order = {
        id: uid("ord"),
        orderNo,
        placedAt,
        stageIndex: 0,
        items: cart.map((it) => ({ ...it })),
        subtotal,
        gst: Math.round(subtotal * 0.05),
        poNumber: poNumber || "—",
        deliveryTo: deliveryTo || profile.address,
        notes: notes || "",
        consignment: {
          totalQty: cart.reduce((s, it) => s + it.qty, 0),
          unit: primary.unit,
          color: primary.color,
          spec:
            primary.specs.denier ||
            primary.specs.gsm ||
            primary.specs.tex ||
            primary.specs.size ||
            "—",
          trackingId: null,
          vehicle: null,
          dispatchDate: null,
          eta: addDays(placedAt, maxLead + 4),
          dock: "Inward Dock B",
        },
        history: { placed: placedAt },
      };
      setOrders((prev) => [order, ...prev]);
      setOrderSeq((s) => s + 1);
      setCart([]);
      pushNotification({
        title: "Order placed",
        body: `${orderNo} received. We’ll confirm specs & pricing shortly.`,
        orderId: order.id,
      });
      return order;
    },
    [cart, orderSeq, profile, setOrders, setOrderSeq, setCart, pushNotification]
  );

  // Demo helper — advance an order to its next production stage.
  const advanceOrder = useCallback(
    (orderId) => {
      setOrders((prev) => {
        const idx = prev.findIndex((o) => o.id === orderId);
        if (idx < 0) return prev;
        const o = prev[idx];
        if (o.stageIndex >= STAGES.length - 1) return prev;
        const next = o.stageIndex + 1;
        const stage = STAGES[next];
        const at = new Date().toISOString();
        const consignment = { ...o.consignment };
        if (next === 4) {
          consignment.trackingId = consignment.trackingId || makeTrackingId();
          consignment.vehicle =
            consignment.vehicle || "GJ-15-CT-" + Math.floor(1000 + Math.random() * 8999);
          consignment.dispatchDate = at;
        }
        const updated = {
          ...o,
          stageIndex: next,
          history: { ...o.history, [stage.key]: at },
          consignment,
        };
        const copy = prev.slice();
        copy[idx] = updated;
        setTimeout(
          () =>
            pushNotification({
              title: stage.label,
              body: `${o.orderNo} — ${stage.desc}.`,
              orderId,
            }),
          0
        );
        return copy;
      });
    },
    [setOrders, pushNotification]
  );

  const reorder = useCallback(
    (orderId) => {
      const o = orders.find((x) => x.id === orderId);
      if (!o) return;
      setCart((prev) => [...prev, ...o.items.map((it) => ({ ...it, lineId: uid("li") }))]);
      pushToast(`${o.items.length} item${o.items.length > 1 ? "s" : ""} added to cart`);
    },
    [orders, setCart, pushToast]
  );

  // ---- inquiries ----
  const addInquiry = useCallback(
    (payload) => {
      const inq = {
        id: uid("inq"),
        createdAt: new Date().toISOString(),
        status: "In review",
        ...payload,
      };
      setInquiries((prev) => [inq, ...prev]);
      pushNotification({
        title: "Enquiry received",
        body: `Our team will reach out about “${payload.productName || payload.typeLabel}”.`,
      });
      return inq;
    },
    [setInquiries, pushNotification]
  );

  // ---- favorites ----
  const toggleFavorite = useCallback(
    (id) =>
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    [setFavorites]
  );
  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const updateProfile = useCallback(
    (patch) => setProfile((prev) => ({ ...prev, ...patch })),
    [setProfile]
  );

  const resetDemo = useCallback(() => {
    storage.clearAll();
    window.location.reload();
  }, []);

  const cartCount = cart.length;
  const cartTotal = useMemo(() => cart.reduce((s, it) => s + it.lineTotal, 0), [cart]);
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const value = useMemo(
    () => ({
      profile,
      cart,
      orders,
      inquiries,
      favorites,
      notifications,
      toasts,
      cartCount,
      cartTotal,
      unreadCount,
      addToCart,
      updateLineQty,
      removeLine,
      clearCart,
      placeOrder,
      advanceOrder,
      reorder,
      addInquiry,
      toggleFavorite,
      isFavorite,
      updateProfile,
      pushNotification,
      markAllRead,
      pushToast,
      resetDemo,
    }),
    [
      profile,
      cart,
      orders,
      inquiries,
      favorites,
      notifications,
      toasts,
      cartCount,
      cartTotal,
      unreadCount,
      addToCart,
      updateLineQty,
      removeLine,
      clearCart,
      placeOrder,
      advanceOrder,
      reorder,
      addInquiry,
      toggleFavorite,
      isFavorite,
      updateProfile,
      pushNotification,
      markAllRead,
      pushToast,
      resetDemo,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
