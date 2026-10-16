import NavLink from "@/components/nav-layout/header-layout/nav-link";
import { FooterBar } from "@/features/layout/footer";
import HeaderBar from "@/features/layout/header/ui/header-bar";
import EditProviderWithSuspense from "@/provider/edit-provider";
import { Suspense } from "react";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditProviderWithSuspense>
      <header>
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderBar />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <NavLink />
        </Suspense>
      </header>
      <main className="flex flex-1 flex-col px-2 overflow-y-auto">
        {children}
      </main>
      <footer>
        <FooterBar />
      </footer>
    </EditProviderWithSuspense>
  );
}
