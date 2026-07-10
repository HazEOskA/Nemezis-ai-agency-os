'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import type {DemoState} from '../lib/demo-store';

export type BossModule = 'dashboard' | 'organization' | 'escalations' | 'decisions';
type Translator = ReturnType<typeof useTranslations>;

const navigation: Array<{id: BossModule; label: string; icon: string}> = [
  {id: 'dashboard', label: 'Boss Control Tower', icon: '⌂'},
  {id: 'organization', label: 'System Organization', icon: '⌘'},
  {id: 'escalations', label: 'Escalations', icon: '⚠'},
  {id: 'decisions', label: 'Decision Log', icon: '▤'}
];

export function BossNav({active, onChange}: {active: BossModule; onChange: (module: BossModule) => void}) {
  return <div className="branch-sidebar-nav">{navigation.map((item) => <button className={active === item.id ? 'nav-item nav-item-active' : 'nav-item'} type="button" key={item.id} onClick={() => onChange(item.id)}><span className="nav-glyph">{item.icon}</span><span>{item.label}</span>{item.id === 'escalations' ? <span className="nav-count nav-count-alert">{item.id === 'escalations' ? 1 : ''}</span> : null}</button>)}</div>;
}

function Dot({tone = 'blue'}: {tone?: 'blue' | 'green' | 'orange' | 'red' | 'purple'}) {
  return <span className={`branch-dot branch-dot-${tone}`} aria-hidden="true" />;
}

function Metric({label, value, detail, tone = 'blue'}: {label: string; value: string | number; detail: string; tone?: string}) {
  return <div className={`branch-metric branch-metric-${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function Header({title, subtitle}: {title: string; subtitle: string}) {
  return <section className="branch-page-header"><div><span className="branch-kicker"><Dot /> BOSS CONTROL TOWER</span><h1>{title}</h1><p>{subtitle}</p></div><span className="boss-live-badge"><Dot tone="green" /> All branches live</span></section>;
}

function Dashboard({state, notify}: {state: DemoState; notify: (message: string) => void}) {
  const openCase = state.case?.status === 'open';
  return <><Header title="Today’s Command Center" subtitle="Linda van den Berg · Monday, June 30, 2026 · Week 27" /><section className="branch-metric-grid"><Metric label="Active workers" value={state.boss.activeWorkers} detail="Across all coordinators" tone="blue" /><Metric label="Operational pulse" value={`${state.boss.operationalPulse}%`} detail="Live system confidence" tone="green" /><Metric label="HR actions open" value={state.boss.hrActionsOpen} detail="Documents · payroll · leave" tone="purple" /><Metric label="Escalations" value={openCase ? 1 : 0} detail={openCase ? 'Needs coordinator decision' : 'No urgent case'} tone={openCase ? 'red' : 'green'} /></section><section className="boss-command-grid"><div className="branch-panel"><div className="branch-panel-heading"><div><span className="branch-kicker">SYSTEM HIERARCHY</span><h2>One agency · four controlled branches</h2></div><span className="branch-count">4</span></div><Hierarchy state={state} onSelect={notify} /></div><div className="branch-panel"><div className="branch-panel-heading"><div><span className="branch-kicker">BOSS ATTENTION</span><h2>Decisions that cannot wait</h2></div><span className="branch-count branch-count-red">{openCase ? 1 : 0}</span></div><div className="branch-alert-stack"><button className="branch-callout branch-callout-red" type="button" onClick={() => notify(openCase ? `${state.case?.id} assigned to Anna Nowak.` : 'No urgent escalation is open.')}><Dot tone={openCase ? 'red' : 'green'} /><span><strong>{openCase ? 'Transport escalation · Mila Ionescu' : 'No active critical escalation'}</strong><small>{openCase ? 'FreshLogistics · coordinator Anna Nowak' : 'All critical branches are stable.'}</small></span></button><button className="branch-callout branch-callout-orange" type="button" onClick={() => notify('HR action queue opened for administration review.')}><Dot tone="orange" /><span><strong>{state.boss.hrActionsOpen} HR actions remain open</strong><small>Owner sees status; HR owns the execution.</small></span></button></div></div></section></>;
}

function Hierarchy({state, onSelect}: {state: DemoState; onSelect: (message: string) => void}) {
  const branches = [
    {key: 'boss', title: 'Boss / Owner', detail: state.hierarchy.boss, metric: `${state.boss.operationalPulse}% pulse`, tone: 'purple'},
    {key: 'hr', title: 'HR / Administration', detail: 'Linda van den Berg · Control Desk', metric: `${state.boss.hrActionsOpen} actions`, tone: 'blue'},
    {key: 'coord', title: 'Coordinators', detail: state.hierarchy.coordinators, metric: `${state.boss.coordinatorsOnline} online`, tone: 'green'},
    {key: 'worker', title: 'Workers Preview', detail: state.hierarchy.workers, metric: 'read-only', tone: 'orange'}
  ];
  return <div className="boss-hierarchy">{branches.map((branch, index) => <button className={`boss-hierarchy-row boss-hierarchy-${branch.tone}`} type="button" key={branch.key} onClick={() => onSelect(`${branch.title}: ${branch.detail}`)}><span className="boss-hierarchy-index">0{index + 1}</span><span><strong>{branch.title}</strong><small>{branch.detail}</small></span><b>{branch.metric}</b></button>)}</div>;
}

function Organization({state, notify}: {state: DemoState; notify: (message: string) => void}) {
  return <><Header title="System Organization" subtitle="Authority is visible: every branch has a clear owner and boundary" /><section className="boss-branch-grid"><button className="boss-branch-card boss-branch-purple" type="button" onClick={() => notify('Boss Control Tower selected.') }><span>01 · BOSS</span><h2>Command and decisions</h2><p>Sees agency-wide operational pulse, client impact, HR load, coordinators and escalations.</p><strong>{state.boss.operationalPulse}%</strong></button><button className="boss-branch-card boss-branch-blue" type="button" onClick={() => notify('HR Administration selected.') }><span>02 · HR / ADMIN</span><h2>People and administration</h2><p>Owns candidates, workers, companies, contracts, documents, payroll preview and leave review.</p><strong>{state.boss.hrActionsOpen}</strong></button><button className="boss-branch-card boss-branch-green" type="button" onClick={() => notify('Coordinator network selected.') }><span>03 · COORDINATORS</span><h2>Daily execution</h2><p>Owns worker communication, planning, Buddy cases, attendance and client-facing coverage.</p><strong>{state.boss.coordinatorsOnline}</strong></button><button className="boss-branch-card boss-branch-orange" type="button" onClick={() => notify('Worker Preview selected.') }><span>04 · WORKER PREVIEW</span><h2>Personal operational view</h2><p>Reads planning, uses Buddy, messages a human and sees important numbers. No authority to change the system.</p><strong>READ ONLY</strong></button></section></>;
}

function Escalations({state, notify}: {state: DemoState; notify: (message: string) => void}) {
  const currentCase = state.case;
  return <><Header title="Escalations" subtitle="Cases where the organization needs human coordination or a Boss decision" /><div className="branch-panel boss-escalation-panel">{currentCase ? <><div className="branch-case-head"><span className="branch-status branch-status-urgent"><Dot tone="red" />{currentCase.status}</span><span>{currentCase.id}</span></div><h2>{currentCase.worker} · {currentCase.client}</h2><p>Transport issue reported through Worker Buddy. Assigned coordinator: {currentCase.coordinator}.</p><div className="boss-escalation-actions"><button className="branch-primary-button" type="button" onClick={() => notify('Escalation acknowledged by Boss. Coordinator remains responsible for resolution.')}>Acknowledge escalation</button><button className="branch-secondary-button" type="button" onClick={() => notify('Coordinator contact card opened.')}>Open coordinator</button></div></> : <div className="branch-empty-state"><Dot tone="green" />No escalations require Boss attention.</div>}</div></>;
}

function Decisions({state}: {state: DemoState}) {
  return <><Header title="Decision Log" subtitle="A transparent trail of events across the four system branches" /><div className="branch-panel"><div className="branch-event-list">{state.events.slice(0, 12).map((event) => <div className="branch-event-row" key={event.id}><Dot tone={event.type.includes('case') ? 'orange' : event.type.includes('message') ? 'purple' : 'blue'} /><span><strong>{event.message}</strong><small>{event.actor} · {new Date(event.timestamp).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</small></span><b>{event.type}</b></div>)}</div></div></>;
}

export default function BossSurface({state, t, activeModule, onModuleChange, onReset, actionPending}: {state: DemoState | null; t: Translator; activeModule: BossModule; onModuleChange: (module: BossModule) => void; onReset: () => void | Promise<void>; actionPending: 'create' | 'resolve' | 'reset' | 'message' | 'planning' | null}) {
  const [notice, setNotice] = useState<string | null>(null);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 3200); };
  if (!state) return <div className="branch-loading"><Dot /><span>Loading Boss Control Tower…</span></div>;
  const content = activeModule === 'dashboard' ? <Dashboard state={state} notify={notify} /> : activeModule === 'organization' ? <Organization state={state} notify={notify} /> : activeModule === 'escalations' ? <Escalations state={state} notify={notify} /> : <Decisions state={state} />;
  return <div className="branch-surface"><div className="branch-toolbar"><div><span className="branch-kicker">NEMEZISAI / BOSS CONTROL TOWER</span><strong>{navigation.find((item) => item.id === activeModule)?.label}</strong></div><button className="branch-secondary-button" type="button" onClick={onReset} disabled={actionPending === 'reset'}>↻ Reset demo</button></div>{notice ? <div className="branch-toast" role="status"><Dot tone="green" />{notice}</div> : null}{content}</div>;
}
