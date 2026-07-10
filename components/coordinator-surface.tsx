'use client';

import {useState} from 'react';
import type {FormEvent} from 'react';
import {useTranslations} from 'next-intl';
import type {AgencyMessage} from '../lib/agency-domain';
import type {DemoState} from '../lib/demo-store';

export type CoordinatorModule = 'dashboard' | 'planning' | 'messenger' | 'workers' | 'cases' | 'numbers';
type Translator = ReturnType<typeof useTranslations>;
type PendingAction = 'create' | 'resolve' | 'reset' | 'message' | 'planning' | null;

const navigation: Array<{id: CoordinatorModule; label: string; icon: string; badge?: number}> = [
  {id: 'dashboard', label: 'Coordinator Home', icon: '⌂'},
  {id: 'planning', label: 'Today Planning', icon: '▦', badge: 2},
  {id: 'messenger', label: 'Messenger', icon: '✉', badge: 2},
  {id: 'workers', label: 'My Workers', icon: '♙'},
  {id: 'cases', label: 'Cases & Buddy', icon: '!', badge: 1},
  {id: 'numbers', label: 'Important Numbers', icon: '☎'}
];

export function CoordinatorNav({active, onChange}: {active: CoordinatorModule; onChange: (module: CoordinatorModule) => void}) {
  return <div className="branch-sidebar-nav">{navigation.map((item) => <button className={active === item.id ? 'nav-item nav-item-active' : 'nav-item'} type="button" key={item.id} onClick={() => onChange(item.id)}><span className="nav-glyph">{item.icon}</span><span>{item.label}</span>{item.badge ? <span className="nav-count">{item.badge}</span> : null}</button>)}</div>;
}

function Dot({tone = 'blue'}: {tone?: 'blue' | 'green' | 'orange' | 'red' | 'purple'}) {
  return <span className={`branch-dot branch-dot-${tone}`} aria-hidden="true" />;
}

function Metric({label, value, detail, tone = 'blue'}: {label: string; value: string | number; detail: string; tone?: string}) {
  return <div className={`branch-metric branch-metric-${tone}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>;
}

function Header({title, subtitle, action, onAction}: {title: string; subtitle: string; action?: string; onAction?: () => void}) {
  return <section className="branch-page-header"><div><span className="branch-kicker"><Dot /> COORDINATOR WORKSPACE</span><h1>{title}</h1><p>{subtitle}</p></div>{action ? <button className="branch-primary-button" type="button" onClick={onAction}>{action}</button> : null}</section>;
}

function Dashboard({state, notify}: {state: DemoState; notify: (message: string) => void}) {
  const today = state.shared.planning.filter((shift) => shift.date === '2026-06-30');
  const unread = state.shared.messenger.filter((message) => !message.read && message.recipientRole === 'coordinator').length;
  return <>
    <Header title="Good morning, Anna" subtitle="Your coordination desk · Monday, June 30, 2026" action="Open today planning" onAction={() => notify('Today planning is ready for review.')} />
    <section className="branch-metric-grid"><Metric label="Assigned workers" value="17" detail="3 need attention" tone="blue" /><Metric label="Today shifts" value={today.length} detail="1 staffing alert" tone="green" /><Metric label="Messages to review" value={unread} detail="Messenger + Buddy" tone="purple" /><Metric label="Open cases" value={state.case?.status === 'open' ? 1 : 0} detail={state.case?.status === 'open' ? 'Transport · urgent' : 'Queue clear'} tone={state.case?.status === 'open' ? 'red' : 'green'} /></section>
    <section className="branch-two-column"><div className="branch-panel"><div className="branch-panel-heading"><div><span className="branch-kicker">LIVE PLANNING</span><h2>Next actions for your workers</h2></div><span className="branch-count">{today.length}</span></div><div className="branch-list">{today.map((shift) => <button className="branch-list-row" type="button" key={shift.id} onClick={() => notify(`${shift.workerName} · ${shift.client} · ${shift.start}–${shift.end}`)}><Dot tone={shift.status === 'attention' ? 'orange' : 'green'} /><span><strong>{shift.workerName}</strong><small>{shift.client} · {shift.start}–{shift.end} · {shift.status}</small></span><b>›</b></button>)}</div></div><div className="branch-panel"><div className="branch-panel-heading"><div><span className="branch-kicker">ESCALATIONS</span><h2>Needs a human decision</h2></div><span className="branch-count branch-count-red">{state.case?.status === 'open' ? 1 : 0}</span></div><div className="branch-callout branch-callout-red"><Dot tone="red" /><div><strong>{state.case?.status === 'open' ? 'Transport problem · Mila Ionescu' : 'No urgent Buddy case'}</strong><small>{state.case?.status === 'open' ? 'FreshLogistics · pickup 05:15' : 'The queue is currently stable.'}</small></div></div><button className="branch-secondary-button" type="button" onClick={() => notify('Case queue opened.')}>Open case queue</button></div></section>
  </>;
}

function Planning({state, onAcknowledge, notify, pending}: {state: DemoState; onAcknowledge: (shiftId: string) => void | Promise<void>; notify: (message: string) => void; pending: PendingAction}) {
  return <><Header title="Today Planning" subtitle="Review assignments, transport and worker readiness before the shift starts" action="Send planning reminder" onAction={() => notify('Planning reminder prepared for the assigned workers.')} /><div className="branch-planning-list">{state.shared.planning.map((shift) => <div className="branch-planning-card" key={shift.id}><div className="branch-planning-date"><strong>{shift.dateLabel}</strong><span>{shift.start}–{shift.end}</span></div><div className="branch-planning-main"><h2>{shift.workerName}</h2><p>{shift.client} · {shift.location}</p><small>{shift.transport} · Coordinator: {shift.coordinator}</small></div><div className="branch-planning-status"><span className={`branch-status branch-status-${shift.status}`}><Dot tone={shift.status === 'attention' ? 'orange' : shift.status === 'complete' ? 'green' : 'blue'} />{shift.status}</span>{shift.acknowledged ? <small className="branch-success-text">Worker acknowledged</small> : <button className="branch-secondary-button" type="button" onClick={() => onAcknowledge(shift.id)} disabled={pending === 'planning'}>Mark reviewed</button>}</div></div>)}</div></>;
}

function Messenger({state, onSendMessage, notify, pending}: {state: DemoState; onSendMessage: (input: {body: string; actor: 'coordinator'; recipient: string; recipientRole: 'worker'}) => void | Promise<void>; notify: (message: string) => void; pending: PendingAction}) {
  const [selected, setSelected] = useState<AgencyMessage | null>(state.shared.messenger.find((message) => message.recipientRole === 'coordinator' && !message.read) || state.shared.messenger[0] || null);
  const [draft, setDraft] = useState('');
  const messages = state.shared.messenger.filter((message) => message.recipientRole === 'coordinator' || message.senderRole === 'coordinator');
  const recipient = selected?.senderRole === 'worker' ? selected.sender : 'Mila Ionescu';
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    void onSendMessage({body: draft, actor: 'coordinator', recipient, recipientRole: 'worker'});
    setDraft('');
  };
  return <><Header title="Messenger" subtitle="One conversation layer for workers, Buddy and the coordination desk" action="Broadcast update" onAction={() => notify('Broadcast composer opened for this demo group.')} /><section className="branch-messenger-layout"><div className="branch-message-list">{messages.map((message) => <button className={selected?.id === message.id ? 'branch-message-card selected' : 'branch-message-card'} type="button" key={message.id} onClick={() => setSelected(message)}><div><strong>{message.sender}</strong><small>{message.time}</small></div><p>{message.body}</p><span className={`branch-status branch-status-${message.priority}`}><Dot tone={message.priority === 'urgent' ? 'red' : message.priority === 'high' ? 'orange' : 'blue'} />{message.source}</span></button>)}</div><div className="branch-message-detail">{selected ? <><span className="branch-kicker">{selected.source} · {selected.sender}</span><h2>{selected.body}</h2><p>Thread with {recipient}</p><form className="branch-message-form" onSubmit={submit}><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Write a reply…" aria-label="Write a reply" /><button className="branch-primary-button" type="submit" disabled={pending === 'message'}>Send</button></form></> : <div className="branch-empty-state">No messages to review.</div>}</div></section></>;
}

function Workers({state, notify}: {state: DemoState; notify: (message: string) => void}) {
  const workers = state.operations.modules.workers.slice(0, 8);
  return <><Header title="My Workers" subtitle="The workers assigned to your coordination desk" action="Contact group" onAction={() => notify('Group message composer opened.')} /><div className="branch-worker-grid">{workers.map((worker) => <button className="branch-worker-card" type="button" key={worker.id} onClick={() => notify(`${worker.name} · ${worker.phone}`)}><span className="branch-avatar">{worker.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><span><strong>{worker.name}</strong><small>{worker.company} · {worker.role}</small></span><span className={`branch-status branch-status-${worker.status}`}><Dot tone={worker.alerts.length ? 'orange' : 'green'} />{worker.status.replace('_', ' ')}</span></button>)}</div></>;
}

function Cases({state, onResolve, notify, pending}: {state: DemoState; onResolve: () => void | Promise<void>; notify: (message: string) => void; pending: PendingAction}) {
  const currentCase = state.case;
  return <><Header title="Cases & Worker Buddy" subtitle="Structured worker issues routed to you for human decisions" action="Open case history" onAction={() => notify('Case history is available in the coordinator audit trail.')} /><section className="branch-two-column"><div className="branch-panel branch-case-panel">{currentCase ? <><div className="branch-case-head"><span className="branch-status branch-status-urgent"><Dot tone="red" />{currentCase.status}</span><span>{currentCase.id}</span></div><h2>{currentCase.worker} · transport</h2><p>{currentCase.client} · shift {currentCase.shift} · pickup {currentCase.pickup}</p><div className="branch-case-steps"><span><Dot tone="green" />Buddy collected details</span><span><Dot tone="green" />Case assigned to you</span><span><Dot tone={currentCase.status === 'resolved' ? 'green' : 'orange'} />{currentCase.status === 'resolved' ? 'Solution confirmed' : 'Human decision required'}</span></div>{currentCase.status === 'open' ? <button className="branch-primary-button" type="button" onClick={onResolve} disabled={pending === 'resolve'}>Confirm transport solution</button> : <div className="branch-success-banner"><Dot tone="green" />Resolved and visible to Worker Preview</div>}</> : <div className="branch-empty-state">No open Buddy cases.</div>}</div><div className="branch-panel"><span className="branch-kicker">BOUNDARY</span><h2>Coordinator authority</h2><ul className="branch-check-list"><li>Can confirm a transport solution</li><li>Can message the worker and HR</li><li>Can review planning and attendance</li><li>Cannot approve payroll or terminate a worker</li></ul></div></section></>;
}

function Numbers({state}: {state: DemoState}) {
  return <><Header title="Important Numbers" subtitle="Verified contacts available to you and your assigned workers" /><div className="branch-number-grid">{state.shared.importantNumbers.map((number) => <a className={`branch-number-card branch-number-${number.tone}`} href={`tel:${number.number.replace(/[^+\d]/g, '')}`} key={number.id}><span className="branch-number-icon">☎</span><span><strong>{number.label}</strong><b>{number.number}</b><small>{number.availability} · {number.note}</small></span></a>)}</div></>;
}

export default function CoordinatorSurface({state, t, activeModule, onReset, onModuleChange, onResolve, onAcknowledge, onSendMessage, actionPending}: {state: DemoState | null; t: Translator; activeModule: CoordinatorModule; onReset: () => void | Promise<void>; onModuleChange: (module: CoordinatorModule) => void; onResolve: () => void | Promise<void>; onAcknowledge: (shiftId: string) => void | Promise<void>; onSendMessage: (input: {body: string; actor: 'coordinator'; recipient: string; recipientRole: 'worker'}) => void | Promise<void>; actionPending: PendingAction}) {
  const [notice, setNotice] = useState<string | null>(null);
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(null), 3200); };
  if (!state) return <div className="branch-loading"><Dot /><span>Loading coordinator workspace…</span></div>;
  const content = activeModule === 'dashboard' ? <Dashboard state={state} notify={notify} /> : activeModule === 'planning' ? <Planning state={state} onAcknowledge={onAcknowledge} notify={notify} pending={actionPending} /> : activeModule === 'messenger' ? <Messenger state={state} onSendMessage={onSendMessage} notify={notify} pending={actionPending} /> : activeModule === 'workers' ? <Workers state={state} notify={notify} /> : activeModule === 'cases' ? <Cases state={state} onResolve={onResolve} notify={notify} pending={actionPending} /> : <Numbers state={state} />;
  return <div className="branch-surface"><div className="branch-toolbar"><div><span className="branch-kicker">NEMEZISAI / COORDINATOR</span><strong>{navigation.find((item) => item.id === activeModule)?.label}</strong></div><button className="branch-secondary-button" type="button" onClick={onReset} disabled={actionPending === 'reset'}>↻ Reset demo</button></div>{notice ? <div className="branch-toast" role="status"><Dot tone="green" />{notice}</div> : null}{content}</div>;
}
