import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

// Load all components to ensure they're available
import "./components/auth/LoginForm";
import "./components/dashboard/ManagerDashboard";
import "./components/dashboard/CashierDashboard";
import "./components/dashboard/MetricsPanel";
import "./components/dashboard/LimitedMetricsPanel";
import "./components/dashboard/AlertsPanel";
import "./components/dashboard/SalesChart";
import "./components/dashboard/PromotionsPreview";
import "./components/navigation/SideNav";
import "./components/navigation/CashierNav";
import "./components/pos/POSInterface";
import "./components/pos/ProductSearch";
import "./components/pos/ShoppingCart";
import "./components/pos/CheckoutPanel";
import "./components/pos/ReceiptGenerator";
import "./components/inventory/InventoryPage";
import "./components/inventory/InventoryTable";
import "./components/inventory/ProductForm";
import "./components/inventory/ProductDetails";
import "./components/inventory/RestockForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
