import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";

// Lazy load components
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const ManagerDashboard = lazy(
  () => import("./components/dashboard/ManagerDashboard"),
);
const CashierDashboard = lazy(
  () => import("./components/dashboard/CashierDashboard"),
);
const POSInterface = lazy(() => import("./components/pos/POSInterface"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<ManagerDashboard />} />
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/pos" element={<POSInterface />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
