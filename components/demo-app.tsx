'use client';

import {useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {demoWorker} from '../lib/demo-data';

type Role = 'worker' | 'operations' | 'owner';
type CaseState = 'idle' | 'confirming' | 'open' | 'resolved';

const locales = [
  ['en', 'EN'],
  ['nl', 'NL'],
  ['pl', 'PL'],
  ['ro', 'RO'],
  ['bg', 'BG'],
  ['uk', 'UK'],
  ['de', 'DE']
] as const;

function StatusDot({tone = 'mint'}: {tone?: 'mint' | 'amber' | 'red' | 'blue'}) {
  return <span className={`status-dot status-dot-${tone}`} aria-hidden="true" />;
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function RoleIcon({role}: {role: Role}) {
  return <span className={`role-icon role-icon-${role}`} aria-hidden="true">{role === 'worker' ? 'W' : role === 'operations' ? 'O' : 'T'}</span>;
}

export default function DemoApp() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [role, setRole] = useState<Role>('worker');
  const [caseState, setCaseState] = useState<CaseState>('idle');
  const [contactSent, setContactSent] = useState(false);
  const [controllerOpen, setControllerOpen] = useState(false);

  const openTransportConfirmation = () => setCaseState('confirming');
  const createTransportCase = () => setCaseState('open');
  const resolveTransport = () => setCaseState('resolved');
  const resetDemo = () => {
    setCaseState('idle');
    setContactSent(false);
    setRole('worker');
  };

  const switchLocale = (nextLocale: string) => {
    router.push(`/${nextLocale}`);
  };

  const caseIsOpen = caseState === 'open' || caseState === 'resolved';
  const caseIsResolved = caseState === 'resolved';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">N</div>
          <div>
            <div className="brand-name">{t('appName')}</div>
            <div className="brand-subtitle">{t('appSubtitle')}</div>
          </div>
        </div>

        <div className="agency-switcher">
          <span className="agency-avatar">NL</span>
          <div className="agency-copy">
            <strong>{t('demoAgency')}</strong>
            <span>{t('liveDemo')}</span>
          </div>
          <span className="chevron">⌄</span>
        </div>

        <div className="side-label">{t('roleLabel')}</div>
        <nav className="primary-nav" aria-label="Primary navigation">
          <button className="nav-item nav-item-active" type="button">
            <span className="nav-glyph">◈</span>
            <span>{t('overview')}</span>
          </button>
          <button className="nav-item" type="button" onClick={() => setRole('worker')}>
            <span className="nav-glyph">◷</span>
            <span>{t('myShift')}</span>
          </button>
          <button className="nav-item" type="button" onClick={() => setRole('worker')}>
            <span className="nav-glyph">✦</span>
            <span>{t('buddy')}</span>
            <span className="nav-count">1</span>
          </button>
          <button className="nav-item" type="button" onClick={() => setRole('operations')}>
            <span className="nav-glyph">▤</span>
            <span>{t('cases')}</span>
            {caseIsOpen && <span className="nav-count nav-count-alert">1</span>}
          </button>
          <button className="nav-item" type="button" onClick={() => setRole('operations')}>
            <span className="nav-glyph">◎</span>
            <span>{t('team')}</span>
          </button>
          <div className="side-divider" />
          <button className="nav-item" type="button" onClick={() => setRole('owner')}>
            <span className="nav-glyph">⌁</span>
            <span>{t('ownerView')}</span>
          </button>
          <button className="nav-item" type="button">
            <span className="nav-glyph">⚙</span>
            <span>{t('settings')}</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="human-card">
            <div className="human-avatar">AN</div>
            <div className="human-copy">
              <strong>{demoWorker.coordinator}</strong>
              <span>{t('coordinator')}</span>
            </div>
            <span className="online-indicator" aria-label="Online" />
          </div>
          <button className="sidebar-help" type="button" onClick={() => setContactSent(true)}>
            <span>?</span>
            {t('humanHelp')}
          </button>
        </div>
      </aside>

      <main className="main-shell">
        <header className="topbar">
          <div className="topbar-context">
            <span className="topbar-kicker">NEMEZISAI / DEMO</span>
            <span className="topbar-separator">/</span>
            <span className="topbar-current">{role === 'worker' ? t('workerRole') : role === 'operations' ? t('operationsRole') : t('ownerRole')}</span>
          </div>
          <div className="topbar-actions">
            <div className="role-switcher" aria-label={t('roleLabel')}>
              <button className={role === 'worker' ? 'role-button role-button-active' : 'role-button'} type="button" onClick={() => setRole('worker')}>
                <RoleIcon role="worker" />
                <span>{t('workerRole')}</span>
              </button>
              <button className={role === 'operations' ? 'role-button role-button-active' : 'role-button'} type="button" onClick={() => setRole('operations')}>
                <RoleIcon role="operations" />
                <span>{t('operationsRole')}</span>
              </button>
              <button className={role === 'owner' ? 'role-button role-button-active' : 'role-button'} type="button" onClick={() => setRole('owner')}>
                <RoleIcon role="owner" />
                <span>{t('ownerRole')}</span>
              </button>
            </div>
            <label className="locale-picker">
              <span className="sr-only">{t('languages')}</span>
              <select value={locale} onChange={(event) => switchLocale(event.target.value)}>
                {locales.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
            <div className="topbar-avatar">OS</div>
          </div>
        </header>

        <div className="content-wrap">
          {contactSent && (
            <div className="toast" role="status">
              <StatusDot tone="mint" />
              <span>{t('contactCoordinator')}</span>
              <button type="button" onClick={() => setContactSent(false)} aria-label={t('cancel')}>×</button>
            </div>
          )}

          {role === 'worker' && (
            <WorkerSurface
              t={t}
              caseState={caseState}
              onTransportProblem={openTransportConfirmation}
              onCreateCase={createTransportCase}
              onCancel={() => setCaseState('idle')}
              onContact={() => setContactSent(true)}
            />
          )}
          {role === 'operations' && (
            <OperationsSurface
              t={t}
              caseState={caseState}
              onResolve={resolveTransport}
              onReset={resetDemo}
            />
          )}
          {role === 'owner' && <OwnerSurface t={t} caseState={caseState} onReset={resetDemo} />}

          <button className="controller-toggle" type="button" onClick={() => setControllerOpen((open) => !open)}>
            <span className="controller-pulse" />
            {t('demoController')}
            <span className="controller-chevron">{controllerOpen ? '⌄' : '›'}</span>
          </button>
          {controllerOpen && (
            <div className="controller-panel">
              <div>
                <span className="eyebrow">{t('workflow')}</span>
                <strong>{t('useRoleSwitcher')}</strong>
              </div>
              <button className="button button-ghost" type="button" onClick={resetDemo}>{t('resetDemo')}</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function WorkerSurface({
  t,
  caseState,
  onTransportProblem,
  onCreateCase,
  onCancel,
  onContact
}: {
  t: ReturnType<typeof useTranslations>;
  caseState: CaseState;
  onTransportProblem: () => void;
  onCreateCase: () => void;
  onCancel: () => void;
  onContact: () => void;
}) {
  const isConfirming = caseState === 'confirming';
  const isOpen = caseState === 'open';
  const isResolved = caseState === 'resolved';

  return (
    <>
      <section className="page-intro">
        <div>
          <span className="eyebrow"><StatusDot /> {t('workerRole')} / {t('liveDemo')}</span>
          <h1>{t('greeting')}</h1>
          <p>{t('greetingSub')}</p>
        </div>
        <div className={isResolved ? 'readiness-chip readiness-chip-ready' : isOpen ? 'readiness-chip readiness-chip-attention' : 'readiness-chip'}>
          <StatusDot tone={isResolved ? 'mint' : isOpen ? 'amber' : 'blue'} />
          <span>{isResolved ? t('workerReady') : isOpen ? t('needAttention') : t('readyForWork')}</span>
        </div>
      </section>

      <section className="worker-grid">
        <div className="surface-card shift-card">
          <div className="card-heading-row">
            <div>
              <span className="eyebrow">{t('nextShift')}</span>
              <h2>{t('tomorrow')}</h2>
            </div>
            <span className="date-chip">{t('shiftTime')}</span>
          </div>
          <div className="shift-time">{t('shiftTime')}</div>
          <div className="shift-client">{demoWorker.client}</div>
          <div className="shift-details">
            <div className="detail-row"><span className="detail-icon">⌖</span><div><small>{t('location')}</small><strong>Distribution Hall 2</strong></div></div>
            <div className="detail-row"><span className="detail-icon">↗</span><div><small>{t('transport')}</small><strong>{t('pickup')} {demoWorker.pickup} · {demoWorker.pickupLocation}</strong></div></div>
            <div className="detail-row"><span className="detail-icon">◉</span><div><small>{t('coordinator')}</small><strong>{demoWorker.coordinator}</strong></div></div>
          </div>
          <div className="card-footer-line"><StatusDot /> <span>{t('readyForWork')}</span><span className="footer-meta">{t('onboarding')} · {t('complete')}</span></div>
        </div>

        <div className="surface-card buddy-card">
          <div className="card-heading-row buddy-heading">
            <div className="buddy-title-wrap">
              <div className="buddy-orb"><span>✦</span></div>
              <div><span className="eyebrow">{t('aiAssistant')}</span><h2>{t('buddyTitle')}</h2></div>
            </div>
            <span className="active-pill"><StatusDot /> {t('activeDay')}</span>
          </div>
          <div className="buddy-disclosure">{t('aiDisclosure')}</div>
          <div className="chat-stack">
            <div className="chat-bubble chat-bubble-buddy">{t('buddyIntro')}</div>
            <div className="chat-bubble chat-bubble-buddy chat-bubble-question">{t('buddyQuestion')}</div>
            {isConfirming && (
              <div className="confirm-panel">
                <div className="confirm-panel-icon">↗</div>
                <div><strong>{t('dataBoundary')}</strong><p>{t('dataBoundaryText')}</p></div>
              </div>
            )}
            {isOpen && (
              <div className="case-banner case-banner-open"><span className="case-banner-icon">!</span><div><strong>{t('caseCreated')}</strong><p>{t('caseId')}: {demoWorker.caseId} · {t('caseStatusOpen')}</p></div></div>
            )}
            {isResolved && (
              <div className="case-banner case-banner-resolved"><span className="case-banner-icon"><CheckIcon /></span><div><strong>{t('resolvedLabel')}</strong><p>{t('caseId')}: {demoWorker.caseId} · {t('caseStatusResolved')}</p></div></div>
            )}
          </div>
          <div className="buddy-actions">
            {isConfirming ? (
              <>
                <button className="button button-primary" type="button" onClick={onCreateCase}><ArrowIcon /> {t('shareAndCreate')}</button>
                <button className="button button-ghost" type="button" onClick={onCancel}>{t('cancel')}</button>
              </>
            ) : !isOpen && !isResolved ? (
              <>
                <button className="button button-soft" type="button">{t('allClear')}</button>
                <button className="button button-attention" type="button" onClick={onTransportProblem}>{t('transportProblem')}</button>
                <button className="button button-ghost" type="button" onClick={onContact}>{t('humanHelp')}</button>
              </>
            ) : (
              <button className="button button-ghost" type="button" onClick={onContact}>{t('humanHelp')}</button>
            )}
          </div>
        </div>
      </section>

      <section className="lower-grid">
        <div className="surface-card progress-card">
          <div className="card-heading-row"><div><span className="eyebrow">{t('onboarding')}</span><h2>{t('step')} 1 / 4</h2></div><span className="progress-percent">75%</span></div>
          <div className="progress-track"><span style={{width: '75%'}} /></div>
          <div className="progress-items"><span className="progress-item progress-item-done"><CheckIcon /> {t('complete')}</span><span className="progress-item"><span className="mini-ring" /> Documents</span><span className="progress-item"><span className="mini-ring" /> Housing</span></div>
        </div>
        <div className="surface-card privacy-card">
          <div className="privacy-symbol">⌁</div>
          <div><span className="eyebrow">{t('dataBoundary')}</span><p>{t('aiDisclosure')}</p></div>
          <button className="icon-button" type="button" onClick={onContact} aria-label={t('humanHelp')}>→</button>
        </div>
      </section>
    </>
  );
}

function OperationsSurface({
  t,
  caseState,
  onResolve,
  onReset
}: {
  t: ReturnType<typeof useTranslations>;
  caseState: CaseState;
  onResolve: () => void;
  onReset: () => void;
}) {
  const open = caseState === 'open';
  const resolved = caseState === 'resolved';
  return (
    <>
      <section className="page-intro page-intro-compact">
        <div><span className="eyebrow"><StatusDot tone={open ? 'amber' : 'mint'} /> {t('operationsRole')} / {t('liveDemo')}</span><h1>{t('operationsTitle')}</h1><p>{t('operationsSubtitle')}</p></div>
        <button className="button button-ghost" type="button" onClick={onReset}><span className="reset-icon">↻</span>{t('resetDemo')}</button>
      </section>
      <section className="metric-grid metric-grid-four">
        <MetricCard label={t('openCases')} value={open ? '1' : '0'} delta={open ? t('needAttention') : t('queueEmpty')} tone={open ? 'amber' : 'mint'} />
        <MetricCard label={t('criticalAlerts')} value="0" delta={t('allSystems')} tone="mint" />
        <MetricCard label={t('readyWorkers')} value={resolved ? '48' : '47'} delta={resolved ? '+1 today' : t('needAttention')} tone={resolved ? 'mint' : 'blue'} />
        <MetricCard label={t('resolvedToday')} value={resolved ? '12' : '11'} delta={resolved ? '+1 case' : 'Stable'} tone="blue" />
      </section>
      <section className="operations-layout">
        <div className="surface-card queue-card">
          <div className="card-heading-row"><div><span className="eyebrow">{t('queueTitle')}</span><h2>{t('queueSubtitle')}</h2></div><span className="queue-count">{open ? '01' : '00'}</span></div>
          {open || resolved ? (
            <div className={resolved ? 'case-row case-row-resolved' : 'case-row'}>
              <div className="severity-mark"><StatusDot tone={resolved ? 'mint' : 'amber'} /></div>
              <div className="case-main"><div className="case-row-title"><strong>{t('caseTitle')}</strong><span className={resolved ? 'tag tag-green' : 'tag tag-amber'}>{resolved ? t('caseStatusResolved') : t('transport')}</span></div><span>{demoWorker.name} · {demoWorker.client} · {t('source')}: Worker Buddy</span></div>
              <div className="case-row-side"><span className="case-time">{demoWorker.pickup}</span>{resolved ? <CheckIcon /> : <span className="case-arrow">→</span>}</div>
            </div>
          ) : (
            <div className="empty-queue"><div className="empty-icon">✓</div><strong>{t('queueEmpty')}</strong><span>{t('allSystems')}</span></div>
          )}
          {open && <button className="button button-primary queue-action" type="button" onClick={onResolve}><CheckIcon /> {t('resolveTransport')}</button>}
        </div>
        <div className="surface-card case-detail-card">
          <div className="eyebrow">{t('activity')}</div>
          <div className="detail-activity"><ActivityDot tone="blue" title={t('caseCreated')} detail={`${demoWorker.name} · ${t('source')}: Worker Buddy`} /><ActivityDot tone={resolved ? 'mint' : 'amber'} title={resolved ? t('transportResolved') : t('caseStatusOpen')} detail={`${demoWorker.caseId} · ${demoWorker.coordinator}`} /></div>
          <div className="case-facts"><Fact label={t('assignedTo')} value={demoWorker.coordinator} /><Fact label={t('status')} value={resolved ? t('caseStatusResolved') : open ? t('caseStatusOpen') : t('queueEmpty')} /><Fact label={t('caseId')} value={demoWorker.caseId} /></div>
        </div>
      </section>
    </>
  );
}

function OwnerSurface({t, caseState, onReset}: {t: ReturnType<typeof useTranslations>; caseState: CaseState; onReset: () => void}) {
  const resolved = caseState === 'resolved';
  const open = caseState === 'open';
  return (
    <>
      <section className="page-intro page-intro-compact"><div><span className="eyebrow"><StatusDot tone="mint" /> {t('ownerRole')} / {t('liveDemo')}</span><h1>{t('ownerTitle')}</h1><p>{t('ownerSubtitle')}</p></div><div className="owner-health"><StatusDot /> {t('allSystems')}</div></section>
      <section className="metric-grid metric-grid-four owner-metrics"><MetricCard label={t('activeWorkers')} value="48" delta="+6 this month" tone="blue" /><MetricCard label={t('attendanceHealth')} value={resolved ? '98.4%' : '96.8%'} delta={resolved ? '+1.6% after resolution' : 'Watch transport queue'} tone={resolved ? 'mint' : 'amber'} /><MetricCard label={t('clientImpact')} value={resolved ? 'Low' : open ? 'Medium' : 'Low'} delta={resolved ? t('workerReady') : open ? t('needAttention') : t('allSystems')} tone={resolved ? 'mint' : open ? 'amber' : 'blue'} /><MetricCard label={t('casesClosed')} value={resolved ? '12' : '11'} delta={resolved ? '+1 today' : 'Stable'} tone="mint" /></section>
      <section className="owner-layout">
        <div className="surface-card pulse-card"><div className="pulse-header"><div><span className="eyebrow">{t('operationalPulse')}</span><h2>{t('ownerLine')}</h2></div><div className="pulse-score">{resolved ? '98' : open ? '91' : '96'}<span>/100</span></div></div><div className="pulse-bars"><span style={{height: resolved ? '82%' : '67%'}} /><span style={{height: resolved ? '91%' : '72%'}} /><span style={{height: resolved ? '96%' : '78%'}} /><span style={{height: resolved ? '88%' : '64%'}} /><span style={{height: resolved ? '98%' : '81%'}} /><span style={{height: resolved ? '94%' : '74%'}} /><span style={{height: resolved ? '100%' : '85%'}} /></div><div className="pulse-axis"><span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span></div></div>
        <div className="surface-card activity-card"><div className="card-heading-row"><div><span className="eyebrow">{t('recentActivity')}</span><h2>{t('activity')}</h2></div><span className="activity-live"><StatusDot /> {t('statusLive')}</span></div><ActivityDot tone="blue" title={t('caseCreated')} detail={`${demoWorker.name} · ${demoWorker.client}`} /><ActivityDot tone={resolved ? 'mint' : 'amber'} title={resolved ? t('transportResolved') : t('caseStatusOpen')} detail={`${demoWorker.coordinator} · ${demoWorker.caseId}`} /><ActivityDot tone={resolved ? 'mint' : 'blue'} title={resolved ? t('operationalChange') : t('workerReady')} detail={t('source')} /><button className="button button-ghost full-button" type="button" onClick={onReset}><span className="reset-icon">↻</span>{t('resetDemo')}</button></div>
      </section>
    </>
  );
}

function MetricCard({label, value, delta, tone}: {label: string; value: string; delta: string; tone: 'mint' | 'amber' | 'blue'}) {
  return <div className="metric-card"><div className="metric-label"><StatusDot tone={tone} />{label}</div><div className="metric-value">{value}</div><div className={`metric-delta metric-delta-${tone}`}>{delta}</div></div>;
}

function ActivityDot({tone, title, detail}: {tone: 'mint' | 'amber' | 'blue'; title: string; detail: string}) {
  return <div className="activity-row"><StatusDot tone={tone} /><div><strong>{title}</strong><span>{detail}</span></div><span className="activity-time">now</span></div>;
}

function Fact({label, value}: {label: string; value: string}) {
  return <div className="fact-row"><span>{label}</span><strong>{value}</strong></div>;
}
