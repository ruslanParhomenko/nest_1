"use client";

import { useEffect } from "react";

export function Warmup() {
  useEffect(() => {
    fetch("/api/warmup", {
      method: "GET",
      cache: "no-store",
    }).catch(() => {});
  }, []);

  return null;
}
