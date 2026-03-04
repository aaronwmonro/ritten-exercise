export type Client = {
  id: number;
  name: string;
  dob: string;
  age: number;
  status: "Ready";
  upcomingApt: string;
  location: string;
  provider: string;
  insurance: string;
  insuranceId: string;
  coverage: string;
  coverageDate: string;
};

export type ClientContact = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  isEmergency?: boolean;
};

export type InsurancePlan = {
  id: string;
  carrier: string;
  planName: string;
  memberId: string;
  groupId: string;
  status: "Active" | "Inactive";
  isPrimary: boolean;
  copay: string;
  coinsurance: string;
  oopMax: string;
  deductible: { met: number; total: number };
  benefitsVerified: boolean;
  benefitsVerifiedDate: string;
};

export type ClientDetail = Client & {
  preferredName: string;
  gender: string;
  pronouns: string;
  raceEthnicity: string;
  maritalStatus: string;
  ssn: string;
  npi: string;
  phone: string;
  phoneType: string;
  email: string;
  address: string;
  cityStateZip: string;
  preferredContact: string;
  contacts: ClientContact[];
  insurancePlans: InsurancePlan[];
};

const baseClient: Omit<Client, "id"> = {
  name: "John Smith",
  dob: "Jan 25, 1996",
  age: 30,
  status: "Ready",
  upcomingApt: "Today @ 8 AM",
  location: "Rittenhouse Square",
  provider: "John Doe",
  insurance: "Cigna",
  insuranceId: "1234567890",
  coverage: "IOP/PHP",
  coverageDate: "Jan 25, 2026",
};

const baseDetail: Omit<
  ClientDetail,
  keyof Client
> = {
  preferredName: "Joe Smith",
  gender: "Male",
  pronouns: "He / Him",
  raceEthnicity: "White",
  maritalStatus: "Single",
  ssn: "•••-••-0000",
  npi: "N/A",
  phone: "000-000-0000",
  phoneType: "Mobile",
  email: "email@gmail.com",
  address: "00000 Street Name",
  cityStateZip: "Philadelphia, PA 00000",
  preferredContact: "Text message",
  insurancePlans: [
    {
      id: "1",
      carrier: "Aetna",
      planName: "Gold Choice PPO Plan",
      memberId: "1234567890",
      groupId: "1234567890",
      status: "Active",
      isPrimary: true,
      copay: "$25",
      coinsurance: "20%",
      oopMax: "$6,500",
      deductible: { met: 0, total: 1500 },
      benefitsVerified: true,
      benefitsVerifiedDate: "00/00/00",
    },
  ],
  contacts: [
    {
      name: "John Smith",
      relationship: "Mother",
      phone: "000-000-0000",
      email: "email@gmail.com",
      isEmergency: true,
    },
    {
      name: "John Smith",
      relationship: "Sister",
      phone: "000-000-0000",
      email: "email@gmail.com",
    },
    {
      name: "John Smith",
      relationship: "Sister",
      phone: "000-000-0000",
      email: "email@gmail.com",
    },
    {
      name: "John Smith",
      relationship: "Sister",
      phone: "000-000-0000",
      email: "email@gmail.com",
    },
  ],
};

export const SAMPLE_CLIENTS: Client[] = Array.from({ length: 14 }, (_, i) => ({
  ...baseClient,
  id: i + 1,
}));

export function getClientById(id: number): Client | undefined {
  return SAMPLE_CLIENTS.find((c) => c.id === id);
}

export function getClientDetailById(id: number): ClientDetail | undefined {
  const client = getClientById(id);
  if (!client) return undefined;
  return {
    ...client,
    ...baseDetail,
  };
}
