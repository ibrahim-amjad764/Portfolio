"use client";

import { Toaster } from "sonner";
import { useApp } from "../lib/AppContext";

export default function ThemeToaster() {
  const { theme } = useApp();

  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      theme={theme}
      toastOptions={{
        style: {
          background: "var(--portfolio-card)",
          border: "1px solid var(--portfolio-border)",
          color: "var(--portfolio-text)",
        },
      }}
    />
  );
}
