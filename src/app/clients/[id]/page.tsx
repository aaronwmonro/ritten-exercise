"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  Pencil,
  MoreVertical,
  UserRound,
  Phone,
  Plus,
  Ellipsis,
  BadgeCheck,
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
import { SidebarIconStrip } from "@/components/sidebar-icon-strip";
import {
  getClientDetailById,
  type ClientDetail,
  type InsurancePlan,
} from "@/lib/mock-clients";
import { cn } from "@/lib/utils";

const CLIENT_NAV_ITEMS = [
  "Chart",
  "Information",
  "Agenda",
  "Plan",
  "MAR",
  "Biometrics",
  "Rounds",
  "Trends",
  "Attachments",
  "Payment",
];

const INFO_TABS = ["General", "Coverage", "Care", "Clinical", "History"];

type InfoTab = (typeof INFO_TABS)[number];

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const client = getClientDetailById(id);
  const [activeTab, setActiveTab] = useState<InfoTab>("General");

  if (!client) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Client not found</p>
          <Link
            href="/"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Back to clients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SidebarIconStrip clientsActive />

      {/* Client sidebar */}
      <div className="flex w-[300px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex flex-col gap-4 border-b border-sidebar-border px-4 pb-4 pt-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Clients
            </Link>
            <Badge variant="success" className="text-xs font-semibold">
              {client.status}
            </Badge>
          </div>
          <div className="flex gap-3.5">
            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-muted">
              <span className="text-xs font-medium text-muted-foreground">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-foreground">
                {client.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                DOB: {client.dob} ({client.age})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search..." className="h-9 pl-9" readOnly />
            </div>
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
              <Pencil className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>More options</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <nav className="flex-1 p-2">
          <div className="flex flex-col gap-0.5">
            {CLIENT_NAV_ITEMS.map((item) => (
              <button
                key={item}
                type="button"
                className={cn(
                  "flex h-8 w-full items-center rounded-md px-2 text-sm transition-colors",
                  item === "Information"
                    ? "bg-sidebar-border font-medium text-sidebar-accent-foreground"
                    : "font-normal text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-background">
        <div className="flex h-12 items-center px-6 py-3">
          <h1 className="text-lg font-medium text-foreground">Information</h1>
        </div>
        <div className="flex items-center gap-2 border-b border-border px-4 pb-3">
          {INFO_TABS.map((tab) => (
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
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "Coverage" ? (
            <CoverageTabContent client={client} />
          ) : (
          <div className="grid grid-cols-[407px_1fr] gap-6">
            {/* Demographic card */}
            <div className="flex flex-col gap-6 rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Demographic
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 py-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Edit
                </Button>
              </div>
              <div className="flex h-[98px] w-[98px] items-center justify-center rounded-full bg-muted">
                <span className="text-2xl font-medium text-muted-foreground">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <InfoField
                  label="Preferred Name"
                  value={client.preferredName}
                />
                <InfoField label="Full Legal Name" value={client.name} />
                <InfoField label="Gender" value={client.gender} />
                <InfoField label="Pronouns" value={client.pronouns} />
                <InfoField label="Date of Birth" value="00/00/0000" />
                <InfoField label="Age" value={`${client.age} yrs old`} />
                <InfoField
                  label="Race / Ethnicity"
                  value={client.raceEthnicity}
                />
                <InfoField
                  label="Marital Status"
                  value={client.maritalStatus}
                />
                <InfoField label="SSN" value={client.ssn} />
                <InfoField label="NPI" value={client.npi} />
              </div>
            </div>

            {/* Client Contacts card */}
            <div className="flex flex-col gap-4 rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Client Contacts
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto gap-1 px-0 py-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
              <div className="flex flex-col overflow-hidden rounded-md border border-border">
                {client.contacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="flex items-center border-b border-border last:border-b-0"
                  >
                    <div className="flex w-[151px] shrink-0 items-center gap-3 p-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-foreground">
                          {contact.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {contact.relationship}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-[85px] flex-1 p-2">
                      <p className="truncate text-xs text-muted-foreground">
                        {contact.phone}
                      </p>
                    </div>
                    <div className="min-w-[85px] flex-1 p-2">
                      <p className="truncate text-xs text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                    <div className="w-[98px] shrink-0 p-2">
                      {contact.isEmergency ? (
                        <Badge className="text-xs font-semibold">
                          Emergency
                        </Badge>
                      ) : null}
                    </div>
                    <div className="flex shrink-0 items-center p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Ellipsis className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="flex flex-col gap-4 rounded-md border border-border bg-background p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Contact
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-0 py-0 text-xs text-muted-foreground hover:text-foreground"
                >
                  Edit
                </Button>
              </div>
              <div className="flex flex-col gap-x-8 gap-y-4 text-sm">
                <InfoField label="Phone" value={client.phone} />
                <InfoField label="Phone Type" value={client.phoneType} />
                <InfoField label="Email" value={client.email} />
                <div>
                  <p className="font-medium text-muted-foreground">Address</p>
                  <p className="text-foreground">
                    {client.address}
                    <br />
                    {client.cityStateZip}
                  </p>
                </div>
                <InfoField
                  label="Preferred Contact"
                  value={client.preferredContact}
                />
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CoverageTabContent({ client }: { client: ClientDetail }) {
  const plans = client.insurancePlans ?? [];

  return (
    <div className="flex max-w-[525px] flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-foreground">Insurance</h2>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
      {plans.map((plan) => (
        <InsurancePlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

function InsurancePlanCard({ plan }: { plan: InsurancePlan }) {
  const deductiblePercent = plan.deductible.total
    ? Math.round((plan.deductible.met / plan.deductible.total) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6 rounded-md border border-border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
            {plan.carrier.charAt(0)}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1 text-base font-semibold text-foreground">
              <span>{plan.carrier}</span>
              <span className="text-muted-foreground">•</span>
              <span>{plan.planName}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" className="text-xs font-semibold">
                {plan.status}
              </Badge>
              {plan.isPrimary && (
                <Badge
                  variant="secondary"
                  className="border-transparent bg-muted text-muted-foreground"
                >
                  Primary
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Member ID: {plan.memberId}
              <span className="mx-1 font-semibold text-foreground">•</span>
              Group ID: {plan.groupId}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Pencil className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>More options</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-3 rounded-md border border-border p-3">
          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">Copay</p>
              <p className="text-base text-foreground">{plan.copay}</p>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">Coinsurance</p>
              <p className="text-base text-foreground">{plan.coinsurance}</p>
            </div>
            <div className="flex flex-1 flex-col gap-0.5">
              <p className="text-xs text-muted-foreground">OOP Max</p>
              <p className="text-base text-foreground">{plan.oopMax}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-muted-foreground">
              Deductible
            </p>
            <div className="h-2 w-full overflow-hidden rounded bg-muted">
              <div
                className="h-full rounded bg-primary transition-all"
                style={{ width: `${Math.min(deductiblePercent, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {deductiblePercent}% met
            </p>
          </div>
        </div>
        <div className="flex w-[142px] shrink-0 flex-col gap-2 rounded-md border border-border p-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Benefits</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {plan.benefitsVerified ? (
            <Badge variant="success" className="w-fit text-xs font-semibold">
              Verified
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="w-fit border-transparent bg-muted text-muted-foreground"
            >
              Not verified
            </Badge>
          )}
          <p className="text-xs font-medium text-muted-foreground">
            {plan.benefitsVerifiedDate}
          </p>
          <Button variant="outline" size="sm" className="h-9 w-full gap-2">
            <BadgeCheck className="h-4 w-4" />
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium text-muted-foreground">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  );
}
