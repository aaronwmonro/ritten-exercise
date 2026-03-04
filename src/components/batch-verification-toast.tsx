"use client";

import * as React from "react";
import {
  BadgeCheck,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BatchVerificationToastProps {
  open: boolean;
  onClose: () => void;
  /** Duration in ms for the mock verification run. Default 10000. */
  durationMs?: number;
  className?: string;
}

export function BatchVerificationToast({
  open,
  onClose,
  durationMs = 10000,
  className,
}: BatchVerificationToastProps) {
  const [state, setState] = React.useState<"in-progress" | "complete">(
    "in-progress"
  );
  const [progress, setProgress] = React.useState(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (!open) {
      setState("in-progress");
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);

      if (pct >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setState("complete");
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [open, durationMs]);

  if (!open) return null;

  return (
    <div className={cn("w-full shrink-0", className)}>
      <div
        className={cn(
          "flex items-center gap-6 rounded-md border border-border bg-background p-4 shadow-sm",
          state === "complete" ? "gap-8" : "gap-6"
        )}
      >
        {/* Left: Spinner (in-progress) or content block (complete) */}
        <div
          className={cn(
            "flex flex-1 items-center min-w-0",
            state === "in-progress" ? "gap-4" : "gap-4"
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {/* Header row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <BadgeCheck className="h-5 w-5 shrink-0 text-foreground" />
                <span className="text-lg font-semibold leading-none text-foreground truncate">
                  Batch Verify Benefits
                </span>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="h-3.5 w-3.5 text-green-700" />
                  <span className="text-xs font-medium text-green-700">
                    10 Verified
                  </span>
                </div>
                <span className="text-xs font-medium text-foreground">•</span>
                <div className="flex items-center gap-1.5">
                  <ThumbsDown className="h-3.5 w-3.5 text-yellow-600" />
                  <span className="text-xs font-medium text-yellow-600">
                    2 Failed
                  </span>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-foreground" />
                <span className="text-xs font-medium text-foreground">•</span>
                <span className="text-sm font-semibold text-foreground">
                  {state === "in-progress"
                    ? `${Math.round(progress)}%`
                    : "Completed"}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: Close (in-progress) or View Report + Close (complete) */}
        <div className="flex items-center gap-2 shrink-0">
          {state === "complete" && (
            <Button variant="outline" size="default" className="h-9">
              View Report
            </Button>
          )}
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
    </div>
  );
}
