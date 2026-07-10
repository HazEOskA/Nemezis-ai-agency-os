import {
  alerts as controlDeskAlerts,
  candidates,
  companies,
  documents,
  inboxMessages,
  leaveRequests,
  payrollRows,
  workers
} from './control-desk-fixtures';
import {
  coordinatorProfiles,
  importantNumbers,
  initialBuddy,
  initialMessenger,
  initialPlanning,
  type AgencyMessage,
  type BuddyProfile,
  type ImportantNumber,
  type MessageActor,
  type PlanningShift
} from './agency-domain';

export type DemoCaseStatus = 'open' | 'resolved';

export type DemoCase = {
  id: string;
  category: 'transport';
  severity: 'orange';
  status: DemoCaseStatus;
  worker: string;
  client: string;
  coordinator: string;
  shift: string;
  pickup: string;
  pickupLocation: string;
  source: 'Worker Buddy';
  createdAt: string;
  resolvedAt?: string;
};

export type DemoEvent = {
  id: string;
  type: 'system.ready' | 'case.created' | 'case.resolved' | 'message.sent' | 'planning.acknowledged' | 'demo.reset';
  actor: 'worker' | 'coordinator' | 'hr' | 'boss' | 'owner' | 'system';
  timestamp: string;
  message: string;
  caseId?: string;
};

export type DemoAction = {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  task: string;
  due: string;
  category: 'Staffing' | 'Contracts' | 'Placement' | 'Payroll' | 'Leave';
  source: 'Control Desk' | 'Worker Buddy';
  caseId?: string;
};

export type DemoAlert = {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  message: string;
  action: string;
  link: string;
  source: 'Control Desk' | 'Worker Buddy';
};

export type DemoState = {
  version: 'v0.4-four-branch-kernel';
  persistence: 'memory';
  kernel: {
    status: 'ready';
    eventBus: 'active';
    services: string[];
  };
  agency: {
    name: 'Nemezis Logistics Staffing';
    sourceModel: 'Control Desk audited fixtures';
  };
  workerReady: boolean;
  case: DemoCase | null;
  hierarchy: {
    boss: string;
    hrAdmin: string;
    coordinators: string;
    workers: string;
  };
  shared: {
    planning: PlanningShift[];
    messenger: AgencyMessage[];
    importantNumbers: ImportantNumber[];
    buddy: BuddyProfile;
  };
  operations: {
    metrics: {
      urgentAlerts: number;
      unreadMessages: number;
      contractsToSign: number;
      missingHours: number;
      payrollToCheck: number;
      pendingLeave: number;
      documentsNeedAction: number;
      staffingIssues: number;
    };
    quickStats: {
      candidates: number;
      newCandidates: number;
      activeWorkers: number;
      notActiveWorkers: number;
      companies: number;
      companiesWithIssues: number;
      estimatedPayroll: number;
      flaggedPayroll: number;
    };
    modules: {
      candidates: typeof candidates;
      workers: typeof workers;
      messages: typeof inboxMessages;
      companies: typeof companies;
      documents: typeof documents;
      payroll: typeof payrollRows;
      leave: typeof leaveRequests;
      messenger: AgencyMessage[];
    };
    alerts: DemoAlert[];
    queue: DemoAction[];
  };
  owner: {
    activeWorkers: number;
    readyWorkers: number;
    attendanceHealth: number;
    clientImpact: 'Low' | 'Medium';
    casesClosedToday: number;
    operationalPulse: number;
    coordinatorsOnline: number;
    hrActionsOpen: number;
    messagesToReview: number;
  };
  boss: {
    activeWorkers: number;
    readyWorkers: number;
    attendanceHealth: number;
    clientImpact: 'Low' | 'Medium';
    casesClosedToday: number;
    operationalPulse: number;
    coordinatorsOnline: number;
    hrActionsOpen: number;
    messagesToReview: number;
  };
  events: DemoEvent[];
};

type RuntimeState = Pick<DemoState, 'workerReady' | 'case' | 'events'> & {
  planning: PlanningShift[];
  messages: AgencyMessage[];
  buddy: BuddyProfile;
};

const actionQueue: DemoAction[] = [
  { id: 'action-001', priority: 'critical', task: 'Respond to LogiTrans: confirm 3 drivers for tomorrow 06:00', due: 'By 18:00 today', category: 'Staffing', source: 'Control Desk' },
  { id: 'action-002', priority: 'critical', task: 'Renew Altan Çetin contract — expires July 15', due: 'Within 3 days', category: 'Contracts', source: 'Control Desk' },
  { id: 'action-003', priority: 'critical', task: 'Find replacement welder for MetalWorks (Oğuzhan sick)', due: 'Today', category: 'Placement', source: 'Control Desk' },
  { id: 'action-004', priority: 'high', task: 'Chase Vasile Rusu for W26 timesheet — payroll blocked', due: 'Today', category: 'Payroll', source: 'Control Desk' },
  { id: 'action-005', priority: 'high', task: 'Approve/review Emre Yılmaz 5h overtime W27', due: 'Today', category: 'Payroll', source: 'Control Desk' },
  { id: 'action-006', priority: 'high', task: 'Send offer letter to Elif Şahin for signature', due: 'By Jul 5', category: 'Contracts', source: 'Control Desk' },
  { id: 'action-007', priority: 'medium', task: 'Review Justyna Kaczmarek maternity leave — plan replacement', due: 'This week', category: 'Leave', source: 'Control Desk' },
  { id: 'action-008', priority: 'medium', task: 'Place Kerem Öztürk — off assignment 2 weeks', due: 'This week', category: 'Placement', source: 'Control Desk' }
];

const initialRuntime = (): RuntimeState => ({
  workerReady: true,
  case: null,
  planning: clone(initialPlanning),
  messages: clone(initialMessenger),
  buddy: clone(initialBuddy),
  events: [
    {
      id: 'evt_system_ready',
      type: 'system.ready',
      actor: 'system',
      timestamp: new Date().toISOString(),
      message: 'Agency kernel booted with Control Desk fixture services'
    }
  ]
});

class AgencyKernel {
  private runtime: RuntimeState = initialRuntime();
  private listeners = new Map<string, Set<(event: DemoEvent) => void>>();

  on(type: DemoEvent['type'], listener: (event: DemoEvent) => void) {
    const listeners = this.listeners.get(type) ?? new Set<(event: DemoEvent) => void>();
    listeners.add(listener);
    this.listeners.set(type, listeners);
    return () => listeners.delete(listener);
  }

  emit(event: Omit<DemoEvent, 'id' | 'timestamp'>) {
    const next: DemoEvent = {
      ...event,
      id: `evt_${Date.now()}_${this.runtime.events.length}`,
      timestamp: new Date().toISOString()
    };
    this.runtime.events.unshift(next);
    this.runtime.events = this.runtime.events.slice(0, 50);
    this.listeners.get(event.type)?.forEach((listener) => listener(next));
  }

  reset() {
    this.runtime = initialRuntime();
  }

  getRuntime() {
    return this.runtime;
  }
}

const globalForDemo = globalThis as typeof globalThis & {
  __nemezisAgencyKernel?: AgencyKernel;
};

function kernel() {
  if (!globalForDemo.__nemezisAgencyKernel) {
    globalForDemo.__nemezisAgencyKernel = new AgencyKernel();
  }

  return globalForDemo.__nemezisAgencyKernel;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getOperations(runtime: RuntimeState): DemoState['operations'] {
  const metrics = {
    urgentAlerts: controlDeskAlerts.filter((alert) => alert.type === 'urgent').length,
    unreadMessages: inboxMessages.filter((message) => !message.read).length + runtime.messages.filter((message) => !message.read && message.recipientRole !== 'worker').length,
    contractsToSign: documents.filter((document) => document.status === 'pending').length,
    missingHours: workers.filter((worker) => worker.hoursThisWeek === 0 && worker.status === 'active').length,
    payrollToCheck: payrollRows.filter((row) => row.status === 'flagged' || row.status === 'pending').length,
    pendingLeave: leaveRequests.filter((request) => request.status === 'pending').length,
    documentsNeedAction: documents.filter((document) => document.status === 'missing' || document.status === 'expiring').length,
    staffingIssues: companies.reduce((total, company) => total + company.issues, 0)
  };

  const baseAlerts: DemoAlert[] = controlDeskAlerts.map((alert) => ({
    id: alert.id,
    type: alert.type as DemoAlert['type'],
    message: alert.message,
    action: alert.action,
    link: alert.link,
    source: 'Control Desk'
  }));

  const buddyAlert: DemoAlert | null = runtime.case
    ? {
        id: `buddy-${runtime.case.id}`,
        type: runtime.case.status === 'open' ? 'urgent' : 'info',
        message: runtime.case.status === 'open'
          ? `${runtime.case.worker} reported a transport problem before the ${runtime.case.shift} shift`
          : `Transport case ${runtime.case.id} resolved for ${runtime.case.worker}`,
        action: runtime.case.status === 'open' ? 'Resolve' : 'Review',
        link: '#buddy-case',
        source: 'Worker Buddy'
      }
    : null;

  const buddyAction: DemoAction | null = runtime.case?.status === 'open'
    ? {
        id: `buddy-action-${runtime.case.id}`,
        priority: 'critical',
        task: `Confirm transport solution for ${runtime.case.worker} before ${runtime.case.pickup}`,
        due: 'Before pickup',
        category: 'Staffing',
        source: 'Worker Buddy',
        caseId: runtime.case.id
      }
    : null;

  return {
    metrics,
    modules: {
      candidates,
      workers,
      messages: inboxMessages,
      companies,
      documents,
      payroll: payrollRows,
      leave: leaveRequests,
      messenger: runtime.messages
    },
    quickStats: {
      candidates: candidates.length,
      newCandidates: candidates.filter((candidate) => candidate.status === 'new').length,
      activeWorkers: workers.filter((worker) => worker.status === 'active').length,
      notActiveWorkers: workers.filter((worker) => worker.status !== 'active').length,
      companies: companies.length,
      companiesWithIssues: companies.filter((company) => company.issues > 0).length,
      estimatedPayroll: payrollRows.reduce((total, row) => total + row.estimatedGross, 0),
      flaggedPayroll: payrollRows.filter((row) => row.status === 'flagged').length
    },
    alerts: buddyAlert ? [buddyAlert, ...baseAlerts] : baseAlerts,
    queue: buddyAction ? [buddyAction, ...actionQueue] : actionQueue
  };
}

function buildState(): DemoState {
  const current = kernel().getRuntime();
  const operations = getOperations(current);
  const activeWorkers = operations.quickStats.activeWorkers;
  const missingHours = operations.metrics.missingHours;
  const caseOpen = current.case?.status === 'open';
  const caseResolved = current.case?.status === 'resolved';
  const coordinatorsOnline = coordinatorProfiles.filter((coordinator) => coordinator.online).length;
  const hrActionsOpen = operations.queue.filter((action) => action.source === 'Control Desk').length;
  const messagesToReview = current.messages.filter((message) => !message.read && message.recipientRole !== 'worker').length;
  const bossSnapshot = {
    activeWorkers,
    readyWorkers: activeWorkers - missingHours + (caseResolved ? 1 : 0),
    attendanceHealth: caseResolved ? 98.4 : caseOpen ? 96.8 : 96.8,
    clientImpact: caseOpen ? 'Medium' as const : 'Low' as const,
    casesClosedToday: caseResolved ? 12 : 11,
    operationalPulse: caseResolved ? 98 : caseOpen ? 91 : 96,
    coordinatorsOnline,
    hrActionsOpen,
    messagesToReview
  };

  return {
    version: 'v0.4-four-branch-kernel',
    persistence: 'memory',
    kernel: {
      status: 'ready',
      eventBus: 'active',
      services: ['fixture-data', 'operations-overview', 'worker-buddy']
    },
    agency: {
      name: 'Nemezis Logistics Staffing',
      sourceModel: 'Control Desk audited fixtures'
    },
    workerReady: current.workerReady,
    case: current.case,
    hierarchy: {
      boss: 'Linda van den Berg',
      hrAdmin: 'HR / Administration',
      coordinators: '3 coordinators · 42 assigned workers',
      workers: 'Worker Preview · read-only operational surface'
    },
    shared: {
      planning: clone(current.planning),
      messenger: clone(current.messages),
      importantNumbers: clone(importantNumbers),
      buddy: clone(current.buddy)
    },
    operations,
    owner: bossSnapshot,
    boss: bossSnapshot,
    events: clone(current.events)
  };
}

export function getDemoState() {
  return clone(buildState());
}

export function createTransportCase() {
  const current = kernel().getRuntime();

  if (current.case) {
    return { created: false, state: getDemoState() };
  }

  current.case = {
    id: 'TRN-2048',
    category: 'transport',
    severity: 'orange',
    status: 'open',
    worker: 'Mila Ionescu',
    client: 'FreshLogistics',
    coordinator: 'Anna Nowak',
    shift: '06:00–14:00',
    pickup: '05:15',
    pickupLocation: 'Location A',
    source: 'Worker Buddy',
    createdAt: new Date().toISOString()
  };
  current.workerReady = false;
  kernel().emit({
    type: 'case.created',
    actor: 'worker',
    message: 'Worker Buddy created a transport case',
    caseId: current.case.id
  });

  return { created: true, state: getDemoState() };
}

export function resolveTransportCase(caseId: string) {
  const current = kernel().getRuntime();

  if (!current.case || current.case.id !== caseId) {
    return { resolved: false, reason: 'CASE_NOT_FOUND' as const, state: getDemoState() };
  }

  if (current.case.status === 'resolved') {
    return { resolved: false, reason: 'ALREADY_RESOLVED' as const, state: getDemoState() };
  }

  current.case.status = 'resolved';
  current.case.resolvedAt = new Date().toISOString();
  current.workerReady = true;
  kernel().emit({
    type: 'case.resolved',
    actor: 'coordinator',
    message: 'Coordinator confirmed the transport solution',
    caseId
  });

  return { resolved: true, state: getDemoState() };
}

export function sendAgencyMessage(input: {
  body: string;
  actor: MessageActor;
  sender: string;
  recipient: string;
  recipientRole: MessageActor;
  source?: AgencyMessage['source'];
}) {
  const current = kernel().getRuntime();
  const body = input.body.trim();

  if (!body) {
    return {sent: false, reason: 'EMPTY_MESSAGE' as const, state: getDemoState()};
  }

  const message: AgencyMessage = {
    id: `msg-${Date.now()}`,
    threadId: `thread-${input.sender.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    sender: input.sender,
    senderRole: input.actor,
    recipient: input.recipient,
    recipientRole: input.recipientRole,
    body,
    time: new Date().toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'}),
    read: false,
    priority: 'normal',
    source: input.source || 'Messenger'
  };

  current.messages.push(message);
  kernel().emit({
    type: 'message.sent',
    actor: input.actor,
    message: `${input.actor} sent a messenger message to ${input.recipient}`
  });

  return {sent: true, message, state: getDemoState()};
}

export function acknowledgePlanning(shiftId: string) {
  const current = kernel().getRuntime();
  const shift = current.planning.find((item) => item.id === shiftId);

  if (!shift) {
    return {acknowledged: false, reason: 'SHIFT_NOT_FOUND' as const, state: getDemoState()};
  }

  shift.acknowledged = true;
  if (shift.status === 'pending') shift.status = 'confirmed';
  kernel().emit({
    type: 'planning.acknowledged',
    actor: 'worker',
    message: `${shift.workerName} acknowledged ${shift.client} planning`,
    caseId: shift.id
  });

  return {acknowledged: true, shift, state: getDemoState()};
}

export function resetDemoState() {
  kernel().reset();
  kernel().emit({
    type: 'demo.reset',
    actor: 'system',
    message: 'Demo state reset'
  });

  return getDemoState();
}
