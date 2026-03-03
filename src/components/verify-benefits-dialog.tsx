"use client";

import * as React from "react";
import { CircleCheck, Check, ChevronDown, X } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface VerifyBenefitsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VerifyBenefitsDialog({
  open,
  onOpenChange,
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
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3 | 4>(3);
  const [name, setName] = React.useState("");
  const [completionEmail, setCompletionEmail] = React.useState(true);
  const [completionSms, setCompletionSms] = React.useState(true);
  const [completionApp, setCompletionApp] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(true);
  const [errorSms, setErrorSms] = React.useState(true);
  const [errorApp, setErrorApp] = React.useState(false);

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
        className="flex h-[600px] max-w-[600px] w-[600px] flex-col gap-0 overflow-hidden p-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-3">
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
        <div className="flex h-[52px] items-center gap-2 border-b border-border bg-muted/50 px-6 py-4">
          {/* Step 1 - Select */}
          <div
            className={cn(
              "flex w-full flex-1 items-center justify-center gap-2",
              currentStep < 1 && "opacity-30",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                currentStep > 1
                  ? "bg-foreground"
                  : currentStep === 1
                    ? "bg-foreground"
                    : "border border-foreground",
              )}
            >
              {currentStep > 1 ? (
                <Check className="h-3 w-3 text-background" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    currentStep === 1 ? "text-background" : "text-foreground",
                  )}
                >
                  1
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                currentStep >= 1 ? "font-semibold" : "font-normal",
                "text-foreground",
              )}
            >
              Select
            </span>
          </div>
          <div
            className={cn(
              "h-px flex-1 bg-border",
              currentStep < 2 && "opacity-30",
            )}
          />
          {/* Step 2 - Frequency */}
          <div
            className={cn(
              "flex w-full flex-1 items-center justify-center gap-2",
              currentStep < 2 && "opacity-30",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                currentStep > 2
                  ? "bg-foreground"
                  : currentStep === 2
                    ? "bg-foreground"
                    : "border border-foreground",
              )}
            >
              {currentStep > 2 ? (
                <Check className="h-3 w-3 text-background" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    currentStep === 2 ? "text-background" : "text-foreground",
                  )}
                >
                  2
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                currentStep >= 2 ? "font-semibold" : "font-normal",
                "text-foreground",
              )}
            >
              Frequency
            </span>
          </div>
          <div
            className={cn(
              "h-px flex-1 bg-border",
              currentStep < 3 && "opacity-30",
            )}
          />
          {/* Step 3 - Details */}
          <div
            className={cn(
              "flex w-full flex-1 items-center justify-center gap-2",
              currentStep < 3 && "opacity-30",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full",
                currentStep > 3
                  ? "bg-foreground"
                  : currentStep === 3
                    ? "bg-foreground"
                    : "border border-foreground",
              )}
            >
              {currentStep > 3 ? (
                <Check className="h-3 w-3 text-background" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-semibold",
                    currentStep === 3 ? "text-background" : "text-foreground",
                  )}
                >
                  3
                </span>
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                currentStep >= 3 ? "font-semibold" : "font-normal",
                "text-foreground",
              )}
            >
              Details
            </span>
          </div>
          <div
            className={cn(
              "h-px flex-1 bg-border",
              currentStep < 4 && "opacity-30",
            )}
          />
          {/* Step 4 - Review */}
          <div
            className={cn(
              "flex w-full flex-1 items-center justify-center gap-2",
              currentStep < 4 && "opacity-30",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border border-foreground",
                currentStep === 4 && "bg-foreground",
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  currentStep === 4 ? "text-background" : "text-foreground",
                )}
              >
                4
              </span>
            </div>
            <span
              className={cn(
                "text-sm",
                currentStep >= 4 ? "font-semibold" : "font-normal",
                "text-foreground",
              )}
            >
              Review
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Select content for step 1.
              </p>
            </div>
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
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Review summary will appear here.
              </p>
            </div>
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
            onClick={() =>
              setCurrentStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4)
            }
          >
            {currentStep === 4 ? "Submit" : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
