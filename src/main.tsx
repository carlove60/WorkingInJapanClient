import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <DialogsProvider>
        <App />
      </DialogsProvider>
    </Provider>
  </StrictMode>,
);
