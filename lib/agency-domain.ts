export type PlanningStatus = 'confirmed' | 'pending' | 'attention' | 'complete';

export type MessageActor = 'worker' | 'coordinator' | 'hr' | 'boss';

export type AgencyMessage = {
  id: string;
  threadId: string;
  sender: string;
  senderRole: MessageActor;
  recipient: string;
  recipientRole: MessageActor;
  body: string;
  time: string;
  read: boolean;
  priority: 'normal' | 'high' | 'urgent';
  source: 'Messenger' | 'Worker Buddy' | 'System';
};

export type PlanningShift = {
  id: string;
  workerId: string;
  workerName: string;
  dateLabel: string;
  date: string;
  start: string;
  end: string;
  client: string;
  location: string;
  transport: string;
  coordinator: string;
  status: PlanningStatus;
  acknowledged: boolean;
};

export type ImportantNumber = {
  id: string;
  label: string;
  number: string;
  availability: string;
  note: string;
  tone: 'red' | 'blue' | 'orange' | 'green';
};

export type BuddyProfile = {
  active: boolean;
  day: number;
  totalDays: number;
  language: string;
  reminderLevel: 'low' | 'standard' | 'high';
  coordinator: string;
  humanContactAvailable: boolean;
};

export type CoordinatorProfile = {
  id: string;
  name: string;
  region: string;
  phone: string;
  online: boolean;
  assignedWorkers: number;
  openCases: number;
  languageCoverage: string[];
};

export const initialPlanning: PlanningShift[] = [
  {
    id: 'plan-mila-001',
    workerId: 'worker-mila',
    workerName: 'Mila Ionescu',
    dateLabel: 'Today · Monday, June 30',
    date: '2026-06-30',
    start: '06:00',
    end: '14:00',
    client: 'FreshLogistics',
    location: 'Distribution Hall 2',
    transport: 'Pickup 05:15 · Location A',
    coordinator: 'Anna Nowak',
    status: 'confirmed',
    acknowledged: false
  },
  {
    id: 'plan-mila-002',
    workerId: 'worker-mila',
    workerName: 'Mila Ionescu',
    dateLabel: 'Tomorrow · Tuesday, July 1',
    date: '2026-07-01',
    start: '14:00',
    end: '22:00',
    client: 'FreshLogistics',
    location: 'Distribution Hall 2',
    transport: 'Pickup 13:15 · Location A',
    coordinator: 'Anna Nowak',
    status: 'pending',
    acknowledged: false
  },
  {
    id: 'plan-mila-003',
    workerId: 'worker-mila',
    workerName: 'Mila Ionescu',
    dateLabel: 'Wednesday · July 2',
    date: '2026-07-02',
    start: '06:00',
    end: '14:00',
    client: 'FreshLogistics',
    location: 'Distribution Hall 2',
    transport: 'Pickup 05:15 · Location A',
    coordinator: 'Anna Nowak',
    status: 'pending',
    acknowledged: false
  },
  {
    id: 'plan-kamila-001',
    workerId: 'w004',
    workerName: 'Kamila Bąk',
    dateLabel: 'Today · Monday, June 30',
    date: '2026-06-30',
    start: '06:00',
    end: '14:00',
    client: 'FreshPack NL',
    location: 'Packing Line 4',
    transport: 'Pickup 05:20 · Housing A',
    coordinator: 'Anna Nowak',
    status: 'attention',
    acknowledged: true
  }
];

export const initialMessenger: AgencyMessage[] = [
  {
    id: 'msg-001',
    threadId: 'thread-mila-anna',
    sender: 'Anna Nowak',
    senderRole: 'coordinator',
    recipient: 'Mila Ionescu',
    recipientRole: 'worker',
    body: 'Cześć Mila, jutrzejsza zmiana jest potwierdzona. Daj znać, jeśli transport nie będzie jasny.',
    time: '08:42',
    read: true,
    priority: 'normal',
    source: 'Messenger'
  },
  {
    id: 'msg-002',
    threadId: 'thread-mila-anna',
    sender: 'Mila Ionescu',
    senderRole: 'worker',
    recipient: 'Anna Nowak',
    recipientRole: 'coordinator',
    body: 'Czy bus zatrzymuje się dziś przy Location A o 05:15?',
    time: '08:47',
    read: false,
    priority: 'high',
    source: 'Messenger'
  },
  {
    id: 'msg-003',
    threadId: 'thread-kamila-anna',
    sender: 'Worker Buddy',
    senderRole: 'worker',
    recipient: 'Anna Nowak',
    recipientRole: 'coordinator',
    body: 'Kamila Bąk ma przedłużoną nieobecność chorobową. Wymagany dokument medyczny.',
    time: '08:15',
    read: false,
    priority: 'urgent',
    source: 'Worker Buddy'
  },
  {
    id: 'msg-004',
    threadId: 'thread-hr-anna',
    sender: 'Linda van den Berg',
    senderRole: 'hr',
    recipient: 'Anna Nowak',
    recipientRole: 'coordinator',
    body: 'Pamiętaj o potwierdzeniu zastępstwa dla MetalWorks przed 12:00.',
    time: '07:55',
    read: true,
    priority: 'high',
    source: 'Messenger'
  }
];

export const importantNumbers: ImportantNumber[] = [
  {id: 'number-emergency', label: 'Emergency', number: '112', availability: '24/7', note: 'Immediate danger, medical emergency or fire', tone: 'red'},
  {id: 'number-coordinator', label: 'Your coordinator', number: '+31 6 1234 5678', availability: '06:00–22:00', note: 'Anna Nowak · Polish / Romanian / English', tone: 'blue'},
  {id: 'number-transport', label: 'Transport desk', number: '+31 6 9988 1122', availability: '05:00–23:00', note: 'Bus, pickup point or route problems', tone: 'orange'},
  {id: 'number-housing', label: 'Housing support', number: '+31 6 8877 2211', availability: '08:00–20:00', note: 'Accommodation and urgent housing issues', tone: 'green'},
  {id: 'number-hr', label: 'HR / administration', number: '+31 10 455 8899', availability: '09:00–17:00', note: 'Documents, contracts and official records', tone: 'blue'}
];

export const initialBuddy: BuddyProfile = {
  active: true,
  day: 1,
  totalDays: 60,
  language: 'Romanian',
  reminderLevel: 'standard',
  coordinator: 'Anna Nowak',
  humanContactAvailable: true
};

export const coordinatorProfiles: CoordinatorProfile[] = [
  {id: 'coord-anna', name: 'Anna Nowak', region: 'Rotterdam / Westland', phone: '+31 6 1234 5678', online: true, assignedWorkers: 17, openCases: 3, languageCoverage: ['PL', 'RO', 'EN']},
  {id: 'coord-mark', name: 'Mark Jansen', region: 'Dordrecht / Tilburg', phone: '+31 6 2345 6789', online: true, assignedWorkers: 14, openCases: 2, languageCoverage: ['NL', 'EN', 'TR']},
  {id: 'coord-sophie', name: 'Sophie de Wit', region: 'Westland / Den Haag', phone: '+31 6 3456 7890', online: false, assignedWorkers: 11, openCases: 4, languageCoverage: ['NL', 'EN', 'FR']}
];
