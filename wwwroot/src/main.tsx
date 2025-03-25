import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { SnackbarProvider } from "./components/Snackbar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>,
);
