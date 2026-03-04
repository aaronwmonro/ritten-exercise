"use client";

import * as React from "react";
import {
  CircleCheck,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  Ellipsis,
  Bell,
  Users,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Search,
  ListFilter,
  X,
} from "lucide-react";
import { format, isToday } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

// Mock client data for review step
const MOCK_CLIENTS = [
  {
    id: "1",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "2",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "3",
    name: "John Smith",
    eligible: false,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "4",
    name: "John Smith",
    eligible: false,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "5",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "6",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "7",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
  {
    id: "8",
    name: "John Smith",
    eligible: true,
    insurance: "Cigna Health",
    contact: "John Doe",
  },
];

interface Step1SelectProps {
  selectedClientIds: Set<string>;
  onToggleClientSelection: (clientId: string) => void;
  onSelectAll: (clientIds: string[]) => void;
  onDeselectAll: (clientIds: string[]) => void;
}

function Step1Select({
  selectedClientIds,
  onToggleClientSelection,
  onSelectAll,
  onDeselectAll,
}: Step1SelectProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"clients" | "groups">(
    "clients",
  );

  const filteredClients = React.useMemo(() => {
    if (!searchQuery.trim()) return MOCK_CLIENTS;
    const q = searchQuery.toLowerCase();
    return MOCK_CLIENTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.insurance.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const selectedClients = MOCK_CLIENTS.filter((c) =>
    selectedClientIds.has(c.id),
  );
  const selectedCount = selectedClients.length;
  const eligibleCount = selectedClients.filter((c) => c.eligible).length;
  const ineligibleCount = selectedClients.filter((c) => !c.eligible).length;

  const allFilteredSelected =
    filteredClients.length > 0 &&
    filteredClients.every((c) => selectedClientIds.has(c.id));
  const someFilteredSelected = filteredClients.some((c) =>
    selectedClientIds.has(c.id),
  );

  const handleSelectAllChange = (checked: boolean) => {
    const ids = filteredClients.map((c) => c.id);
    if (checked) {
      onSelectAll(ids);
    } else {
      onDeselectAll(ids);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary stats */}
      <div className="flex items-center gap-0 overflow-hidden rounded-md border border-input">
        <div className="flex flex-1 flex-col gap-3 border-r border-border px-3 py-2">
          <span className="text-left text-xs font-medium text-foreground">
            Selected
          </span>
          <span className="text-base font-normal leading-6 text-muted-foreground">
            {selectedCount}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 border-r border-border px-3 py-2">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
            <span className="text-xs font-medium text-green-700">Eligible</span>
          </div>
          <span className="text-base font-normal leading-6 text-muted-foreground">
            {eligibleCount}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <ThumbsDown className="h-3.5 w-3.5 text-amber-600" />
            <span className="text-xs font-medium text-amber-600">
              Ineligible
            </span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="text-base font-normal leading-6 text-muted-foreground">
            {ineligibleCount}
          </span>
        </div>
      </div>

      {/* Tabs + Search + Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-start">
          <div
            className="flex h-9 items-center gap-1 rounded-lg bg-muted p-0.5"
            role="tablist"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "clients"}
              onClick={() => setActiveTab("clients")}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                activeTab === "clients"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground",
              )}
            >
              Clients
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "groups"}
              onClick={() => setActiveTab("groups")}
              className={cn(
                "rounded-md px-3 py-1 text-sm font-medium transition-colors",
                activeTab === "groups"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-foreground",
              )}
            >
              Groups
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-2">
                  Filters
                  <ListFilter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Eligibility status</DropdownMenuItem>
                <DropdownMenuItem>Insurance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-muted-foreground">
              {filteredClients.length} Clients
            </span>
          </div>
        </div>

        {activeTab === "clients" ? (
          <div className="flex flex-col gap-0 overflow-hidden rounded-md border border-border">
            {/* Table header */}
            <div className="flex h-8 items-center border-b border-border bg-muted/30">
              <div className="flex h-8 w-8 shrink-0 items-center border-r border-border pl-2">
                <Checkbox
                  checked={
                    allFilteredSelected
                      ? true
                      : someFilteredSelected
                        ? "indeterminate"
                        : false
                  }
                  onCheckedChange={(v) =>
                    handleSelectAllChange(v === true || v === "indeterminate")
                  }
                />
              </div>
              <div className="flex min-w-[175px] shrink-0 items-center gap-2 border-r border-border px-2">
                <span className="text-sm font-semibold text-foreground">
                  Client
                </span>
                <ChevronsUpDown className="h-4 w-4 opacity-70" />
              </div>
              <div className="flex min-w-[85px] shrink-0 items-center border-r border-border px-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Eligibility
                </span>
              </div>
              <div className="flex min-w-[85px] flex-1 items-center border-r border-border px-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Insurance
                </span>
              </div>
              <div className="flex min-w-[85px] flex-1 items-center border-r border-border px-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Provider
                </span>
              </div>
              <div className="w-10 shrink-0" />
            </div>

            {/* Table rows */}
            <div className="max-h-[280px] overflow-y-auto">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={cn(
                    "flex h-10 items-center border-b border-border last:border-b-0",
                    !client.eligible && "opacity-50",
                  )}
                >
                  <div className="flex h-10 w-8 shrink-0 items-center border-r border-border pl-2">
                    <Checkbox
                      checked={selectedClientIds.has(client.id)}
                      onCheckedChange={() => onToggleClientSelection(client.id)}
                    />
                  </div>
                  <div className="flex min-w-[175px] shrink-0 items-center gap-3 px-2 py-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="truncate text-xs font-semibold text-foreground">
                      {client.name}
                    </span>
                  </div>
                  <div className="flex min-w-[85px] shrink-0 items-center px-2 py-2">
                    {client.eligible ? (
                      <Badge
                        variant="success"
                        className="bg-green-100 text-green-700"
                      >
                        Eligible
                      </Badge>
                    ) : (
                      <Badge className="border-0 bg-amber-100 text-amber-600 hover:bg-amber-100">
                        Ineligible
                      </Badge>
                    )}
                  </div>
                  <div className="flex min-w-[85px] flex-1 items-center px-2 py-2">
                    <span className="truncate text-xs text-muted-foreground">
                      {client.insurance}
                    </span>
                  </div>
                  <div className="flex min-w-[85px] flex-1 items-center px-2 py-2">
                    <span className="truncate text-xs text-muted-foreground">
                      {client.contact}
                    </span>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center px-3 py-2">
                    <Ellipsis className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-md border border-border py-12">
            <p className="text-sm text-muted-foreground">
              Select a group to add clients.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface Step4ReviewProps {
  name: string;
  repeat: boolean;
  everyValue: string;
  everyUnit: "days" | "weeks" | "months";
  startTime: "now" | "scheduled";
  date: Date | undefined;
  time: string;
  endOption: "never" | "date";
  endDate: Date | undefined;
  completionEmail: boolean;
  completionSms: boolean;
  completionApp: boolean;
  errorEmail: boolean;
  errorSms: boolean;
  errorApp: boolean;
  selectedClientIds: Set<string>;
  onToggleClientSelection: (clientId: string) => void;
  onEditSettings: () => void;
  onEditNotifications: () => void;
  onEditClients: () => void;
}

function Step4Review({
  name,
  repeat,
  everyValue,
  everyUnit,
  startTime,
  date,
  time,
  endOption,
  endDate,
  completionEmail,
  completionSms,
  completionApp,
  errorEmail,
  errorSms,
  errorApp,
  selectedClientIds,
  onToggleClientSelection,
  onEditSettings,
  onEditNotifications,
  onEditClients,
}: Step4ReviewProps) {
  const frequencyDisplay = repeat ? `Every ${everyValue} ${everyUnit}` : "Once";

  const startDateTimeDisplay = (() => {
    if (!date) return "–";
    if (startTime === "now") {
      return `${format(date, "EEEE, MMMM do, yyyy")} @ ASAP EST`;
    }
    const [h, m] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
    return `${format(d, "EEEE, MMMM do, yyyy '@' h:mm a")} EST`;
  })();

  const endsDisplay =
    endOption === "never" ? "–" : endDate ? format(endDate, "PPP") : "–";

  const completionChannels = [
    completionEmail && "Email",
    completionSms && "SMS",
    completionApp && "App",
  ].filter(Boolean) as string[];
  const completionDisplay =
    completionChannels.length > 0 ? completionChannels.join(" • ") : "None";

  const errorChannels = [
    errorEmail && "Email",
    errorSms && "SMS",
    errorApp && "App",
  ].filter(Boolean) as string[];
  const errorDisplay =
    errorChannels.length > 0 ? errorChannels.join(" • ") : "None";

  const selectedClients = MOCK_CLIENTS.filter((c) =>
    selectedClientIds.has(c.id),
  );
  const selectedCount = selectedClients.length;
  const eligibleCount = selectedClients.filter((c) => c.eligible).length;
  const ineligibleCount = selectedClients.filter((c) => !c.eligible).length;

  const ReviewCard = ({
    icon: Icon,
    title,
    onEdit,
    children,
  }: {
    icon: React.ElementType;
    title: string;
    onEdit: () => void;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-4 rounded-md border border-border p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-foreground" />
          <span className="text-sm font-semibold leading-none text-foreground">
            {title}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs font-medium text-muted-foreground hover:text-foreground"
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-col gap-4 text-xs font-medium leading-none">
        {children}
      </div>
    </div>
  );

  const ReviewRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid grid-cols-[1fr_2fr] gap-8">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <ReviewCard icon={CalendarIcon} title="Settings" onEdit={onEditSettings}>
        <ReviewRow label="Name" value={name || "Lorem Ipsum"} />
        <ReviewRow label="Frequency" value={frequencyDisplay} />
        <ReviewRow label="Start Date & Time" value={startDateTimeDisplay} />
        <ReviewRow label="Ends" value={endsDisplay} />
      </ReviewCard>

      <ReviewCard
        icon={Bell}
        title="Notifications"
        onEdit={onEditNotifications}
      >
        <ReviewRow label="Completion" value={completionDisplay} />
        <ReviewRow label="Errors" value={errorDisplay} />
      </ReviewCard>

      <ReviewCard icon={Users} title="Clients" onEdit={onEditClients}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-0 overflow-hidden rounded-md border border-input">
            <div className="flex flex-1 flex-col gap-3 border-r border-border px-3 py-2">
              <span className="text-left text-xs font-medium text-foreground">
                Selected
              </span>
              <span className="text-base font-normal leading-6 text-muted-foreground">
                {selectedCount}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 border-r border-border px-3 py-2">
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
                <span className="text-xs font-medium text-green-700">
                  Ready
                </span>
              </div>
              <span className="text-base font-normal leading-6 text-muted-foreground">
                {eligibleCount}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <ThumbsDown className="h-3.5 w-3.5 text-amber-600" />
                <span className="text-xs font-medium text-amber-600">
                  Ineligible
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <span className="text-base font-normal leading-6 text-muted-foreground">
                {ineligibleCount}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="max-h-[300px] overflow-y-auto rounded-md border border-border">
              {MOCK_CLIENTS.map((client) => (
                <div
                  key={client.id}
                  className={cn(
                    "flex h-10 items-center border-b border-border last:border-b-0",
                    !client.eligible && "opacity-50",
                  )}
                >
                  <div className="flex h-10 w-8 shrink-0 items-center border-r border-border pl-2">
                    <Checkbox
                      checked={selectedClientIds.has(client.id)}
                      onCheckedChange={() => onToggleClientSelection(client.id)}
                    />
                  </div>
                  <div className="flex min-w-[120px] flex-1 items-center gap-3 px-2 py-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
                      <span className="text-[10px] font-medium text-muted-foreground">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="truncate text-xs font-semibold text-foreground">
                      {client.name}
                    </span>
                  </div>
                  <div className="flex min-w-[85px] shrink-0 items-center px-2 py-2">
                    {client.eligible ? (
                      <Badge
                        variant="success"
                        className="bg-green-100 text-green-700"
                      >
                        Eligible
                      </Badge>
                    ) : (
                      <Badge className="border-0 bg-amber-100 text-amber-600 hover:bg-amber-100">
                        Ineligible
                      </Badge>
                    )}
                  </div>
                  <div className="flex min-w-[85px] flex-1 items-center px-2 py-2">
                    <span className="truncate text-xs text-muted-foreground">
                      {client.insurance}
                    </span>
                  </div>
                  <div className="flex min-w-[85px] flex-1 items-center px-2 py-2">
                    <span className="truncate text-xs text-muted-foreground">
                      {client.contact}
                    </span>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center px-3 py-2">
                    <Ellipsis className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                5 more
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </ReviewCard>
    </div>
  );
}

function StepIndicator({
  step,
  label,
  currentStep,
  onStepClick,
}: {
  step: 1 | 2 | 3 | 4;
  label: string;
  currentStep: 1 | 2 | 3 | 4;
  onStepClick: (step: 1 | 2 | 3 | 4) => void;
}) {
  const isCompleted = currentStep > step;
  const isCurrent = currentStep === step;
  const isClickable = isCompleted;

  const content = (
    <>
      <div
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
          isCompleted || isCurrent
            ? "bg-foreground"
            : "border border-foreground",
        )}
      >
        {isCompleted ? (
          <Check className="h-2.5 w-2.5 text-background" />
        ) : (
          <span
            className={cn(
              "text-xs font-semibold",
              isCurrent ? "text-background" : "text-foreground",
            )}
          >
            {step}
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-xs",
          isCurrent || isCompleted ? "font-semibold" : "font-normal",
          "text-foreground",
        )}
      >
        {label}
      </span>
    </>
  );

  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center justify-center gap-2",
        currentStep < step && "opacity-30",
      )}
    >
      {isClickable ? (
        <button
          type="button"
          onClick={() => onStepClick(step)}
          className="flex w-full min-w-0 cursor-pointer items-center justify-center gap-2 rounded-sm transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        >
          {content}
        </button>
      ) : (
        <div className="flex w-full min-w-0 items-center justify-center gap-2">
          {content}
        </div>
      )}
    </div>
  );
}

export interface ScheduleInfo {
  startTime: "now" | "scheduled";
  date: Date | undefined;
  time: string;
  repeat: boolean;
  everyValue: string;
  everyUnit: "days" | "weeks" | "months";
  endOption: "never" | "date";
  endDate: Date | undefined;
}

interface VerifyBenefitsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when user clicks Schedule on step 4. Passes schedule details for run-now vs scheduled. */
  onSchedule?: (schedule: ScheduleInfo) => void;
  /** Which step to show when dialog opens. 1 = Select clients, 2 = Frequency, etc. Default 2 (used when coming from clients page with pre-selection). */
  initialStep?: 1 | 2 | 3 | 4;
}

export function VerifyBenefitsDialog({
  open,
  onOpenChange,
  onSchedule,
  initialStep = 2,
}: VerifyBenefitsDialogProps) {
  const [startTime, setStartTime] = React.useState<"now" | "scheduled">("now");
  const [repeat, setRepeat] = React.useState(false);
  const [dateOpen, setDateOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
  const [time, setTime] = React.useState(() => format(new Date(), "HH:mm"));
  const [trigger, setTrigger] = React.useState<"time" | "event">("time");
  const [everyValue, setEveryValue] = React.useState("1");
  const [everyUnit, setEveryUnit] = React.useState<"days" | "weeks" | "months">(
    "days",
  );
  const [endOption, setEndOption] = React.useState<"never" | "date">("never");
  const [endDateOpen, setEndDateOpen] = React.useState(false);
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3 | 4>(
    initialStep,
  );
  const [name, setName] = React.useState("");
  const [completionEmail, setCompletionEmail] = React.useState(true);
  const [completionSms, setCompletionSms] = React.useState(true);
  const [completionApp, setCompletionApp] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(true);
  const [errorSms, setErrorSms] = React.useState(true);
  const [errorApp, setErrorApp] = React.useState(false);
  const [selectedClientIds, setSelectedClientIds] = React.useState<Set<string>>(
    () =>
      initialStep === 1
        ? new Set()
        : new Set(MOCK_CLIENTS.map((c) => c.id)),
  );

  const toggleClientSelection = React.useCallback((clientId: string) => {
    setSelectedClientIds((prev) => {
      const next = new Set(prev);
      if (next.has(clientId)) {
        next.delete(clientId);
      } else {
        next.add(clientId);
      }
      return next;
    });
  }, []);

  const selectClients = React.useCallback((clientIds: string[]) => {
    setSelectedClientIds((prev) => {
      const next = new Set(prev);
      clientIds.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  const deselectClients = React.useCallback((clientIds: string[]) => {
    setSelectedClientIds((prev) => {
      const next = new Set(prev);
      clientIds.forEach((id) => next.delete(id));
      return next;
    });
  }, []);

  // Sync step and selection when dialog opens; reset when it closes
  React.useEffect(() => {
    if (open) {
      setCurrentStep(initialStep);
      setSelectedClientIds(
        initialStep === 1
          ? new Set()
          : new Set(MOCK_CLIENTS.map((c) => c.id)),
      );
    } else {
      setCurrentStep(2);
      setSelectedClientIds(new Set(MOCK_CLIENTS.map((c) => c.id)));
    }
  }, [open, initialStep]);

  const handleStartTimeChange = (v: "now" | "scheduled") => {
    setStartTime(v);
    if (v === "now") {
      const now = new Date();
      setDate(now);
      setTime(format(now, "HH:mm"));
      setDateOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        animation="bottom"
        className="flex top-20 translate-y-0 h-[calc(100vh-160px)] max-w-[800px] w-[800px] flex-col gap-0 overflow-hidden p-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <CircleCheck className="h-8 w-8 text-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-lg font-semibold leading-none text-foreground">
                Verify Benefits
              </DialogTitle>
              <DialogDescription className="text-sm font-normal text-muted-foreground">
                Confirm patients benefits eligibility.
              </DialogDescription>
            </div>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="rounded opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </div>

        {/* Progress indicator */}
        <div className="grid h-fit grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-0 border-b border-border bg-muted/50 px-6 py-3">
          {/* Step 1 - Select */}
          <StepIndicator
            step={1}
            label="Select"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
          <div
            className={cn(
              "h-px min-w-8 bg-muted-foreground",
              currentStep < 2 && "opacity-30",
            )}
          />
          <StepIndicator
            step={2}
            label="Frequency"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
          <div
            className={cn(
              "h-px min-w-8 bg-muted-foreground",
              currentStep < 3 && "opacity-30",
            )}
          />
          <StepIndicator
            step={3}
            label="Details"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
          <div
            className={cn(
              "h-px min-w-8 bg-muted-foreground",
              currentStep < 4 && "opacity-30",
            )}
          />
          <StepIndicator
            step={4}
            label="Review"
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-6">
          {currentStep === 1 && (
            <Step1Select
              selectedClientIds={selectedClientIds}
              onToggleClientSelection={toggleClientSelection}
              onSelectAll={selectClients}
              onDeselectAll={deselectClients}
            />
          )}

          {currentStep === 2 && (
            <>
              {/* Start Time */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Start Time
                </Label>
                <RadioGroup
                  value={startTime}
                  onValueChange={(v) =>
                    handleStartTimeChange(v as "now" | "scheduled")
                  }
                  className="flex gap-2"
                >
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      startTime === "now"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="now" id="start-now" />
                    <span
                      className={cn(
                        "text-xs",
                        startTime === "now" ? "font-semibold" : "font-normal",
                      )}
                    >
                      Now
                    </span>
                  </label>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                      startTime === "scheduled"
                        ? "border-foreground bg-background shadow-sm"
                        : "border-border bg-background",
                    )}
                  >
                    <RadioGroupItem value="scheduled" id="start-scheduled" />
                    <span
                      className={cn(
                        "text-xs",
                        startTime === "scheduled"
                          ? "font-semibold"
                          : "font-normal",
                      )}
                    >
                      Scheduled
                    </span>
                  </label>
                </RadioGroup>
              </div>

              {/* Date and Time inputs - shadcn DatePickerTime pattern */}
              <div className="flex flex-row gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <Label
                    htmlFor="date-picker-optional"
                    className="text-sm font-medium text-foreground"
                  >
                    Date
                  </Label>
                  <Popover
                    open={dateOpen && startTime === "scheduled"}
                    onOpenChange={setDateOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-optional"
                        disabled={startTime === "now"}
                        className="h-9 w-full justify-between gap-2 font-normal"
                      >
                        {date
                          ? isToday(date)
                            ? `Today ${format(date, "MMMM do, yyyy")}`
                            : format(date, "PPP")
                          : "Select date"}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto min-w-[300px] overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        defaultMonth={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setDateOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <Label
                    htmlFor="time-picker-optional"
                    className="text-sm font-medium text-foreground"
                  >
                    Time
                  </Label>
                  <div className="flex h-9 items-center gap-2 rounded-md border border-input bg-background px-4">
                    {startTime === "now" && (
                      <span className="text-sm font-medium text-foreground">
                        ASAP
                      </span>
                    )}
                    <Input
                      type="time"
                      id="time-picker-optional"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={startTime === "now"}
                      step="1"
                      className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <span className="text-xs text-muted-foreground">EST</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Repeat */}
              <div className="flex items-center justify-between gap-4">
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

              {/* Repeat settings - shown when Repeat is on */}
              {repeat && (
                <>
                  <Separator />

                  {/* Trigger */}
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
                            trigger === "time"
                              ? "font-semibold"
                              : "font-normal",
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
                            trigger === "event"
                              ? "font-semibold"
                              : "font-normal",
                          )}
                        >
                          Event
                        </span>
                      </label>
                    </RadioGroup>
                  </div>

                  {/* Every */}
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
                            {everyUnit.charAt(0).toUpperCase() +
                              everyUnit.slice(1)}
                            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() => setEveryUnit("days")}
                          >
                            Days
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEveryUnit("weeks")}
                          >
                            Weeks
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setEveryUnit("months")}
                          >
                            Months
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <Separator />

                  {/* End */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-foreground">
                      End
                    </Label>
                    <RadioGroup
                      value={endOption}
                      onValueChange={(v) => setEndOption(v as "never" | "date")}
                      className="flex gap-2"
                    >
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                          endOption === "never"
                            ? "border-foreground bg-background shadow-sm"
                            : "border-border bg-background",
                        )}
                      >
                        <RadioGroupItem value="never" id="end-never" />
                        <span
                          className={cn(
                            "text-xs",
                            endOption === "never"
                              ? "font-semibold"
                              : "font-normal",
                          )}
                        >
                          Never
                        </span>
                      </label>
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 transition-colors",
                          endOption === "date"
                            ? "border-foreground bg-background shadow-sm"
                            : "border-border bg-background",
                        )}
                      >
                        <RadioGroupItem value="date" id="end-date" />
                        <span
                          className={cn(
                            "text-xs",
                            endOption === "date"
                              ? "font-semibold"
                              : "font-normal",
                          )}
                        >
                          Date
                        </span>
                      </label>
                    </RadioGroup>
                    {endOption === "date" && (
                      <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-9 w-full justify-between gap-2 font-normal"
                          >
                            {endDate
                              ? format(endDate, "PPP")
                              : "Select end date"}
                            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto min-w-[300px] overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={endDate}
                            defaultMonth={endDate}
                            onSelect={(selectedDate) => {
                              setEndDate(selectedDate);
                              setEndDateOpen(false);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* Name */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="verification-name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </Label>
                <Input
                  id="verification-name"
                  placeholder="Ex. Cigna Clients List..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9"
                />
              </div>

              <Separator />

              {/* Notifications */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-foreground">
                  Notifications
                </p>
                <div className="flex gap-6">
                  {/* Completion Status */}
                  <div className="flex flex-1 flex-col gap-3 rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="completion-status"
                        className="text-sm font-medium text-foreground"
                      >
                        Completion Status
                      </Label>
                      <Switch
                        id="completion-status"
                        checked={
                          completionEmail || completionSms || completionApp
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCompletionEmail(true);
                            setCompletionSms(true);
                            setCompletionApp(false);
                          } else {
                            setCompletionEmail(false);
                            setCompletionSms(false);
                            setCompletionApp(false);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-4 border-l border-border pl-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="completion-email"
                          className="text-xs font-normal text-foreground"
                        >
                          Email
                        </Label>
                        <Switch
                          id="completion-email"
                          checked={completionEmail}
                          onCheckedChange={setCompletionEmail}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="completion-sms"
                          className="text-xs font-normal text-foreground"
                        >
                          SMS
                        </Label>
                        <Switch
                          id="completion-sms"
                          checked={completionSms}
                          onCheckedChange={setCompletionSms}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="completion-app"
                          className="text-xs font-normal text-foreground"
                        >
                          App
                        </Label>
                        <Switch
                          id="completion-app"
                          checked={completionApp}
                          onCheckedChange={setCompletionApp}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  <div className="flex flex-1 flex-col gap-3 rounded-md border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <Label
                        htmlFor="error-notifications"
                        className="text-sm font-medium text-foreground"
                      >
                        Error
                      </Label>
                      <Switch
                        id="error-notifications"
                        checked={errorEmail || errorSms || errorApp}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setErrorEmail(true);
                            setErrorSms(true);
                            setErrorApp(false);
                          } else {
                            setErrorEmail(false);
                            setErrorSms(false);
                            setErrorApp(false);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-4 border-l border-border pl-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="error-email"
                          className="text-xs font-normal text-foreground"
                        >
                          Email
                        </Label>
                        <Switch
                          id="error-email"
                          checked={errorEmail}
                          onCheckedChange={setErrorEmail}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="error-sms"
                          className="text-xs font-normal text-foreground"
                        >
                          SMS
                        </Label>
                        <Switch
                          id="error-sms"
                          checked={errorSms}
                          onCheckedChange={setErrorSms}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="error-app"
                          className="text-xs font-normal text-foreground"
                        >
                          App
                        </Label>
                        <Switch
                          id="error-app"
                          checked={errorApp}
                          onCheckedChange={setErrorApp}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <Step4Review
              name={name}
              repeat={repeat}
              everyValue={everyValue}
              everyUnit={everyUnit}
              startTime={startTime}
              date={date}
              time={time}
              endOption={endOption}
              endDate={endDate}
              completionEmail={completionEmail}
              completionSms={completionSms}
              completionApp={completionApp}
              errorEmail={errorEmail}
              errorSms={errorSms}
              errorApp={errorApp}
              selectedClientIds={selectedClientIds}
              onToggleClientSelection={toggleClientSelection}
              onEditSettings={() => setCurrentStep(2)}
              onEditNotifications={() => setCurrentStep(3)}
              onEditClients={() => setCurrentStep(1)}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4)
            }
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button
            size="sm"
            onClick={() => {
              if (currentStep === 4) {
                onSchedule?.({
                  startTime,
                  date,
                  time,
                  repeat,
                  everyValue,
                  everyUnit,
                  endOption,
                  endDate,
                });
                onOpenChange(false);
              } else {
                setCurrentStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4);
              }
            }}
          >
            {currentStep === 4 ? "Schedule" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
