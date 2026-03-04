"use client";

import Link from "next/link";
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

function SidebarIconButton({
  icon: Icon,
  active,
  href,
}: {
  icon: LucideIcon;
  active?: boolean;
  href?: string;
}) {
  const className = cn(
    "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
    active
      ? "bg-sidebar-border text-sidebar-accent-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon className="h-4 w-4" />
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function SidebarIconStrip({
  clientsActive = false,
}: {
  clientsActive?: boolean;
}) {
  return (
    <div className="flex w-12 flex-col items-center border-r border-sidebar-border bg-sidebar py-2">
      <Link
        href="/"
        className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
        </svg>
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        <SidebarIconButton icon={Home} href="/" />
        <SidebarIconButton icon={BookAudio} />
        <SidebarIconButton icon={Users} active={clientsActive} href="/" />
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
  );
}
