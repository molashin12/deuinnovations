import React from "react";
import { useTheme } from "../ThemeContext";

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-[var(--deu-line)] py-10 mt-20 bg-[var(--deu-surface)]">
      <div className="deu-shell flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
            alt="DeuInnovation"
            className="h-8 w-auto shrink-0 object-contain"
          />
        </div>
        <span className="text-xs text-[var(--deu-ink-3)] font-mono tracking-wider">
          © 2026 DEUINNOVATION STUDIO. ALL BUILD RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
};
