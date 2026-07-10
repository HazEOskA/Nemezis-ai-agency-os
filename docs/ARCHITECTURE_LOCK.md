# NemezisAI Agency OS — Architecture Lock v0.1

Status: LOCKED  
Branch: `feature/multilingual-agency-demo-v01`  
Date: 2026-07-10

## 1. Product boundary

NemezisAI Agency OS is a premium operational platform for staffing agencies. The v0.1 deliverable is a sales demo, not a production ERP, payroll system, or autonomous workforce-management agent.

Control Desk remains an external reference for visual language and reusable ideas. NemezisAI is a separate repository with its own history, contracts, demo data, tests, and deployment lifecycle.

The demo must prove one connected operational loop across three surfaces:

```text
Worker App → Operations Workspace → Owner Control Tower
```

The product direction is a professional operational platform: clear status, high information density, few clicks, mobile-first worker interactions, and no decorative controls that do nothing.

## 2. Tools and responsibilities

| Area | Decision |
| --- | --- |
| Web app | Next.js + TypeScript |
| Workspace | pnpm monorepo |
| Demo persistence | Deterministic fixtures; no production data |
| Future persistence | Supabase/Postgres |
| i18n | `next-intl` with locale routing and external message files |
| QA | Playwright, typecheck, build, locale validation |
| Deployment | Vercel Preview first; production only after review |
| Automation | n8n demo workflows with synthetic data |
| Source of truth | GitHub repository `nemezis-ai-agency-os` |
| Implementation | Claude/Codex |
| Architecture and review | ChatGPT |

No provider credentials, real client records, real payroll data, or real worker documents belong in v0.1.

## 3. Product surfaces

### Worker App

The worker can view shifts, attendance, hours, documents, pay information represented as demo data, transport, accommodation, notifications, messages, cases, and language settings.

The first proof feature is `Worker Buddy`: an optional, multilingual onboarding agent active for a configurable 30–90 days.

### Operations Workspace

The operations surface serves HR, recruiters, administration, and coordinators. v0.1 focuses on workers, shifts, attendance/cases, communication, alerts, and the Buddy queue. Other modules may be represented as clearly marked future or inactive areas, but visible controls must not pretend to work.

The first implemented group is `HR / Administration`. Its dashboard and module navigation are intentionally shaped around the audited Control Desk flows: candidates, active workers, inbox triage, client companies, documents, payroll preview, and leave requests. The Boss layer is a separate follow-up surface and is not mixed into this HR slice.

### Owner Control Tower

The owner sees active workers, attendance signals, critical issues, open cases, overdue documents, coordinator load, client impact, and an AI report placeholder grounded in demo data. Payroll remains a later module.

## 4. Worker Buddy contract

### Purpose

Buddy reduces repetitive onboarding questions and converts worker messages into structured cases for a human team. It is an assistant, not an automated supervisor or decision-maker.

### Lifecycle

```text
Onboarding
  → intensive first-day support
  → daily support during the first two weeks
  → reminders and case support through the first three months
  → basic mode or worker-controlled deactivation
```

The agency configures the active period between 30 and 90 days. The worker can enable/disable Buddy, mute reminders, change language, adjust reminder level, request a human, and manage history where policy allows.

### Allowed behavior

Buddy may explain agency-provided information about the worker's shift, location, coordinator, transport, accommodation, documents, deadlines, and open cases. It may collect the minimum information needed to create a structured case, route it to the correct queue, notify the responsible team, and show case status.

### Hard boundaries

Buddy must not change a schedule, approve pay, terminate a worker, provide binding legal advice, promise an agency decision, conceal that it is AI, or act on behalf of a human without confirmation.

If the answer is not grounded in agency data, Buddy must say:

> Nie mam wystarczających informacji. Przekazuję sprawę koordynatorowi.

Health, pay, and conflict conversations require stricter access and escalation handling than ordinary schedule questions. Every consequential action requires worker or administrator confirmation.

### Privacy requirements

The worker must be able to see what data Buddy uses, what it stores, who receives a case, how to disable Buddy, and when conversation history can be deleted. A visible human-contact action is mandatory in every Buddy state.

## 5. Demo scope

The mandatory proof flow is:

```text
new worker onboarded
  → first shift assigned
  → Buddy shows shift, transport, and coordinator
  → worker reports a transport problem
  → Buddy creates a structured case
  → coordinator receives and resolves the case
  → worker sees the status update
  → owner sees the operational state change
```

The same fixture model must support the absence/coverage branch used by operational validation:

```text
absence reported
  → critical alert
  → replacement action
  → coordinator history
  → owner sees client impact
```

The demo agency is `Nemezis Logistics Staffing`. All names, locations, schedules, documents, and messages are synthetic.

## 6. Repository boundary

The planned monorepo shape is:

```text
nemezis-ai-agency-os/
├── apps/web/app/[locale]/
│   ├── worker/
│   ├── operations/
│   ├── owner/
│   └── demo/
├── apps/web/components/
├── packages/{ui,i18n,auth,permissions,messaging,workforce,documents,attendance,notifications,workflow-engine,demo-data}/
├── messages/
├── automation/n8n/
├── tests/{e2e,roles,locales,workflows}/
├── docs/
└── scripts/validate-translations.ts
```

The initial architecture commit contains only the four lock documents. Application code is added in separate, reviewable commits.

## 7. Execution flow

```text
new repo
  → architecture lock
  → Control Desk audit
  → shell/navigation migration
  → role switcher
  → Worker App
  → Operations Workspace
  → Owner Control Tower
  → Worker Buddy proof flow
  → i18n framework
  → Wave 1 translations
  → Playwright
  → Vercel Preview
  → live review
```

## 8. Validation and deployment gates

The demo is ready only when every visible required control performs a real action, roles and locales can be switched, the Buddy transport flow completes end-to-end, the absence branch is testable, Worker App works on mobile, direct component strings are absent, missing translation keys are detected, and a Vercel Preview is available.

Change flow:

```text
feature branch
  → typecheck
  → build
  → locale validation
  → Playwright smoke
  → Vercel Preview
  → desktop + mobile live test
  → review
  → merge to main
  → production demo
```

## 9. Rollback and safety

Control Desk remains untouched. NemezisAI has independent Git history. Demo data is synthetic. n8n runs only against demo payloads. Locale rollout can be disabled by feature flag. Modules are isolated so a broken demo module does not block the shell. Control Desk migrations happen in separate commits. Vercel deployment history is the rollback point.

## 10. Four pre-start counterarguments

1. Do not finish every language before showing the demo. Build the complete i18n framework, then manually verify the seven Wave 1 locales.
2. Do not copy Control Desk 1:1. Reusing old code without an audit would import old coupling and defects.
3. Do not build a full payroll system now. Show payroll-related states as fixtures and defer integrations.
4. Do not build every agency feature before sales validation. Prove one connected workflow and the extension path.

## 11. Acceptance decision

This lock authorizes implementation of the isolated NemezisAI demo, with Worker Buddy included as a bounded, human-escalating onboarding module. It does not authorize production integrations, autonomous employment decisions, payroll execution, or migration of the entire Control Desk repository.
