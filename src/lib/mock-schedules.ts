export type ScheduleType = "Batch" | "Individual";
export type ScheduleStatus = "Active" | "Paused" | "Completed";
export type ScheduleTrigger = "Time" | "Date" | "Manual";

export interface Schedule {
  id: string;
  name: string;
  status: ScheduleStatus;
  type: ScheduleType;
  previousRun: { date: string; time: string } | null;
  nextRun: { date: string; time: string };
  trigger: ScheduleTrigger;
  triggerDetail: string;
  results: { verified: number; failed: number };
  scope: string;
}

export const MOCK_SCHEDULES: Schedule[] = [
  {
    id: "1",
    name: "Batch #000",
    status: "Active",
    type: "Batch",
    previousRun: { date: "Tues, Feb 24th, 2026", time: "@ 10:00 AM EST" },
    nextRun: { date: "Tues, Feb 24th, 2026", time: "@ 10:00 AM EST" },
    trigger: "Time",
    triggerDetail: "Monthly",
    results: { verified: 1, failed: 0 },
    scope: "100 Clients",
  },
  {
    id: "2",
    name: "Batch #000",
    status: "Active",
    type: "Individual",
    previousRun: { date: "Tues, Feb 24th, 2026", time: "@ 10:00 AM EST" },
    nextRun: { date: "Tues, Feb 24th, 2026", time: "@ 10:00 AM EST" },
    trigger: "Time",
    triggerDetail: "Monthly",
    results: { verified: 1, failed: 0 },
    scope: "1 Client",
  },
  {
    id: "3",
    name: "Batch #000",
    status: "Active",
    type: "Batch",
    previousRun: null,
    nextRun: { date: "Tues, Feb 24th, 2026", time: "@ 10:00 AM EST" },
    trigger: "Date",
    triggerDetail: "Only Once",
    results: { verified: 1, failed: 0 },
    scope: "100 Clients",
  },
];
