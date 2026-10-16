"use client";

import NavTabs from "@/components/nav-tabs/nav-tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { ROLE_TABS } from "../model/constants";

export default function RoleTabs({ urlTab }: { urlTab: string }) {
  const pathname = usePathname();
  const router = useRouter();
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
      router.replace(`${pathname}?${params.toString()}`);
    });
  }, [pathname, storageKey, urlTab]);

  const handleTabChange = (value: string) => {
    localStorage.setItem(storageKey, value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
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
