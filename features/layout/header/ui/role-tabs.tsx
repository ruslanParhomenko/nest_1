"use client";

import NavTabs from "@/components/nav-tabs/nav-tabs";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { ROLE_TABS } from "../model/constants";

export default function RoleTabs({ urlTab }: { urlTab: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const navItems = ROLE_TABS;

  const storageKey = `nav-tab-${pathname}`;

  useEffect(() => {
    if (!urlTab) return;

    const saved = localStorage.getItem(storageKey);

    if (!saved) return;

    if (urlTab === saved) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", saved);

    startTransition(() => {
      window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
    });
  }, [pathname, storageKey, urlTab]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(storageKey, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    window.history.replaceState(null, "", `${pathname}?${params.toString()}`);
  };

  if (!urlTab) return null;

  return (
    <NavTabs
      navItems={navItems}
      activeTab={urlTab}
      handleTabChange={handleTabChange}
      disabled={isPending}
    />
  );
}
