import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import OverlayProvider from "./providers/OverlayProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactFlowProvider>
      <App />
      <OverlayProvider />
    </ReactFlowProvider>
  </StrictMode>
);
