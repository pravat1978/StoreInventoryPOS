import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import tempoRoutes from "tempo-routes";
import appRoutes from "./routes";

function App() {
  const routes = useRoutes(appRoutes);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      {routes}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
    </Suspense>
  );
}

export default App;
