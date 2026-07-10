# Control Desk → NemezisAI Migration Plan

Status: LOCKED  
Target: `nemezis-ai-agency-os`  
Source: existing Control Desk repository, read-only reference

## 1. Migration principle

Control Desk is a design and component reference, not the NemezisAI codebase. The old repository remains untouched. NemezisAI receives only audited patterns that support the v0.1 demo.

The migration objective is to preserve useful operational clarity while changing the product posture from an experimental command center to a premium staffing-agency platform.

## 2. Audited source logic

The source audit covered the Control Desk README, deployed dashboard, fixture model, dashboard derivations, navigation, worker table, inbox triage, company overview, documents, payroll preview, and leave actions. The audited fixture model now lives in `lib/control-desk-fixtures.ts` as synthetic demo data.

The second reference found through repository search was `YamanAddas/YamanOS`. It is a mobile browser-OS simulation, not a staffing system. Its useful patterns are adapted rather than copied: a guarded boot sequence, a kernel-owned event bus, isolated services, process lifecycle events, mobile-first shell behavior, and browser persistence boundaries. Its unrelated apps and virtual filesystem are not part of the NemezisAI staffing domain.

The NemezisAI implementation boundary is now:

```text
Control Desk fixtures and derivations
  → staffing operations overview and alert queue
YamanOS lifecycle patterns
  → agency kernel, event history, service status, and guarded actions
Worker Buddy domain
  → transport case creation, coordinator resolution, owner impact
```

## 3. What we may reuse

| Control Desk asset | NemezisAI use | Decision |
| --- | --- | --- |
| Dark cockpit visual language | Base theme and contrast system | Reuse after audit |
| Side navigation | Role-specific shell navigation | Adapt |
| Status cards | Worker, case, attendance, and owner KPIs | Reuse pattern |
| Alert styling | Severity and queue presentation | Adapt |
| Operator actions | Explicit actions with confirmation | Reuse concept |
| Module grouping | Worker / Operations / Owner surfaces | Recompose |
| Audited fixture model and metric derivations | Typed demo domain data and operational KPIs | Reuse with synthetic-data boundary |
| Existing code | Direct copy of routes, auth, or deployment configuration | Prohibited |

## 4. What we must not copy blindly

- old routes, auth assumptions, or permission checks;
- hidden coupling between UI and demo state;
- placeholder controls that do not perform actions;
- direct strings embedded in components;
- old product names, client data, identifiers, or deployment configuration;
- unfinished command-center metaphors that make the staffing workflow unclear;
- any production integrations, credentials, or records.

## 5. Target shell

The NemezisAI shell keeps the useful cockpit characteristics but changes the hierarchy:

```text
Agency identity
  → current role and locale
  → primary operational status
  → role-specific navigation
  → contextual actions
  → human-readable activity history
```

The role switcher is a demo control, not a production authorization bypass. In production, role access must come from the permissions package and server-side checks.

## 6. Role mapping

| Source idea | NemezisAI surface | v0.1 responsibility |
| --- | --- | --- |
| Operator dashboard | Coordinator Workspace | Receive and resolve Buddy cases |
| Agent/user activity | Worker Preview | View planning, use Buddy, message a human |
| HR command desk | HR / Administration | Manage people, documents, companies and review queues |
| System overview | Boss Control Tower | See case, client-impact and organization changes |
| Global alerts | Shared case/alert model | Reflect severity consistently |
| Command actions | Confirmed workflow actions | Resolve demo cases only |

## 7. Migration sequence

1. Inspect Control Desk routes, components, tokens, and state boundaries.
2. Record reusable assets and rejected assets in the implementation commit.
3. Rebuild the NemezisAI shell in the new repository.
4. Add role and locale switchers with deterministic demo state.
5. Add Worker Preview and Worker Buddy proof flow.
6. Add Coordinator case/planning/messenger workspace.
7. Add HR / Administration modules and Boss state summary.
7. Run typecheck, build, locale validation, and Playwright smoke before adding further modules.

Each migration step gets its own commit. The fixture model is an explicit audited import; routes, auth, deployment files, and unrelated UI are not copied as a generated dump or mixed refactor.

## 8. UI acceptance rules

- Every visible required tab has a real destination or an explicit disabled/future state.
- Every action changes demo state, opens a meaningful detail view, or explains why it is unavailable.
- No primary action is satisfied by a toast-only placeholder; a click must navigate, mutate shared demo state, open a form, or open a real phone/message action.
- Status colors have a text label and are not the only accessibility signal.
- Worker App layout is usable at mobile width before desktop polish is considered complete.
- Owner views prioritize operational numbers and impact over decorative charts.
- Buddy always exposes contact with a human.

## 9. Data and security boundary

The migration may copy visual tokens and generic UI patterns only. It must not copy real worker, client, payroll, message, document, credential, or deployment data. Demo fixtures must be newly authored under `packages/demo-data`.

## 10. Rollback

If a migrated component introduces coupling or visual regression, revert the individual NemezisAI migration commit. Do not modify or reset the Control Desk repository. A Vercel Preview is required before merging shell changes into `main`.

## 11. Definition of done

Migration is complete for v0.1 when the NemezisAI shell supports the four branches, the primary Buddy transport flow and messenger/planning actions are connected to the API, the Boss sees the resulting state change, Control Desk-derived operational metrics are computed from typed fixtures, the seven Wave 1 locales use external messages, YamanOS-derived lifecycle boundaries are visible in the server state, and both source repositories remain unchanged.
