import { ReactNode } from "@mdx-js/react/lib";
import React from "react";
import usePrefersReducedMotion from "../hooks/reducedMotion";

export default function FlyList({ lines, className }: { lines: ReactNode[], className? : String }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <div className={"flex flex-col" + (className ?? "")}>
      {lines.map((word, index) => (
        <div key={index} className={`inline-block ${prefersReducedMotion ? "" : "animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards"}`} style={{animationDelay : prefersReducedMotion ? "none" : index * 100 + "ms"}}>{word}</div>))
        }
    </div>
  );
}
