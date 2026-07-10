# Control Desk → NemezisAI Migration Plan

Status: LOCKED  
Target: `nemezis-ai-agency-os`  
Source: existing Control Desk repository, read-only reference

## 1. Migration principle

Control Desk is a design and component reference, not the NemezisAI codebase. The old repository remains untouched. NemezisAI receives only audited patterns that support the v0.1 demo.

The migration objective is to preserve useful operational clarity while changing the product posture from an experimental command center to a premium staffing-agency platform.

## 2. What we may reuse

| Control Desk asset | NemezisAI use | Decision |
| --- | --- | --- |
| Dark cockpit visual language | Base theme and contrast system | Reuse after audit |
| Side navigation | Role-specific shell navigation | Adapt |
| Status cards | Worker, case, attendance, and owner KPIs | Reuse pattern |
| Alert styling | Severity and queue presentation | Adapt |
| Operator actions | Explicit actions with confirmation | Reuse concept |
| Module grouping | Worker / Operations / Owner surfaces | Recompose |
| Existing code | Direct copy of business logic | Prohibited until reviewed |

## 3. What we must not copy blindly

- old routes, auth assumptions, or permission checks;
- hidden coupling between UI and demo state;
- placeholder controls that do not perform actions;
- direct strings embedded in components;
- old product names, client data, identifiers, or deployment configuration;
- unfinished command-center metaphors that make the staffing workflow unclear;
- any production integrations, credentials, or records.

## 4. Target shell

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

## 5. Role mapping

| Source idea | NemezisAI surface | v0.1 responsibility |
| --- | --- | --- |
| Operator dashboard | Operations Workspace | Receive and resolve Buddy cases |
| Agent/user activity | Worker App | View shift, use Buddy, confirm status |
| System overview | Owner Control Tower | See case and client-impact changes |
| Global alerts | Shared case/alert model | Reflect severity consistently |
| Command actions | Confirmed workflow actions | Resolve demo cases only |

## 6. Migration sequence

1. Inspect Control Desk routes, components, tokens, and state boundaries.
2. Record reusable assets and rejected assets in the implementation commit.
3. Rebuild the NemezisAI shell in the new repository.
4. Add role and locale switchers with deterministic demo state.
5. Add the Worker App and Worker Buddy proof flow.
6. Add Operations case queue and Owner state summary.
7. Run typecheck, build, locale validation, and Playwright smoke before adding further modules.

Each migration step gets its own commit. No mass copy, generated dump, or mixed refactor is allowed in the first implementation branch.

## 7. UI acceptance rules

- Every visible required tab has a real destination or an explicit disabled/future state.
- Every action changes demo state, opens a meaningful detail view, or explains why it is unavailable.
- Status colors have a text label and are not the only accessibility signal.
- Worker App layout is usable at mobile width before desktop polish is considered complete.
- Owner views prioritize operational numbers and impact over decorative charts.
- Buddy always exposes contact with a human.

## 8. Data and security boundary

The migration may copy visual tokens and generic UI patterns only. It must not copy real worker, client, payroll, message, document, credential, or deployment data. Demo fixtures must be newly authored under `packages/demo-data`.

## 9. Rollback

If a migrated component introduces coupling or visual regression, revert the individual NemezisAI migration commit. Do not modify or reset the Control Desk repository. A Vercel Preview is required before merging shell changes into `main`.

## 10. Definition of done

Migration is complete for v0.1 when the NemezisAI shell supports the three roles, the primary Buddy transport flow is connected, the owner sees the resulting state change, the seven Wave 1 locales use external messages, and the source Control Desk remains unchanged.
