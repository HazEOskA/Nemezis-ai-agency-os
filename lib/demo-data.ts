export const demoWorker = {
  name: 'Mila Ionescu',
  locale: 'ro',
  coordinator: 'Anna Nowak',
  client: 'FreshLogistics',
  shift: '06:00–14:00',
  pickup: '05:15',
  pickupLocation: 'Location A',
  caseId: 'TRN-2048'
} as const;

export const demoSteps = [
  'onboarded',
  'shift-assigned',
  'buddy-opened',
  'case-created',
  'case-resolved'
] as const;
