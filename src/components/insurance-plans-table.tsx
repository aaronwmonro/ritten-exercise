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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SAMPLE_INSURANCE_PLANS,
  type InsurancePlanTemplate,
} from "@/lib/mock-insurance-plans";
import { SchedulesTab } from "@/components/schedules-table";
import { HistoryTab } from "@/components/history-table";
import { cn } from "@/lib/utils";

const BENEFITS_TABS = ["Insurance Plans", "Schedule", "History"] as const;
type BenefitsTab = (typeof BENEFITS_TABS)[number];

export function BenefitsPage({
  defaultTab = "Insurance Plans",
}: {
  defaultTab?: BenefitsTab;
}) {
  const [activeTab, setActiveTab] =
    React.useState<BenefitsTab>(defaultTab);

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <header className="flex h-12 items-center justify-between px-7 py-3">
        <h1 className="text-base font-medium text-foreground">Benefits</h1>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Bell className="h-4 w-4" />
        </Button>
      </header>

      {/* Tabs */}
      <div className="flex flex-col gap-0 border-b border-border pb-3">
        <div className="flex items-center justify-between px-4 pr-8">
          <div className="flex items-center gap-2">
            {BENEFITS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  tab === activeTab
                    ? "bg-muted text-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === "Insurance Plans" && <InsurancePlansTab />}
      {activeTab === "Schedule" && <SchedulesTab />}
      {activeTab === "History" && <HistoryTab />}
    </div>
  );
}

function InsurancePlansTab() {
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
              <DropdownMenuItem>Filter by carrier</DropdownMenuItem>
              <DropdownMenuItem>Filter by plan</DropdownMenuItem>
              <DropdownMenuItem>Filter by verified</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="outline" className="h-9 gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Table */}
      <div className="min-w-0 flex-1 overflow-x-auto rounded-md border border-border">
        <div className="flex min-w-[900px] flex-col overflow-hidden">
          <InsurancePlanTableHeader />
          <div className="flex flex-col">
            {SAMPLE_INSURANCE_PLANS.map((plan) => (
              <InsurancePlanTableRow key={plan.id} plan={plan} />
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
    </div>
  );
}

const TABLE_GRID =
  "grid grid-cols-[minmax(200px,200px)_minmax(250px,250px)_1fr_1fr_125px_40px]";

function InsurancePlanTableHeader() {
  return (
    <div
      className={cn(
        TABLE_GRID,
        "h-10 items-center border-b border-border bg-background",
      )}
    >
      <div className="flex min-w-0 items-center gap-2 px-2">
        <span className="text-sm font-medium text-foreground">Name</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0" />
      </div>
      <div className="flex min-w-0 items-center gap-2 pl-3 pr-2">
        <span className="text-sm font-medium text-muted-foreground">Plan</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-70" />
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Co-Insurance
        </span>
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Deductible
        </span>
      </div>
      <div className="flex min-w-0 items-center px-2">
        <span className="text-sm font-medium text-muted-foreground">
          Verified
        </span>
      </div>
      <div className="flex w-10 items-center justify-center px-2" />
    </div>
  );
}

function InsurancePlanTableRow({ plan }: { plan: InsurancePlanTemplate }) {
  return (
    <div
      className={cn(
        TABLE_GRID,
        "min-h-[72px] items-center border-b border-border last:border-b-0",
      )}
    >
      <div className="flex min-w-0 items-center gap-3 py-2 pl-3 pr-2">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
          <span className="text-sm font-medium text-muted-foreground">
            {plan.carrierName.charAt(0)}
          </span>
        </div>
        <span className="truncate text-sm font-medium text-foreground">
          {plan.carrierName}
        </span>
      </div>
      <div className="flex min-w-0 items-center p-2">
        <span className="truncate text-sm text-muted-foreground">
          {plan.planName}
        </span>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1.5 p-2">
        <div className="flex gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Tier 1:
          </span>
          <span className="text-xs text-muted-foreground">
            {plan.coInsurance.tier1}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Tier 2:
          </span>
          <span className="text-xs text-muted-foreground">
            {plan.coInsurance.tier2}
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-1.5 p-2">
        <div className="flex gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Tier 1:
          </span>
          <span className="text-xs text-muted-foreground">
            {plan.deductible.tier1}
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">
            Tier 2:
          </span>
          <span className="text-xs text-muted-foreground">
            {plan.deductible.tier2}
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-col items-start gap-2 p-2">
        {plan.verified && (
          <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
        )}
        <span className="text-xs text-muted-foreground">
          {plan.verifiedDate}
        </span>
      </div>
      <div className="flex w-10 items-center justify-center px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Verify</DropdownMenuItem>
            <DropdownMenuItem>More options</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
