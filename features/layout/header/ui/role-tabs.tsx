"use client";

import NavTabs from "@/components/nav-tabs/nav-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ROLE_TABS } from "../model/constants";

export default function RoleTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab");

  const [isPending, startTransition] = useTransition();

  const navItems = ROLE_TABS;

  const storageKey = `nav-tab-${pathname}`;
  const currentTab = urlTab ?? "";

  const handleTabChange = (value: string) => {
    localStorage.setItem(storageKey, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <NavTabs
      navItems={navItems}
      activeTab={currentTab}
      handleTabChange={handleTabChange}
      disabled={isPending}
    />
  );
}
