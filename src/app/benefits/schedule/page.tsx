import { AppSidebar } from "@/components/app-sidebar";
import { BenefitsPage } from "@/components/insurance-plans-table";

export default function ScheduleRoute() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar activeSection="benefits" />
      <main className="flex flex-1 flex-col overflow-auto bg-background">
        <BenefitsPage defaultTab="Schedule" />
      </main>
    </div>
  );
}
