"use client";

import * as React from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { ScheduleInfo } from "@/components/verify-benefits-dialog";

interface ScheduledVerificationBannerProps {
  schedule: ScheduleInfo | null;
  onClose: () => void;
  className?: string;
}

export function ScheduledVerificationBanner({
  schedule,
  onClose,
  className,
}: ScheduledVerificationBannerProps) {
  if (!schedule || schedule.startTime === "now") return null;

  const occurrenceDisplay = schedule.repeat
    ? `Every ${schedule.everyValue} ${schedule.everyUnit}`
    : "Once";

  const dateTimeDisplay = (() => {
    if (!schedule.date) return "–";
    const [h, m] = schedule.time.split(":").map(Number);
    const d = new Date(schedule.date);
    d.setHours(isNaN(h) ? 0 : h, isNaN(m) ? 0 : m, 0, 0);
    return format(d, "EEEE, MMMM d, yyyy 'at' h:mm a");
  })();

  return (
    <div className={cn("w-full shrink-0", className)}>
      <div className="flex items-center gap-6 rounded-md border border-border bg-background p-4 shadow-sm">
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold leading-none text-foreground">
              Benefits Verification Scheduled
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              {dateTimeDisplay}
            </span>
            <span>•</span>
            <span>{occurrenceDisplay}</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
