"use client";
import { getFormIdFromPathname } from "@/utils/get-form-id";
import { usePathname } from "next/navigation";

export function useFormId(): string {
  const pathname = usePathname();
  return getFormIdFromPathname(pathname);
}
