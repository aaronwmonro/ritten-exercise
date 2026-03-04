"use client";

import * as React from "react";
import {
  BadgeCheck,
  Download,
  Redo2,
  Pencil,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  TriangleAlert,
  MoreHorizontal,
  Search,
  ListFilter,
  Info,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface BatchRunReportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string | null;
}

const MOCK_ACTION_ITEMS = [
  {
    id: "1",
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Ineligible" as const,
    error:
      "Patient missing necessary info to run verification. ",
  },
  {
    id: "2",
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Error" as const,
    error:
      "Payer did not respond. Retry again or reached out. ",
  },
];

const MOCK_BATCH_CLIENTS = [
  {
    id: "1",
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Verified" as const,
    insurance: "Cigna, IOP/PHP",
    insuranceId: "ID: 1234567890",
    errorMessage: null,
  },
  {
    id: "2",
    name: "Jane Doe",
    dob: "Mar 15, 1988 (38)",
    status: "Unverified" as const,
    insurance: "Cigna, IOP/PHP",
    insuranceId: "ID: 1234567890",
    errorMessage: "Payer not responding. Manually Verify.",
  },
  {
    id: "3",
    name: "Alex Johnson",
    dob: "Nov 2, 1992 (33)",
    status: "Unverified" as const,
    insurance: "Aetna, Gold PPO",
    insuranceId: "ID: 9876543210",
    errorMessage: "Payer not responding. Manually Verify.",
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 4),
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Verified" as const,
    insurance: "Cigna, IOP/PHP",
    insuranceId: "ID: 1234567890",
    errorMessage: null as string | null,
  })),
];

export function BatchRunReportSheet({
  open,
  onOpenChange,
  scheduleId,
}: BatchRunReportSheetProps) {
  const [activeTab, setActiveTab] = React.useState<"report" | "clients">(
    "report",
  );

  React.useEffect(() => {
    if (open) setActiveTab("report");
  }, [open]);

  if (!scheduleId) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[800px] max-w-[100vw] flex-col gap-0 overflow-hidden p-0 sm:max-w-[800px]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 pl-6 pr-12 py-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">
                Batch Verify Benefits
              </span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Batch Run #0000
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Redo2 className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-2 border-b border-border px-4 pb-4 pt-0">
          <button
            type="button"
            onClick={() => setActiveTab("report")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "report"
                ? "bg-muted text-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            Report
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("clients")}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "clients"
                ? "bg-muted text-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            Clients
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {activeTab === "report" && (
            <div className="flex flex-col gap-8">
              {/* Results */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Results
                </h3>
                <div className="flex overflow-hidden rounded-md border border-input bg-card">
                  <div className="flex flex-1 flex-col gap-3 border-r border-border px-4 py-3">
                    <span className="text-xs font-medium text-muted-foreground">
                      Total Clients
                    </span>
                    <span className="text-xl text-muted-foreground">12</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 border-r border-border px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
                      <span className="text-xs font-medium text-green-700">
                        Verified
                      </span>
                    </div>
                    <span className="text-xl text-muted-foreground">10</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ThumbsDown className="h-3.5 w-3.5 text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-600">
                        Failed
                      </span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xl text-muted-foreground">2</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className="flex h-full w-full">
                    <div
                      className="bg-green-700"
                      style={{ width: "83.33%" }}
                    />
                    <div
                      className="bg-yellow-600"
                      style={{ width: "16.67%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Overview */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Overview
                </h3>
                <div className="flex flex-col gap-4 rounded-md border border-border px-4 py-3">
                  <div className="grid grid-cols-[80px_1fr] gap-8">
                    <span className="text-xs font-medium text-muted-foreground">
                      Status
                    </span>
                    <Badge variant="success" className="w-fit">
                      Completed
                    </Badge>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      Start
                    </span>
                    <span className="text-foreground">
                      Tuesday, March 3rd, 2026 @ 10:00 AM EST
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      End
                    </span>
                    <span className="text-foreground">
                      Tuesday, March 4th, 2026 @ 10:00 AM EST
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      Duration
                    </span>
                    <span className="text-foreground">
                      1 day, 3 hours, 23 minutes
                    </span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      Frequency
                    </span>
                    <span className="text-foreground">Repeat, Once Daily</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      Ends
                    </span>
                    <span className="text-foreground">Never</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
                    <span className="font-medium text-muted-foreground">
                      Next Run
                    </span>
                    <span className="text-foreground">
                      March 5th, 2026 @ 10:00 AM EST
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Action Items
                </h3>
                <div className="overflow-hidden rounded-md border border-border">
                  <div className="grid grid-cols-[225px_125px_1fr_40px] border-b border-border">
                    <div className="px-2 py-2.5">
                      <span className="text-sm font-medium text-muted-foreground">
                        Client
                      </span>
                    </div>
                    <div className="px-2 py-2.5">
                      <span className="text-sm font-medium text-muted-foreground">
                        Status
                      </span>
                    </div>
                    <div className="px-2 py-2.5">
                      <span className="text-sm font-medium text-muted-foreground">
                        Error
                      </span>
                    </div>
                    <div className="px-3 py-2.5" />
                  </div>
                  {MOCK_ACTION_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[225px_125px_1fr_40px] items-center border-b border-border last:border-b-0"
                    >
                      <div className="flex flex-col gap-0.5 px-2 py-2">
                        <span className="text-sm font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          DOB: {item.dob}
                        </span>
                      </div>
                      <div className="px-2 py-2">
                        <Badge
                          variant={
                            item.status === "Error" ? "warning" : "warning"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-2">
                        <TriangleAlert className="h-3 w-3 shrink-0 text-yellow-700" />
                        <span className="text-xs text-yellow-700">
                          {item.error}
                        </span>
                      </div>
                      <div className="flex items-center justify-center px-3 py-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Retry</DropdownMenuItem>
                            <DropdownMenuItem>View client</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "clients" && (
            <div className="flex flex-col gap-4">
              {/* Clients tab toolbar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-[300px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="h-9 pl-9"
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-9 gap-2">
                        <span className="text-xs">Filters</span>
                        <ListFilter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Filter by status</DropdownMenuItem>
                      <DropdownMenuItem>Filter by insurance</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>

              {/* Clients table */}
              <div className="overflow-hidden rounded-md border border-border">
                <div className="grid grid-cols-[225px_1fr_150px_40px] border-b border-border">
                  <div className="flex items-center gap-2 px-2 py-2.5">
                    <span className="text-sm font-medium text-muted-foreground">
                      Client
                    </span>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
                  </div>
                  <div className="flex items-center gap-2 px-2 py-2.5">
                    <span className="text-sm font-medium text-foreground">
                      Benefits Status
                    </span>
                    <ChevronsUpDown className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="flex items-center px-2 py-2.5">
                    <span className="text-sm font-medium text-muted-foreground">
                      Insurance
                    </span>
                  </div>
                  <div className="px-3 py-2.5" />
                </div>
                {MOCK_BATCH_CLIENTS.map((client) => (
                  <div
                    key={client.id}
                    className="grid grid-cols-[225px_1fr_150px_40px] items-center border-b border-border last:border-b-0"
                  >
                    <div className="flex flex-col gap-0.5 px-2 py-2">
                      <span className="text-sm font-medium text-foreground">
                        {client.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        DOB: {client.dob}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 px-2 py-2">
                      <Badge
                        variant={
                          client.status === "Verified" ? "success" : "warning"
                        }
                        className="w-fit gap-1.5"
                      >
                        {client.status === "Verified" ? (
                          <>
                            <ThumbsUp className="h-3 w-3" />
                            Verified
                          </>
                        ) : (
                          <>
                            <ThumbsDown className="h-3 w-3" />
                            Unverified
                          </>
                        )}
                      </Badge>
                      {client.errorMessage && (
                        <div className="flex items-center gap-1.5 pl-2">
                          <Info className="h-3 w-3 shrink-0 text-yellow-700" />
                          <span className="text-xs text-yellow-700">
                            {client.errorMessage}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 px-2 py-2">
                      <span className="text-xs font-semibold text-muted-foreground">
                        {client.insurance}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {client.insuranceId}
                      </span>
                    </div>
                    <div className="flex items-center justify-center px-3 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View client</DropdownMenuItem>
                          <DropdownMenuItem>Verify benefits</DropdownMenuItem>
                          <DropdownMenuItem>Retry</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
