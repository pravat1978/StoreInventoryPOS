import { RouteObject } from "react-router-dom";
import { lazy } from "react";

// Lazy load components
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const ManagerDashboard = lazy(
  () => import("./components/dashboard/ManagerDashboard"),
);
const CashierDashboard = lazy(
  () => import("./components/dashboard/CashierDashboard"),
);
const POSInterface = lazy(() => import("./components/pos/POSInterface"));
const InventoryPage = lazy(
  () => import("./components/inventory/InventoryPage"),
);
const OnboardingPage = lazy(
  () => import("./components/onboarding/OnboardingPage"),
);
const MasterDataPage = lazy(
  () => import("./components/masterdata/MasterDataPage"),
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <ManagerDashboard />,
  },
  {
    path: "/cashier",
    element: <CashierDashboard />,
  },
  {
    path: "/pos",
    element: <POSInterface />,
  },
  {
    path: "/inventory",
    element: <InventoryPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
  },
  {
    path: "/masterdata",
    element: <MasterDataPage />,
  },
];

export default routes;
