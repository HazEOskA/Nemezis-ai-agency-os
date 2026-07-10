# NemezisAI Demo Flow v0.1

Demo agency: `Nemezis Logistics Staffing`  
Primary proof: `Worker Buddy → transport case → coordinator resolution → owner state`  
Secondary operational branch: `absence → alert → replacement → client impact`

## 1. Demo goal

Show one connected day-in-the-life workflow instead of a dashboard full of inactive screens. The viewer must be able to understand what happens to a new worker, what the coordinator receives, and why the owner cares.

All records are synthetic fixtures. No real client, worker, payroll, or document data is used.

## 2. Seed scenario

| Record | Demo value |
| --- | --- |
| Worker | Mila Ionescu |
| Worker language | Romanian (`ro`) |
| Coordinator | Anna Nowak |
| Client site | FreshLogistics |
| Shift | Tomorrow, 06:00–14:00 |
| Transport | Pickup 05:15, Location A |
| Worker Buddy | Active, day 1 of 60 |
| Initial case state | No open case |

The same scenario must be viewable through the role switcher as Worker Preview, Coordinator, HR / Administration, and Boss Control Tower.

## 3. Four-branch responsibility map

| Branch | Owns | Does not own |
| --- | --- | --- |
| Boss | Agency-wide status, escalations, decisions, client impact | Daily HR edits or worker scheduling details |
| HR / Administration | Candidates, workers, companies, documents, payroll preview, leave review | Coordinator case resolution |
| Coordinator | Planning, messenger, Buddy cases, attendance and worker coverage | Payroll approval, termination, HR record changes |
| Worker Preview | Read planning, acknowledge, message human, use Buddy, important numbers | Schedule changes, leave approval, payroll or agency data |

## 4. Mandatory primary flow

### Step 1 — Worker opens the first-day view

Worker App shows:

- next shift and start time;
- FreshLogistics location;
- 05:15 transport pickup;
- coordinator Anna Nowak;
- onboarding progress;
- visible `Contact a human` action;
- visible language and Buddy settings.

Buddy identifies itself as AI and asks whether the information is clear.

### Step 2 — Worker reports a transport problem

The worker selects:

```text
Mam problem z transportem
```

Buddy collects only the required demo information, shows the data that will be shared, and asks for confirmation before creating the case.

### Step 3 — Buddy creates the structured case

On confirmation, the demo state changes to:

```text
transport_issue_reported
  → case_created
  → coordinator_queue
  → worker_notified
```

Case payload:

```text
category: transport
severity: orange
worker: Mila Ionescu
shift: tomorrow 06:00
pickup: Location A, 05:15
assigned_to: Anna Nowak
source: Worker Buddy
status: open
```

The worker sees a case identifier and an open status. The coordinator sees one structured queue item, not a loose chat message.

### Step 4 — Coordinator resolves the case

Coordinator Workspace provides a real demo action:

```text
Confirm transport solution
```

The action requires confirmation and changes the case to `resolved`. The activity history records who performed the action and when, using demo identity.

### Step 5 — Worker sees the result

Worker App receives the updated state:

```text
Transport confirmed for tomorrow, 05:15, Location A.
Coordinator Anna Nowak has been notified.
```

The worker can acknowledge the update or request a human. The status remains visible from the Buddy case panel.

### Step 6 — Owner sees operational impact

Boss Control Tower updates:

- open transport cases: `1 → 0`;
- resolved cases today: `+1`;
- worker readiness: `needs attention → ready`;
- activity log: `Worker Buddy transport case resolved`.

The owner view must make the relationship between the worker event and the operational KPI obvious.

## 4. Secondary absence/coverage branch

This branch validates the operational alert model without requiring payroll or external integrations.

```text
worker cannot attend
  → Buddy asks for confirmation and reason category
  → critical absence case is created
  → coordinator receives red alert
  → coordinator triggers demo replacement action
  → worker and operations see status
  → owner sees client-impact update
```

Required states:

```text
scheduled
  → absence_reported
  → replacement_requested
  → replacement_confirmed
  → owner_impact_updated
```

The demo may use a seeded replacement worker. It must not claim that a real person was contacted or that a real shift was changed.

## 5. Buddy response rules in the demo

Buddy can explain seeded agency information, collect transport or absence details, create a case, route it, show status, and request confirmation. It cannot change a schedule, approve money, make employment decisions, provide legal advice, or hide its AI identity.

When a fact is not in fixtures, the visible fallback is:

> Nie mam wystarczających informacji. Przekazuję sprawę koordynatorowi.

Sensitive categories such as health, pay, and conflict must route to a human queue and must not be resolved by Buddy itself.

## 6. Role walkthrough

| Role | Entry point | Proof visible |
| --- | --- | --- |
| Worker Preview | `/{locale}/worker` | Planning, Buddy, messenger, numbers, case status |
| Coordinator | `/{locale}/coordinator` | Planning, messenger queue, structured cases, resolution action |
| HR / Administration | `/{locale}/operations` | People, companies, documents, payroll preview, leave and inbox |
| Boss | `/{locale}/owner` | KPIs, hierarchy, escalations, decisions and client impact |
| Demo controller | `/{locale}/demo` | Reset fixtures, switch role, run scenario |

The demo controller is a presentation utility and must be clearly labeled. It is not a production admin surface.

## 7. Reset behavior

The controller can reset the scenario to its seed state. Reset is explicit and must not delete anything outside local demo state. Refreshing the page should preserve the current demo state for the active session where practical.

## 8. Acceptance checklist

- [ ] Worker can view the shift and transport details.
- [ ] Buddy is visibly identified as AI.
- [ ] Worker can select the transport problem.
- [ ] Buddy shows the information-sharing boundary and asks for confirmation.
- [ ] A structured case appears in the coordinator queue.
- [ ] Coordinator can resolve it with a confirmed action.
- [ ] Worker sees the updated status.
- [ ] Worker can acknowledge planning and send a messenger message.
- [ ] Coordinator sees the message and planning update.
- [ ] HR sees the structured operational record.
- [ ] Boss sees the KPI and activity change.
- [ ] Absence/coverage branch is testable from seeded state.
- [ ] Human-contact action is always visible.
- [ ] Mobile layout is usable for Worker App.
- [ ] Every required visible control works.
