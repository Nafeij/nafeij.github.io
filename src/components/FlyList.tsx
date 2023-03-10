import { ReactNode } from "@mdx-js/react/lib";
import React from "react";

export default function FlyList({ lines, className }: { lines: ReactNode[], className? : String }) {
  return (
    <div className={"flex flex-col" + (className ?? "")}>
      {lines.map((word, index) => (
        <div key={index} className="inline-block animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards" style={{animationDelay : index * 100 + "ms"}}>{word}</div>))
        }
    </div>
  );
}
