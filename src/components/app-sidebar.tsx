"use client";

import {
  Home,
  BookAudio,
  Users,
  Calendar,
  LineChart,
  Database,
  SquareCheckBig,
  Search,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarNavItems: { label: string; icon: LucideIcon; active?: boolean }[] =
  [
    { label: "Clients", icon: Users, active: true },
    { label: "Benefits", icon: BookAudio },
    { label: "Groups", icon: Users },
    { label: "Occupancy", icon: Calendar },
    { label: "Medication", icon: LineChart },
    { label: "Labs", icon: Database },
    { label: "", icon: SquareCheckBig },
  ];

export function AppSidebar() {
  return (
    <div className="flex h-screen w-[248px] shrink-0">
      {/* Narrow icon strip */}
      <div className="flex w-12 flex-col items-center border-r border-sidebar-border bg-sidebar py-2">
        <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg">
          <div className="flex h-5 w-5 items-center justify-center text-sidebar-foreground">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
            </svg>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          <SidebarIconButton icon={Home} />
          <SidebarIconButton icon={BookAudio} />
          <SidebarIconButton icon={Users} active />
          <SidebarIconButton icon={Calendar} />
          <SidebarIconButton icon={LineChart} />
          <SidebarIconButton icon={Database} />
          <SidebarIconButton icon={SquareCheckBig} />
        </nav>
        <div className="flex flex-col gap-1 pt-4">
          <SidebarIconButton icon={Search} />
          <SidebarIconButton icon={Settings} />
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <span className="text-xs font-medium text-sidebar-primary-foreground">
              AB
            </span>
          </div>
        </div>
      </div>

      {/* Main sidebar content */}
      <div className="flex w-[200px] flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-12 items-center border-b border-sidebar-border px-4">
          <h2 className="text-base font-medium text-foreground">Reports</h2>
        </div>
        <nav className="flex-1 p-2">
          <div className="flex flex-col gap-0.5">
            {sidebarNavItems.map((item) => (
              <SidebarNavItem key={item.label || item.icon.name} {...item} />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

function SidebarIconButton({
  icon: Icon,
  active,
}: {
  icon: LucideIcon;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
        active
          ? "bg-sidebar-border text-sidebar-accent-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function SidebarNavItem({
  label,
  active,
}: {
  label: string;
  icon: LucideIcon;
  active?: boolean;
}) {
  if (!label) return null;
  return (
    <button
      className={cn(
        "flex h-8 w-full items-center gap-2 rounded-md px-2 text-sm transition-colors",
        active
          ? "bg-sidebar-border font-medium text-sidebar-accent-foreground"
          : "font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      {label}
    </button>
  );
}
