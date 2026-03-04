export type InsurancePlanTemplate = {
  id: string;
  carrierName: string;
  carrierLogo?: string;
  planName: string;
  coInsurance: {
    tier1: string;
    tier2: string;
  };
  deductible: {
    tier1: string;
    tier2: string;
  };
  verified: boolean;
  verifiedDate: string;
};

export const SAMPLE_INSURANCE_PLANS: InsurancePlanTemplate[] = Array.from(
  { length: 12 },
  (_, i) => ({
    id: `plan-${i + 1}`,
    carrierName: "Aenta",
    planName: "Gold Choice PPO Plan",
    coInsurance: {
      tier1: "0% per visit",
      tier2: "20% per visit",
    },
    deductible: {
      tier1: "$0.00 per calendar year",
      tier2: "$1,500.00 per calendar year",
    },
    verified: true,
    verifiedDate: "Jan 25, 2026",
  }),
);
