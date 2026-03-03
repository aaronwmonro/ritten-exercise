import { AppSidebar } from "@/components/app-sidebar";
import { ClientsPage } from "@/components/clients-table";

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-auto bg-background">
        <ClientsPage />
      </main>
    </div>
  );
}
