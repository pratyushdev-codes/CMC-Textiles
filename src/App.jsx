import { Routes, Route, Navigate } from "react-router-dom";
import AppShell from "@/components/AppShell";

import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Inquiry from "@/pages/Inquiry";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {/* Tab roots */}
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Profile />} />

        {/* Pushed routes */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
