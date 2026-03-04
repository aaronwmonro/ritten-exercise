"use client";

import * as React from "react";
import {
  Search,
  ListFilter,
  Plus,
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
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
import { MOCK_SCHEDULES, type Schedule } from "@/lib/mock-schedules";
import { cn } from "@/lib/utils";
import { ScheduleModal } from "./schedule-modal";
import {
  VerifyBenefitsDialog,
  type ScheduleInfo,
} from "./verify-benefits-dialog";
import { BatchVerificationToast } from "./batch-verification-toast";
import { ScheduledVerificationBanner } from "./scheduled-verification-banner";

const SCHEDULE_TABLE_GRID =
  "grid grid-cols-[minmax(250px,250px)_125px_175px_175px_125px_1fr_1fr_40px]";

function ScheduleTableHeader() {
  return (
    <div
      className={cn(
        SCHEDULE_TABLE_GRID,
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
          Previous
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">Next</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">
          Trigger
        </span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Results
        </span>
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">Scope</span>
      </div>
      <div className="flex w-10 items-center justify-center px-2" />
    </div>
  );
}

function ScheduleTableRow({
  schedule,
  onEdit,
}: {
  schedule: Schedule;
  onEdit?: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        SCHEDULE_TABLE_GRID,
        "min-h-[72px] items-center border-b border-border last:border-b-0",
      )}
    >
      <div className="flex min-w-0 items-center gap-3 py-2 pl-3 pr-2">
        <button
          type="button"
          onClick={() => onEdit?.(schedule.id)}
          className="truncate text-left text-sm font-medium text-foreground hover:underline focus:outline-none focus:underline"
        >
          {schedule.name}
        </button>
        <Badge
          variant={schedule.status === "Active" ? "success" : "secondary"}
          className="shrink-0"
        >
          {schedule.status}
        </Badge>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2 p-2">
        <Badge
          variant={schedule.type === "Batch" ? "default" : "secondary"}
          className="shrink-0"
        >
          {schedule.type}
        </Badge>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 p-2">
        {schedule.previousRun ? (
          <>
            <span className="text-xs font-semibold text-muted-foreground">
              {schedule.previousRun.date}
            </span>
            <span className="text-xs text-muted-foreground">
              {schedule.previousRun.time}
            </span>
          </>
        ) : (
          <>
            <span className="text-xs font-semibold text-muted-foreground">
              –
            </span>
            <span className="text-xs text-muted-foreground">–</span>
          </>
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 p-2">
        <span className="text-xs font-semibold text-muted-foreground">
          {schedule.nextRun.date}
        </span>
        <span className="text-xs text-muted-foreground">
          {schedule.nextRun.time}
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1 p-2">
        <span className="text-xs font-semibold text-muted-foreground">
          {schedule.trigger}
        </span>
        <span className="text-xs text-muted-foreground">
          {schedule.triggerDetail}
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-1.5 p-2">
        <span className="text-sm font-medium text-green-700">
          {schedule.results.verified}
        </span>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-medium text-yellow-700">
          {schedule.results.failed}
        </span>
      </div>
      <div className="flex min-w-0 items-center p-2">
        <span className="text-xs text-muted-foreground">{schedule.scope}</span>
      </div>
      <div className="flex w-10 items-center justify-center px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(schedule.id)}>
              Edit schedule
            </DropdownMenuItem>
            <DropdownMenuItem>Pause</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function SchedulesTab() {
  const [scheduleModalOpen, setScheduleModalOpen] = React.useState(false);
  const [editingScheduleId, setEditingScheduleId] = React.useState<
    string | null
  >(null);
  const [verifyDialogOpen, setVerifyDialogOpen] = React.useState(false);
  const [verificationToastOpen, setVerificationToastOpen] =
    React.useState(false);
  const [scheduledBanner, setScheduledBanner] =
    React.useState<ScheduleInfo | null>(null);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden px-6 pb-4 pt-6">
      {/* Toolbar */}
      <div className="flex min-w-0 flex-shrink-0 flex-nowrap items-center justify-between gap-4">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
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
        <Button
          variant="outline"
          className="h-9 gap-2"
          onClick={() => setVerifyDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
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
      <div className="min-w-0 flex-1 overflow-x-auto rounded-md border border-border">
        <div className="flex min-w-[1200px] flex-col overflow-hidden">
          <ScheduleTableHeader />
          <div className="flex flex-col">
            {MOCK_SCHEDULES.map((schedule) => (
              <ScheduleTableRow
                key={schedule.id}
                schedule={schedule}
                onEdit={(id) => {
                  setEditingScheduleId(id);
                  setScheduleModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex shrink-0 items-center justify-center gap-8">
        <div className="flex items-center gap-2">
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
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        scheduleId={editingScheduleId}
      />
      <VerifyBenefitsDialog
        open={verifyDialogOpen}
        onOpenChange={setVerifyDialogOpen}
        initialStep={1}
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
