import { TooltipProvider } from "@/components/ui/tooltip";
import { FooterBar } from "@/features/layout/footer";
import EditProvider from "@/provider/edit-provider";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditProvider>
      <header></header>
      <main className="flex flex-col flex-1 items-center justify-center p-2">
        {children}
      </main>
      <footer>
        <FooterBar />
      </footer>
    </EditProvider>
  );
}
