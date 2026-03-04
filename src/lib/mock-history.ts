export type HistoryItemType = "Batch" | "Individual";
export type HistoryItemStatus = "Completed" | "Failed";

export interface HistoryItem {
  id: string;
  name: string;
  type: HistoryItemType;
  date: string;
  time: string;
  status: HistoryItemStatus;
  frequency: string;
  results: { verified: number; failed: number } | null;
  errorMessage: string | null;
}

export const MOCK_HISTORY_ITEMS: HistoryItem[] = [
  {
    id: "1",
    name: "Batch Run #000",
    type: "Batch",
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed",
    frequency: "Once",
    results: { verified: 12, failed: 2 },
    errorMessage: null,
  },
  {
    id: "2",
    name: "Joe Smith",
    type: "Individual",
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed",
    frequency: "Once",
    results: { verified: 1, failed: 0 },
    errorMessage: null,
  },
  {
    id: "3",
    name: "Batch Run #001",
    type: "Batch",
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Failed",
    frequency: "Once",
    results: null,
    errorMessage: "System did not respond.",
  },
  {
    id: "4",
    name: "Batch Run #002",
    type: "Batch",
    date: "Mon, Feb 23rd, 2026",
    time: "@ 9:00 AM EST",
    status: "Completed",
    frequency: "Once",
    results: { verified: 10, failed: 0 },
    errorMessage: null,
  },
  {
    id: "5",
    name: "Jane Doe",
    type: "Individual",
    date: "Mon, Feb 23rd, 2026",
    time: "@ 2:30 PM EST",
    status: "Completed",
    frequency: "Once",
    results: { verified: 1, failed: 0 },
    errorMessage: null,
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 6),
    name: i % 3 === 0 ? "Joe Smith" : "Batch Run #00" + (i + 3),
    type: (i % 3 === 0 ? "Individual" : "Batch") as HistoryItemType,
    date: "Tues, Feb 24th, 2026",
    time: "@ 10:00 AM EST",
    status: "Completed" as HistoryItemStatus,
    frequency: "Once",
    results: i % 3 === 0 ? { verified: 1, failed: 0 } : { verified: 12, failed: 2 },
    errorMessage: null as string | null,
  })),
];
