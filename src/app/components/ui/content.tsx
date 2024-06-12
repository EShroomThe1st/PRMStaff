import React from "react";

export default function Content({ children }: { children: React.ReactNode }) {
  return (
      <main className="h-full bg-white">{children}</main>
  );
}
