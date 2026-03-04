"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const TABLE_GRID =
  "grid grid-cols-[32px_minmax(325px,1fr)_1fr_1fr_1fr_1fr_40px]";

import type { Client } from "@/lib/mock-clients";

export function ClientTableRow({
  client,
  selected,
  onSelectRow,
}: {
  client: Client;
  selected: boolean;
  onSelectRow: (id: number, checked: boolean) => void;
}) {
  const router = useRouter();

  const handleViewClient = () => {
    router.push(`/clients/${client.id}`);
  };

  return (
    <div
      className={cn(
        TABLE_GRID,
        "h-[72px] items-center border-b border-border last:border-b-0 transition-colors",
        selected && "bg-muted",
      )}
      data-state={selected ? "selected" : undefined}
    >
      <div className="flex items-center pl-2">
        <Checkbox
          id={`row-${client.id}-checkbox`}
          name={`row-${client.id}-checkbox`}
          className="h-4 w-4"
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectRow(client.id, checked === true)
          }
        />
      </div>
      <div className="flex min-w-0 items-center gap-3 p-2">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-muted">
          <span className="text-xs font-medium text-muted-foreground">
            {client.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleViewClient}
              className="truncate text-left text-sm font-medium text-foreground hover:underline focus:outline-none focus:underline"
            >
              {client.name}
            </button>
            <Badge variant="success" className="shrink-0 text-xs font-semibold">
              {client.status}
            </Badge>
          </div>
          <span className="truncate text-xs text-muted-foreground">
            DOB: {client.dob} ({client.age})
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 items-center p-2">
        <span className="truncate text-sm text-accent-foreground">
          {client.upcomingApt}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-2">
        <span className="truncate text-xs font-semibold text-muted-foreground">
          {client.location}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {client.provider}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-2">
        <span className="truncate text-xs font-semibold text-muted-foreground">
          {client.insurance}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          ID: {client.insuranceId}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-2">
        <span className="truncate text-xs font-semibold text-muted-foreground">
          {client.coverage}
        </span>
        <div className="flex items-center gap-1">
          <BadgeCheckIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate text-xs text-muted-foreground">
            {client.coverageDate}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleViewClient}>
              View client
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function BadgeCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
