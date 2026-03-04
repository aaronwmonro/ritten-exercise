"use client";

import * as React from "react";
import {
  Search,
  ListFilter,
  ChevronsUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_HISTORY_ITEMS, type HistoryItem } from "@/lib/mock-history";
import { cn } from "@/lib/utils";
import { BatchRunReportSheet } from "./batch-run-report-sheet";

const HISTORY_SUB_TABS = ["All", "Batches", "Individuals"] as const;
type HistorySubTab = (typeof HISTORY_SUB_TABS)[number];

const HISTORY_TABLE_GRID =
  "grid grid-cols-[minmax(200px,200px)_125px_175px_125px_125px_1fr_40px]";

function HistoryTableHeader() {
  return (
    <div
      className={cn(
        HISTORY_TABLE_GRID,
        "h-10 items-center border-b border-border bg-background",
      )}
    >
      <div className="flex min-w-0 items-center gap-2 px-2">
        <span className="text-sm font-medium text-foreground">Name</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">Type</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">
          Date / Time
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">Status</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">
          Frequency
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Results
        </span>
      </div>
      <div className="flex w-10 items-center justify-center px-2" />
    </div>
  );
}

function HistoryTableRow({
  item,
  onViewReport,
}: {
  item: HistoryItem;
  onViewReport?: (id: string) => void;
}) {
  const isBatch = item.type === "Batch";
  const isFailed = item.status === "Failed";
  const isClickable = isBatch && !isFailed && onViewReport;

  return (
    <div
      className={cn(
        HISTORY_TABLE_GRID,
        "min-h-[72px] items-center border-b border-border last:border-b-0",
      )}
    >
      <div className="flex min-w-0 items-center gap-3 py-2 pl-3 pr-2">
        {isClickable ? (
          <button
            type="button"
            onClick={() => onViewReport?.(item.id)}
            className="cursor-pointer truncate text-left text-sm font-medium text-foreground hover:underline focus:outline-none focus:underline"
          >
            {item.name}
          </button>
        ) : (
          <span className="truncate text-sm font-medium text-foreground">
            {item.name}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2 p-2">
        <Badge
          variant={isBatch ? "default" : "secondary"}
          className="shrink-0"
        >
          {item.type}
        </Badge>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 p-2">
        <span className="text-xs font-semibold text-muted-foreground">
          {item.date}
        </span>
        <span className="text-xs text-muted-foreground">{item.time}</span>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2 p-2">
        <Badge
          variant={isFailed ? "destructive" : "success"}
          className="shrink-0"
        >
          {item.status}
        </Badge>
      </div>
      <div className="flex min-w-0 flex-col justify-center p-2">
        <span className="text-xs text-muted-foreground">{item.frequency}</span>
      </div>
      <div className="flex min-w-0 items-center gap-1.5 p-2">
        {item.errorMessage ? (
          <div className="flex items-center gap-2">
            <Info className="h-3.5 w-3.5 shrink-0 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              {item.errorMessage}
            </span>
          </div>
        ) : item.results ? (
          <>
            <span className="text-sm font-medium text-green-700">
              {item.results.verified}
            </span>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium text-yellow-700">
              {item.results.failed}
            </span>
          </>
        ) : null}
      </div>
      <div className="flex w-10 items-center justify-center px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {isClickable && (
              <DropdownMenuItem onClick={() => onViewReport?.(item.id)}>
                View report
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>Retry</DropdownMenuItem>
            <DropdownMenuItem>More options</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function filterBySubTab(
  items: HistoryItem[],
  subTab: HistorySubTab,
): HistoryItem[] {
  if (subTab === "All") return items;
  if (subTab === "Batches")
    return items.filter((i) => i.type === "Batch");
  return items.filter((i) => i.type === "Individual");
}

export function HistoryTab() {
  const [subTab, setSubTab] = React.useState<HistorySubTab>("All");
  const [selectedRunId, setSelectedRunId] = React.useState<string | null>(null);
  const [reportOpen, setReportOpen] = React.useState(false);

  const filteredItems = React.useMemo(
    () => filterBySubTab(MOCK_HISTORY_ITEMS, subTab),
    [subTab],
  );

  const handleViewReport = (id: string) => {
    setSelectedRunId(id);
    setReportOpen(true);
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden px-6 pb-4 pt-6">
      {/* Toolbar with sub-tabs */}
      <div className="flex min-w-0 flex-shrink-0 flex-nowrap items-center justify-between gap-4">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="flex h-9 items-center rounded-lg bg-muted p-0.5">
            {HISTORY_SUB_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSubTab(tab)}
                className={cn(
                  "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                  tab === subTab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-foreground hover:text-foreground/80",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="h-9 pl-9" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-foreground" />
                <span className="text-xs">Filters</span>
                <ListFilter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Filter by type</DropdownMenuItem>
              <DropdownMenuItem>Filter by status</DropdownMenuItem>
              <DropdownMenuItem>Filter by trigger</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 flex-1 overflow-x-auto rounded-md border border-border">
        <div className="flex min-w-[1200px] flex-col overflow-hidden">
          <HistoryTableHeader />
          <div className="flex flex-col">
            {filteredItems.map((item) => (
              <HistoryTableRow
                key={item.id}
                item={item}
                onViewReport={item.type === "Batch" ? handleViewReport : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex shrink-0 items-center justify-center gap-8">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 opacity-50"
            disabled
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 opacity-50"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
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
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BatchRunReportSheet
        open={reportOpen}
        onOpenChange={setReportOpen}
        scheduleId={selectedRunId}
      />
    </div>
  );
}
