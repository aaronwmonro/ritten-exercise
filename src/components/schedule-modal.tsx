"use client";

import * as React from "react";
import {
  BadgeCheck,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  TriangleAlert,
  MoreHorizontal,
  Search,
  ListFilter,
  ChevronsUpDown,
  ChevronDown,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const SCHEDULE_MODAL_TABS = [
  "Overview",
  "Settings",
  "Clients",
  "History",
] as const;
type ScheduleModalTab = (typeof SCHEDULE_MODAL_TABS)[number];

const MOCK_ACTION_ITEMS = [
  {
    id: "1",
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Ineligible" as const,
    error: "Patient missing necessary info to run verification.",
  },
  {
    id: "2",
    name: "John Smith",
    dob: "Jan 25, 1996 (30)",
    status: "Error" as const,
    error: "Payer did not respond. Retry again or reached out.",
  },
];

const MOCK_SCHEDULE_CLIENTS = [
  {
    id: "1",
    name: "John Smith",
    eligibility: "Eligible" as const,
    insurance: "Cigna Health",
    provider: "John Doe",
  },
  {
    id: "2",
    name: "John Smith",
    eligibility: "Ineligible" as const,
    insurance: "Cigna Health",
    provider: "John Doe",
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 3),
    name: "John Smith",
    eligibility: "Eligible" as const,
    insurance: "Cigna Health",
    provider: "John Doe",
  })),
];

const MOCK_SCHEDULE_HISTORY = [
  {
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as const,
    verified: 12,
    failed: 2,
  },
  {
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as const,
    verified: 12,
    failed: 2,
  },
  {
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as const,
    verified: 12,
    failed: 2,
  },
  {
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as const,
    verified: 12,
    failed: 2,
  },
  {
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as const,
    verified: 12,
    failed: 2,
  },
];

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheduleId: string | null;
}

function OverviewTab() {
  return (
    <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-foreground">Overview</h3>
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
            <span className="font-medium text-muted-foreground">Start</span>
            <span className="text-foreground">
              Tuesday, March 3rd, 2026 @ 10:00 AM EST
            </span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
            <span className="font-medium text-muted-foreground">End</span>
            <span className="text-foreground">
              Tuesday, March 4th, 2026 @ 10:00 AM EST
            </span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
            <span className="font-medium text-muted-foreground">Duration</span>
            <span className="text-foreground">1 day, 3 hours, 23 minutes</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
            <span className="font-medium text-muted-foreground">Frequency</span>
            <span className="text-foreground">Repeat, Once Daily</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
            <span className="font-medium text-muted-foreground">Ends</span>
            <span className="text-foreground">Never</span>
          </div>
          <div className="grid grid-cols-[80px_1fr] gap-8 text-xs">
            <span className="font-medium text-muted-foreground">Next Run</span>
            <span className="text-foreground">
              March 5th, 2026 @ 10:00 AM EST
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-foreground">
          Latest Results
        </h3>
        <div className="flex flex-col gap-4">
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
              <span className="text-xl text-muted-foreground">3</span>
            </div>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="flex h-full w-full">
              <div className="bg-green-700" style={{ width: "83.33%" }} />
              <div className="bg-yellow-600" style={{ width: "16.67%" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Action Items</h3>
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
                <Badge variant="warning">{item.status}</Badge>
              </div>
              <div className="flex items-center gap-2 px-2 py-2">
                <TriangleAlert className="h-3 w-3 shrink-0 text-yellow-700" />
                <span className="text-xs text-yellow-700">{item.error}</span>
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
  );
}

function SettingsTab() {
  const [repeat, setRepeat] = React.useState(true);
  const [trigger, setTrigger] = React.useState<"time" | "event">("time");
  const [everyValue, setEveryValue] = React.useState("1");
  const [everyUnit, setEveryUnit] = React.useState("days");
  const [endType, setEndType] = React.useState<"never" | "date">("never");
  const [completionEmail, setCompletionEmail] = React.useState(true);
  const [completionSms, setCompletionSms] = React.useState(true);
  const [completionApp, setCompletionApp] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(true);
  const [errorSms, setErrorSms] = React.useState(true);
  const [errorApp, setErrorApp] = React.useState(false);

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-y-auto p-6">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="schedule-name"
          className="text-sm font-medium text-foreground"
        >
          Name
        </Label>
        <Input
          id="schedule-name"
          placeholder="Ex. Cigna Clients List..."
          className="h-9"
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <h3 className="text-base font-semibold text-foreground">Frequency</h3>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="repeat-switch"
              className="text-sm font-medium text-foreground"
            >
              Repeat
            </Label>
            <Switch
              id="repeat-switch"
              checked={repeat}
              onCheckedChange={setRepeat}
            />
          </div>

          {repeat && (
            <>
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Trigger
                </Label>
                <RadioGroup
                  value={trigger}
                  onValueChange={(v) => setTrigger(v as "time" | "event")}
                  className="flex gap-2"
                >
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      trigger === "time"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="time" id="trigger-time" />
                    <span
                      className={cn(
                        "text-xs",
                        trigger === "time" ? "font-semibold" : "font-normal",
                      )}
                    >
                      Time
                    </span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      trigger === "event"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="event" id="trigger-event" />
                    <span
                      className={cn(
                        "text-xs",
                        trigger === "event" ? "font-semibold" : "font-normal",
                      )}
                    >
                      Event
                    </span>
                  </label>
                </RadioGroup>
              </div>

              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium text-foreground shrink-0">
                  Every
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={1}
                    value={everyValue}
                    onChange={(e) => setEveryValue(e.target.value)}
                    className="h-9 w-14 px-3 text-center"
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-9 min-w-[100px] justify-between gap-2 font-normal"
                      >
                        {everyUnit.charAt(0).toUpperCase() + everyUnit.slice(1)}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => setEveryUnit("days")}>
                        Days
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEveryUnit("weeks")}>
                        Weeks
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEveryUnit("months")}>
                        Months
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Time
                </Label>
                <div className="flex h-9 w-[300px] items-center gap-2 rounded-md border border-input bg-background px-4 shadow-sm">
                  <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm text-foreground">10:00 AM EST</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  End
                </Label>
                <RadioGroup
                  value={endType}
                  onValueChange={(v) => setEndType(v as "never" | "date")}
                  className="flex gap-2"
                >
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      endType === "never"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="never" id="end-never" />
                    <span
                      className={cn(
                        "text-xs",
                        endType === "never" ? "font-semibold" : "font-normal",
                      )}
                    >
                      Never
                    </span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      endType === "date"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="date" id="end-date" />
                    <span
                      className={cn(
                        "text-xs",
                        endType === "date" ? "font-semibold" : "font-normal",
                      )}
                    >
                      Date
                    </span>
                  </label>
                </RadioGroup>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        <div className="flex gap-6">
          <div className="flex flex-1 flex-col gap-3 rounded-md border border-border p-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                Completion Status
              </Label>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
            <div className="flex flex-col gap-4 border-l border-border pl-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  Email
                </Label>
                <Switch
                  checked={completionEmail}
                  onCheckedChange={setCompletionEmail}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  SMS
                </Label>
                <Switch
                  checked={completionSms}
                  onCheckedChange={setCompletionSms}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  App
                </Label>
                <Switch
                  checked={completionApp}
                  onCheckedChange={setCompletionApp}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 rounded-md border border-border p-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                Error
              </Label>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
            <div className="flex flex-col gap-4 border-l border-border pl-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  Email
                </Label>
                <Switch checked={errorEmail} onCheckedChange={setErrorEmail} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  SMS
                </Label>
                <Switch checked={errorSms} onCheckedChange={setErrorSms} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs font-normal text-foreground">
                  App
                </Label>
                <Switch checked={errorApp} onCheckedChange={setErrorApp} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CLIENTS_SUB_TABS = ["Clients", "Groups"] as const;
const CLIENTS_GRID = "grid grid-cols-[32px_175px_85px_1fr_1fr_40px]";

function ClientsTab() {
  const [subTab, setSubTab] = React.useState<"Clients" | "Groups">("Clients");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    new Set(["1"]),
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(MOCK_SCHEDULE_CLIENTS.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) next.add(id);
    else next.delete(id);
    setSelectedIds(next);
  };

  const allSelected = selectedIds.size === MOCK_SCHEDULE_CLIENTS.length;
  const someSelected = selectedIds.size > 0;

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex h-9 items-center rounded-lg bg-muted p-0.5">
          {CLIENTS_SUB_TABS.map((tab) => (
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
        <div className="flex items-center gap-3">
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="h-9 pl-9" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-2">
                <span className="text-xs">Filters</span>
                <ListFilter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Filter by eligibility</DropdownMenuItem>
              <DropdownMenuItem>Filter by insurance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-muted-foreground">
            {MOCK_SCHEDULE_CLIENTS.length} Clients
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-md border border-border">
        <div className="flex min-w-[600px] flex-col">
          <div
            className={cn(
              CLIENTS_GRID,
              "h-8 items-center border-b border-border bg-background",
            )}
          >
            <div className="flex items-center pl-2">
              <Checkbox
                checked={
                  allSelected ? true : someSelected ? "indeterminate" : false
                }
                onCheckedChange={(v) => handleSelectAll(v === true)}
              />
            </div>
            <div className="flex items-center gap-2 px-2">
              <span className="text-sm font-semibold text-foreground">
                Client
              </span>
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
            </div>
            <div className="px-2">
              <span className="text-sm font-medium text-muted-foreground">
                Eligibility
              </span>
            </div>
            <div className="px-2">
              <span className="text-sm font-medium text-muted-foreground">
                Insurance
              </span>
            </div>
            <div className="px-2">
              <span className="text-sm font-medium text-muted-foreground">
                Provider
              </span>
            </div>
            <div className="w-10" />
          </div>
          {MOCK_SCHEDULE_CLIENTS.map((client) => (
            <div
              key={client.id}
              className={cn(
                CLIENTS_GRID,
                "min-h-[40px] items-center border-b border-border last:border-b-0",
                !selectedIds.has(client.id) && "opacity-50",
              )}
            >
              <div className="flex items-center pl-2">
                <Checkbox
                  checked={selectedIds.has(client.id)}
                  onCheckedChange={(v) =>
                    handleSelectRow(client.id, v === true)
                  }
                />
              </div>
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                  <span className="text-xs font-medium text-muted-foreground">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <span className="truncate text-xs font-semibold text-foreground">
                  {client.name}
                </span>
              </div>
              <div className="px-2 py-2">
                <Badge
                  variant={
                    client.eligibility === "Eligible" ? "success" : "warning"
                  }
                  className="shrink-0"
                >
                  {client.eligibility}
                </Badge>
              </div>
              <div className="truncate px-2 py-2 text-xs text-muted-foreground">
                {client.insurance}
              </div>
              <div className="truncate px-2 py-2 text-xs text-muted-foreground">
                {client.provider}
              </div>
              <div className="flex items-center justify-center px-2 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View client</DropdownMenuItem>
                    <DropdownMenuItem>Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const HISTORY_GRID = "grid grid-cols-[175px_125px_1fr_40px]";

function HistoryTab() {
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6">
      <div className="overflow-hidden rounded-md border border-border">
        <div
          className={cn(
            HISTORY_GRID,
            "h-10 items-center border-b border-border bg-background",
          )}
        >
          <div className="flex items-center gap-2 pl-3 pr-2">
            <span className="text-sm font-medium text-muted-foreground">
              Date / Time
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
          </div>
          <div className="flex items-center gap-2 pl-3 pr-2">
            <span className="text-sm font-medium text-muted-foreground">
              Status
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
          </div>
          <div className="flex items-center px-2">
            <span className="text-sm font-medium text-muted-foreground">
              Results
            </span>
          </div>
          <div className="w-10" />
        </div>
        {MOCK_SCHEDULE_HISTORY.map((run, i) => (
          <div
            key={i}
            className={cn(
              HISTORY_GRID,
              "min-h-[72px] items-center border-b border-border last:border-b-0",
            )}
          >
            <div className="flex flex-col justify-center gap-1 p-2">
              <span className="text-xs font-semibold text-muted-foreground">
                {run.date}
              </span>
              <span className="text-xs text-muted-foreground">{run.time}</span>
            </div>
            <div className="p-2">
              <Badge variant="success" className="shrink-0">
                {run.status}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 p-2">
              <span className="text-sm font-medium text-green-700">
                {run.verified}
              </span>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium text-yellow-700">
                {run.failed}
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
                  <DropdownMenuItem>View report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScheduleModal({
  open,
  onOpenChange,
  scheduleId,
}: ScheduleModalProps) {
  const [activeTab, setActiveTab] =
    React.useState<ScheduleModalTab>("Overview");

  React.useEffect(() => {
    if (open) setActiveTab("Overview");
  }, [open]);

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
              {scheduleId ? "Batch Run #0000" : "New Schedule"}
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 gap-2 border-b border-border px-4 pb-4 pt-0">
          {SCHEDULE_MODAL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-muted text-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {activeTab === "Overview" && <OverviewTab />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Clients" && <ClientsTab />}
          {activeTab === "History" && <HistoryTab />}
        </div>
      </SheetContent>
    </Sheet>
  );
}
