"use client";

import * as React from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Bell,
  Pencil,
  Trash2,
  CircleCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientTableRow, type Client } from "@/components/client-table-row";
import {
  VerifyBenefitsDialog,
  type ScheduleInfo,
} from "@/components/verify-benefits-dialog";
import { BatchVerificationToast } from "@/components/batch-verification-toast";
import { ScheduledVerificationBanner } from "@/components/scheduled-verification-banner";
import { cn } from "@/lib/utils";

const SAMPLE_CLIENTS: Client[] = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  name: "John Smith",
  dob: "Jan 25, 1996",
  age: 30,
  status: "Ready" as const,
  upcomingApt: "Today @ 8 AM",
  location: "Rittenhouse Square",
  provider: "John Doe",
  insurance: "Cigna",
  insuranceId: "1234567890",
  coverage: "IOP/PHP",
  coverageDate: "Jan 25, 2026",
}));

export function ClientsPage() {
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(
    new Set(),
  );
  const [verifyDialogOpen, setVerifyDialogOpen] = React.useState(false);
  const [verificationToastOpen, setVerificationToastOpen] =
    React.useState(false);
  const [scheduledBanner, setScheduledBanner] =
    React.useState<ScheduleInfo | null>(null);

  const selectAll = selectedRows.size === SAMPLE_CLIENTS.length;
  const someSelected = selectedRows.size > 0;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(SAMPLE_CLIENTS.map((c) => c.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const handleClearSelection = () => {
    setSelectedRows(new Set());
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex h-12 items-center justify-between border-b border-border px-7 py-3">
        <h1 className="text-base font-medium text-foreground">Clients</h1>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>
      </header>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-6 overflow-hidden">
        {/* Toolbar */}
        <div className="flex min-w-0 flex-shrink-0 flex-nowrap items-center justify-between gap-4">
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="h-9 pl-9" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5">
                  <span className="text-xs">Filters</span>
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Filter by status</DropdownMenuItem>
                <DropdownMenuItem>Filter by location</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-muted-foreground">
              {SAMPLE_CLIENTS.length} Clients
            </span>
          </div>
          {someSelected ? (
            <div className="flex shrink-0 flex-nowrap items-center gap-3">
              <button
                type="button"
                onClick={handleClearSelection}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-3 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                <span>{selectedRows.size} Selected</span>
                <X className="h-4 w-4 text-background/70" />
              </button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-md"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 rounded-md"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-9 gap-2 rounded-md px-3"
                onClick={() => setVerifyDialogOpen(true)}
              >
                <CircleCheck className="h-4 w-4" />
                Verify
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-9 gap-2 rounded-md px-3"
                  >
                    More
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Bulk actions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex shrink-0 flex-nowrap items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9">
                    Action
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuItem>Bulk actions</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="h-9 gap-2">
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>
          )}
        </div>

        {scheduledBanner ? (
          <ScheduledVerificationBanner
            schedule={scheduledBanner}
            onClose={() => setScheduledBanner(null)}
          />
        ) : (
          <BatchVerificationToast
            open={verificationToastOpen}
            onClose={() => setVerificationToastOpen(false)}
            durationMs={10000}
          />
        )}

        {/* Table */}
        <div className="min-w-0 overflow-x-auto rounded-md border border-border">
          <div className="flex min-w-[900px] flex-col overflow-hidden">
            <ClientTableHeader
              selectAll={selectAll}
              someSelected={someSelected}
              onSelectAll={handleSelectAll}
            />
            <div className="flex flex-col">
              {SAMPLE_CLIENTS.map((client) => (
                <ClientTableRow
                  key={client.id}
                  client={client}
                  selected={selectedRows.has(client.id)}
                  onSelectRow={handleSelectRow}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 opacity-50"
              disabled
            >
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 opacity-50"
              disabled
            >
              <ChevronLeftIcon />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Page
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background text-sm text-muted-foreground">
              1
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              of 10
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronRightIcon />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>

      <VerifyBenefitsDialog
        open={verifyDialogOpen}
        onOpenChange={setVerifyDialogOpen}
        onSchedule={(schedule) => {
          if (schedule.startTime === "now") {
            setScheduledBanner(null);
            setVerificationToastOpen(true);
          } else {
            setVerificationToastOpen(false);
            setScheduledBanner(schedule);
          }
        }}
      />
    </div>
  );
}

const TABLE_GRID =
  "grid grid-cols-[32px_minmax(325px,1fr)_1fr_1fr_1fr_1fr_40px]";

function ClientTableHeader({
  selectAll,
  someSelected,
  onSelectAll,
}: {
  selectAll: boolean;
  someSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}) {
  return (
    <div
      className={cn(
        TABLE_GRID,
        "h-10 items-center border-b border-border bg-background",
      )}
    >
      <div className="flex items-center pl-2">
        <Checkbox
          id="select-all-checkbox"
          name="select-all-checkbox"
          className="h-4 w-4"
          checked={selectAll ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(checked) => onSelectAll(checked === true)}
        />
      </div>
      <div className="flex min-w-0 items-center gap-2 px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Client
        </span>
        <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 px-2">
        <span className="text-sm font-medium text-foreground">
          Upcoming Apt
        </span>
        <ChevronsUpDownIcon className="h-4 w-4 shrink-0" />
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Location / Provider
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Insurance
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Coverage
        </span>
      </div>
      <div className="flex w-10 items-center justify-center px-3" />
    </div>
  );
}

function ChevronsUpDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

function ChevronsLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m13 17 5-5-5-5" />
      <path d="m6 17 5-5-5-5" />
    </svg>
  );
}
