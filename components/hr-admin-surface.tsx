'use client';

import {useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {useTranslations} from 'next-intl';
import type {DemoState} from '../lib/demo-store';

export type HRModule = 'dashboard' | 'candidates' | 'workers' | 'inbox' | 'companies' | 'documents' | 'payroll' | 'leave';

type Translator = ReturnType<typeof useTranslations>;
type HRModules = DemoState['operations']['modules'];
type Company = HRModules['companies'][number];
type Candidate = HRModules['candidates'][number];
type InboxMessage = HRModules['messages'][number];

const navigation: Array<{id: HRModule; label: string; icon: string; badge?: number}> = [
  {id: 'dashboard', label: 'Dashboard', icon: '⌂'},
  {id: 'candidates', label: 'Candidates', icon: '♙'},
  {id: 'workers', label: 'Active Workers', icon: '▣'},
  {id: 'inbox', label: 'Inbox', icon: '✉', badge: 8},
  {id: 'companies', label: 'Companies', icon: '▥'},
  {id: 'documents', label: 'Documents', icon: '▤', badge: 4},
  {id: 'payroll', label: 'Payroll Preview', icon: '▣', badge: 3},
  {id: 'leave', label: 'Leave Requests', icon: '□', badge: 3}
];

export function HRAdminNav({active, onChange}: {active: HRModule; onChange: (module: HRModule) => void}) {
  return (
    <div className="hr-sidebar-nav">
      {navigation.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? 'nav-item nav-item-active' : 'nav-item'}
          type="button"
          onClick={() => onChange(item.id)}
        >
          <span className="nav-glyph">{item.icon}</span>
          <span>{item.label}</span>
          {item.badge ? <span className="nav-count">{item.badge}</span> : null}
        </button>
      ))}
    </div>
  );
}

function Dot({tone = 'blue'}: {tone?: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'yellow'}) {
  return <span className={`hr-dot hr-dot-${tone}`} aria-hidden="true" />;
}

function StatusPill({status}: {status: string}) {
  const normalized = status.toLowerCase().replace(/\s+/g, '-');
  return <span className={`hr-status-pill hr-status-${normalized}`}>{status}</span>;
}

function PageHeader({
  kicker = 'HR / ADMINISTRATION',
  title,
  subtitle,
  action,
  onAction
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <section className="hr-page-header">
      <div>
        <span className="hr-kicker"><Dot /> {kicker}</span>
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? <button className="hr-primary-button" type="button" onClick={onAction}>{action}</button> : null}
    </section>
  );
}

function MetricCard({label, value, tone, icon}: {label: string; value: string | number; tone: 'red' | 'blue' | 'orange' | 'yellow' | 'purple'; icon: string}) {
  return (
    <div className={`hr-metric-card hr-metric-${tone}`}>
      <div className="hr-metric-top"><span className="hr-metric-icon">{icon}</span><Dot tone={tone === 'red' ? 'red' : tone === 'orange' || tone === 'yellow' ? 'orange' : tone === 'purple' ? 'purple' : 'blue'} /></div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function DashboardView({state, t, notify}: {state: DemoState; t: Translator; notify: (message: string) => void}) {
  const {metrics, quickStats, alerts, queue} = state.operations;
  return (
    <>
      <PageHeader
        title="Today’s Command Center"
        subtitle="Good morning, Linda · Monday, June 30, 2026 · Week 27"
        action="Live · HR desk"
        onAction={() => notify('HR workspace is connected to the live demo state.')}
      />

      <section className="hr-metric-grid">
        <MetricCard label="Urgent Alerts" value={metrics.urgentAlerts} tone="red" icon="!" />
        <MetricCard label="Messages to Review" value={metrics.unreadMessages} tone="blue" icon="✉" />
        <MetricCard label="Contracts to Sign" value={metrics.contractsToSign} tone="purple" icon="▤" />
        <MetricCard label="Missing Hours" value={metrics.missingHours} tone="orange" icon="◷" />
        <MetricCard label="Payroll to Check" value={metrics.payrollToCheck} tone="yellow" icon="€" />
        <MetricCard label="Leave Requests" value={metrics.pendingLeave} tone="blue" icon="□" />
        <MetricCard label="Missing Documents" value={metrics.documentsNeedAction} tone="orange" icon="!" />
        <MetricCard label="Staffing Issues" value={metrics.staffingIssues} tone="red" icon="▥" />
      </section>

      <section className="hr-dashboard-grid">
        <div className="hr-panel">
          <div className="hr-panel-heading"><div><span className="hr-kicker">{t('urgent')}</span><h2>Alerts requiring attention</h2></div><span className="hr-panel-count">{alerts.length}</span></div>
          <div className="hr-alert-list">
            {alerts.slice(0, 6).map((alert) => (
              <button className="hr-alert-row" type="button" key={alert.id} onClick={() => notify(alert.message)}>
                <Dot tone={alert.type === 'urgent' ? 'red' : alert.type === 'warning' ? 'orange' : 'blue'} />
                <span>{alert.message}</span>
                <small>{alert.source}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="hr-panel">
          <div className="hr-panel-heading"><div><span className="hr-kicker">HR queue</span><h2>Priority actions</h2></div><span className="hr-panel-count">{queue.length}</span></div>
          <div className="hr-action-list">
            {queue.slice(0, 6).map((action) => (
              <button className="hr-action-row" type="button" key={action.id} onClick={() => notify(action.task)}>
                <Dot tone={action.priority === 'critical' ? 'red' : action.priority === 'high' ? 'orange' : 'yellow'} />
                <span><strong>{action.task}</strong><small>{action.due} · {action.category}</small></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="hr-quick-stats">
        <div><strong>{quickStats.candidates}</strong><span>Candidates</span><small>{quickStats.newCandidates} new this week</small></div>
        <div><strong>{quickStats.activeWorkers}</strong><span>Active Workers</span><small>{quickStats.notActiveWorkers} not active</small></div>
        <div><strong>{quickStats.companies}</strong><span>Companies</span><small>{quickStats.companiesWithIssues} with open issues</small></div>
        <div><strong>€{quickStats.estimatedPayroll}</strong><span>Est. Payroll W27</span><small>{quickStats.flaggedPayroll} flagged</small></div>
      </section>
    </>
  );
}

function CompaniesView({companies, notify, onSelect}: {companies: HRModules['companies']; notify: (message: string) => void; onSelect: (company: Company) => void}) {
  const openRequests = companies.reduce((total, company) => total + company.openRequests, 0);
  const issues = companies.reduce((total, company) => total + company.issues, 0);
  return (
    <>
      <PageHeader title="Client Companies" subtitle={`${companies.length} clients · ${openRequests} open requests · ${issues} active issues`} action="+ Add Company" onAction={() => notify('Company creation is the next HR API action.')} />
      <section className="hr-company-grid">
        {companies.map((company) => (
          <button className="hr-company-card" type="button" key={company.id} onClick={() => onSelect(company)}>
            <div className="hr-company-heading"><div><h2>{company.name}</h2><p>{company.location} · {company.sector}</p></div><StatusPill status={company.payrollStatus} /></div>
            <div className="hr-company-metrics"><div><strong>{company.activeWorkers}</strong><span>Active Workers</span></div><div><strong>{company.openRequests}</strong><span>Open Requests</span></div><div><strong>{company.issues}</strong><span>Issues</span></div></div>
            <div className="hr-company-issues">{company.issueList.map((issue) => <span key={issue}><Dot tone="orange" />{issue}</span>)}</div>
          </button>
        ))}
      </section>
    </>
  );
}

function CandidatesView({candidates, notify, onSelect}: {candidates: HRModules['candidates']; notify: (message: string) => void; onSelect: (candidate: Candidate) => void}) {
  const [filter, setFilter] = useState<string>('all');
  const statuses = ['all', 'new', 'screening', 'interview', 'offer', 'placed', 'on_hold', 'rejected'];
  const filtered = filter === 'all' ? candidates : candidates.filter((candidate) => candidate.status === filter);
  return (
    <>
      <PageHeader title="Candidate Pipeline" subtitle={`${candidates.length} total · ${candidates.filter((candidate) => candidate.missingDocs.length > 0 || candidate.status === 'new').length} need action`} action="+ Add Candidate" onAction={() => notify('Candidate intake is the next HR API action.')} />
      <div className="hr-filter-row">{statuses.map((status) => <button className={filter === status ? 'hr-filter active' : 'hr-filter'} type="button" key={status} onClick={() => setFilter(status)}>{status === 'all' ? 'All' : status.replace('_', ' ')} <b>{status === 'all' ? candidates.length : candidates.filter((candidate) => candidate.status === status).length}</b></button>)}</div>
      <div className="hr-data-table hr-candidate-table">
        <div className="hr-table-head"><span>Name</span><span>Status</span><span>Desired Role</span><span>Missing Docs</span><span>Recruiter</span></div>
        {filtered.map((candidate) => <button className="hr-table-row" type="button" key={candidate.id} onClick={() => onSelect(candidate)}><span className="hr-person"><b>{candidate.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</b><em>{candidate.name}<small>{candidate.language}</small></em></span><span><StatusPill status={candidate.status.replace('_', ' ')} /></span><span>{candidate.desiredRole}</span><span className={candidate.missingDocs.length ? 'hr-danger-text' : 'hr-good-text'}>{candidate.missingDocs.length ? `${candidate.missingDocs.length} missing` : '✓ Complete'}</span><span>{candidate.recruiter.split(' ')[0]}</span></button>)}
      </div>
    </>
  );
}

function WorkersView({workers, notify}: {workers: HRModules['workers']; notify: (message: string) => void}) {
  const [filter, setFilter] = useState<string>('all');
  const statuses = ['all', 'active', 'on_leave', 'sick', 'off_assignment'];
  const filtered = filter === 'all' ? workers : workers.filter((worker) => worker.status === filter);
  return (
    <>
      <PageHeader title="Active Workers" subtitle={`${workers.length} total · ${workers.filter((worker) => worker.alerts.length > 0).length} with alerts · ${workers.filter((worker) => worker.hoursThisWeek === 0 && worker.status === 'active').length} missing hours`} action="+ Add Worker" onAction={() => notify('Worker onboarding is the next HR API action.')} />
      <div className="hr-filter-row">{statuses.map((status) => <button className={filter === status ? 'hr-filter active' : 'hr-filter'} type="button" key={status} onClick={() => setFilter(status)}>{status === 'all' ? 'All' : status.replace('_', ' ')} <b>{status === 'all' ? workers.length : workers.filter((worker) => worker.status === status).length}</b></button>)}</div>
      <div className="hr-data-table">
        <div className="hr-table-head"><span>Name</span><span>Company</span><span>Role</span><span>Hours</span><span>Est. Pay</span><span>Alerts</span></div>
        {filtered.map((worker) => <div className="hr-table-row" key={worker.id}><span className="hr-person"><b>{worker.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</b><em>{worker.name}<small>{worker.language}</small></em></span><span>{worker.company}</span><span>{worker.role}</span><span className={worker.hoursThisWeek === 0 ? 'hr-danger-text' : ''}>{worker.hoursThisWeek}/{worker.targetHours}</span><span className="hr-good-text">€{worker.estimatedPay.toFixed(0)}</span><span>{worker.alerts.length ? <StatusPill status={`${worker.alerts.length} alert${worker.alerts.length > 1 ? 's' : ''}`} /> : <span className="hr-good-text">✓</span>}</span></div>)}
      </div>
    </>
  );
}

function InboxView({messages, notify}: {messages: HRModules['messages']; notify: (message: string) => void}) {
  const [category, setCategory] = useState<string>('all');
  const [selected, setSelected] = useState<InboxMessage | null>(null);
  const categories = ['all', 'urgent', 'documents', 'payroll', 'leave', 'client', 'candidate', 'archive'];
  const filtered = category === 'all' ? messages : messages.filter((message) => message.category === category);
  return (
    <>
      <PageHeader title="Inbox Triage" subtitle={`${messages.length} total · ${messages.filter((message) => !message.read).length} unread · ${messages.filter((message) => message.category === 'urgent').length} urgent`} />
      <div className="hr-filter-row">{categories.map((item) => <button className={category === item ? 'hr-filter active' : 'hr-filter'} type="button" key={item} onClick={() => setCategory(item)}>{item === 'all' ? 'All' : item} <b>{item === 'all' ? messages.length : messages.filter((message) => message.category === item).length}</b></button>)}</div>
      <section className="hr-inbox-layout">
        <div className="hr-message-list">{filtered.map((message) => <button className={selected?.id === message.id ? 'hr-message-card selected' : 'hr-message-card'} type="button" key={message.id} onClick={() => setSelected(message)}><div><strong>{message.from}</strong><small>{message.time}</small></div><p>{message.subject}</p><span><StatusPill status={message.category} />{message.priority === 'high' && !message.read ? <Dot tone="red" /> : null}</span></button>)}</div>
        <div className="hr-message-detail">{selected ? <><div className="hr-message-detail-head"><span className="hr-kicker">{selected.category}</span><h2>{selected.subject}</h2><p>From: {selected.from} · {selected.time}</p></div><p className="hr-message-body">{selected.preview}</p><div className="hr-button-row"><button className="hr-primary-button" type="button" onClick={() => notify(`Reply prepared for ${selected.from}.`)}>Reply</button><button className="hr-secondary-button" type="button" onClick={() => notify('Message archived in demo state.')}>Archive</button></div></> : <div className="hr-empty-state"><span>✉</span><strong>Select a message to read</strong><small>Inbox triage keeps HR decisions in one place.</small></div>}</div>
      </section>
    </>
  );
}

function DocumentsView({documents, notify}: {documents: HRModules['documents']; notify: (message: string) => void}) {
  return (
    <>
      <PageHeader title="Documents & Contracts" subtitle={`${documents.length} total · ${documents.filter((document) => document.status === 'expiring').length} expiring · ${documents.filter((document) => document.status === 'missing').length} missing`} action="+ Upload Document" onAction={() => notify('Document upload is the next HR API action.')} />
      <div className="hr-data-table">
        <div className="hr-table-head"><span>Worker</span><span>Type</span><span>Status</span><span>Expiry</span><span>Notes</span></div>
        {documents.map((document) => <div className="hr-table-row" key={document.id}><span>{document.worker}</span><span>{document.type}</span><span><StatusPill status={document.status} /></span><span className={document.status === 'expiring' ? 'hr-warning-text' : ''}>{document.expiryDate}</span><span className={document.status === 'missing' || document.status === 'expiring' ? 'hr-warning-text' : ''}>{document.notes || '—'}</span></div>)}
      </div>
    </>
  );
}

function PayrollView({payroll, notify}: {payroll: HRModules['payroll']; notify: (message: string) => void}) {
  const total = payroll.reduce((sum, row) => sum + row.estimatedGross, 0);
  return (
    <>
      <PageHeader title="Payroll Preview" subtitle={`${payroll.length} entries · ${payroll.filter((row) => row.status === 'flagged').length} flagged · Est. total €${total.toFixed(0)}`} action="Review flagged" onAction={() => notify('Payroll review queue opened.')} />
      <div className="hr-notice hr-notice-orange">⚠ This is an operational estimate only — not legal payroll. All figures require review and approval before processing.</div>
      <div className="hr-data-table">
        <div className="hr-table-head"><span>Worker</span><span>Company</span><span>Week</span><span>Hours</span><span>Gross</span><span>Status / Risk</span></div>
        {payroll.map((row) => <div className={row.status === 'flagged' ? 'hr-table-row hr-row-flagged' : 'hr-table-row'} key={row.id}><span>{row.worker}</span><span>{row.company}</span><span>W{row.weekNumber}</span><span>{row.regularHours} + {row.overtimeHours} OT</span><span className={row.estimatedGross > 0 ? 'hr-good-text' : 'hr-danger-text'}>€{row.estimatedGross.toFixed(0)}</span><span><StatusPill status={row.status} />{row.riskFlag ? <small className="hr-risk-note">{row.riskFlag}</small> : null}</span></div>)}
      </div>
    </>
  );
}

function LeaveView({leave, notify}: {leave: HRModules['leave']; notify: (message: string) => void}) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  useEffect(() => setOverrides({}), [leave]);
  const items = leave.map((request) => ({...request, status: overrides[request.id] || request.status}));
  return (
    <>
      <PageHeader title="Leave Requests" subtitle={`${leave.length} requests · ${items.filter((request) => request.status === 'pending').length} pending approval · ${items.filter((request) => request.status === 'active').length} currently active`} />
      <div className="hr-notice hr-notice-blue">ⓘ Leave approvals here are for review only. Official leave records must be confirmed through your HR system.</div>
      <div className="hr-data-table hr-leave-table">
        <div className="hr-table-head"><span>Worker</span><span>Type</span><span>Days</span><span>Status</span><span>Actions</span></div>
        {items.map((request) => <div className="hr-table-row" key={request.id}><span><b>{request.worker}</b><small>{request.company}</small></span><span><StatusPill status={request.type} /></span><span className={request.days > 20 ? 'hr-warning-text' : ''}>{request.days}</span><span><StatusPill status={request.status} /></span><span>{request.status === 'pending' ? <span className="hr-button-row hr-button-row-small"><button className="hr-approve-button" type="button" onClick={() => {setOverrides((current) => ({...current, [request.id]: 'approved'})); notify(`${request.worker} leave approved in demo review.`);}}>Approve</button><button className="hr-reject-button" type="button" onClick={() => {setOverrides((current) => ({...current, [request.id]: 'rejected'})); notify(`${request.worker} leave rejected in demo review.`);}}>Reject</button></span> : <small>—</small>}</span></div>)}
      </div>
    </>
  );
}

function Drawer({title, children, onClose}: {title: string; children: ReactNode; onClose: () => void}) {
  return <div className="hr-drawer-backdrop" role="presentation" onClick={onClose}><aside className="hr-drawer" onClick={(event) => event.stopPropagation()}><div className="hr-drawer-head"><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Close">×</button></div>{children}</aside></div>;
}

export default function HRAdminSurface({
  state,
  t,
  activeModule,
  onModuleChange,
  onReset,
  actionPending
}: {
  state: DemoState | null;
  t: Translator;
  activeModule: HRModule;
  onModuleChange: (module: HRModule) => void;
  onReset: () => void | Promise<void>;
  actionPending: 'create' | 'resolve' | 'reset' | null;
}) {
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3500);
  };

  if (!state) {
    return <div className="hr-loading"><Dot /><span>Loading HR workspace…</span></div>;
  }

  const modules = state.operations.modules;
  const content = activeModule === 'dashboard' ? <DashboardView state={state} t={t} notify={notify} />
    : activeModule === 'candidates' ? <CandidatesView candidates={modules.candidates} notify={notify} onSelect={setSelectedCandidate} />
      : activeModule === 'workers' ? <WorkersView workers={modules.workers} notify={notify} />
        : activeModule === 'inbox' ? <InboxView messages={modules.messages} notify={notify} />
          : activeModule === 'companies' ? <CompaniesView companies={modules.companies} notify={notify} onSelect={setSelectedCompany} />
            : activeModule === 'documents' ? <DocumentsView documents={modules.documents} notify={notify} />
              : activeModule === 'payroll' ? <PayrollView payroll={modules.payroll} notify={notify} />
                : <LeaveView leave={modules.leave} notify={notify} />;

  return (
    <div className="hr-admin-surface">
      <div className="hr-surface-toolbar">
        <div><span className="hr-kicker">NEMEZISAI / HR ADMIN</span><strong>{navigation.find((item) => item.id === activeModule)?.label}</strong></div>
        <button className="hr-secondary-button" type="button" onClick={onReset} disabled={actionPending === 'reset'}>↻ Reset demo</button>
      </div>
      {notice ? <div className="hr-toast" role="status"><Dot tone="green" /><span>{notice}</span><button type="button" onClick={() => setNotice(null)}>×</button></div> : null}
      {content}
      {selectedCompany ? <Drawer title={selectedCompany.name} onClose={() => setSelectedCompany(null)}><p className="hr-drawer-subtitle">{selectedCompany.location} · {selectedCompany.sector}</p><div className="hr-drawer-grid"><div><strong>{selectedCompany.activeWorkers}</strong><span>Active workers</span></div><div><strong>{selectedCompany.openRequests}</strong><span>Open requests</span></div><div><strong>{selectedCompany.issues}</strong><span>Issues</span></div></div><div className="hr-drawer-list">{selectedCompany.issueList.map((issue) => <span key={issue}><Dot tone="orange" />{issue}</span>)}</div><button className="hr-primary-button hr-drawer-button" type="button" onClick={() => notify(`Contact workflow prepared for ${selectedCompany.contactPerson}.`)}>Contact {selectedCompany.contactPerson}</button></Drawer> : null}
      {selectedCandidate ? <Drawer title={selectedCandidate.name} onClose={() => setSelectedCandidate(null)}><p className="hr-drawer-subtitle">{selectedCandidate.desiredRole} · {selectedCandidate.language}</p><div className="hr-drawer-facts"><span>Status <b>{selectedCandidate.status}</b></span><span>Availability <b>{selectedCandidate.availability}</b></span><span>Recruiter <b>{selectedCandidate.recruiter}</b></span><span>Email <b>{selectedCandidate.email}</b></span></div><div className="hr-drawer-list">{selectedCandidate.missingDocs.length ? selectedCandidate.missingDocs.map((document) => <span key={document}><Dot tone="red" />{document}</span>) : <span><Dot tone="green" />Documents complete</span>}</div><button className="hr-primary-button hr-drawer-button" type="button" onClick={() => notify(`Contact workflow prepared for ${selectedCandidate.name}.`)}>Contact candidate</button></Drawer> : null}
    </div>
  );
}
