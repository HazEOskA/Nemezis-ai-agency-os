# NemezisAI Language Matrix v0.1

Status: framework-first, translation rollout staged  
Manual verification required: Wave 1

## 1. Rules

All user-facing text lives in locale message files. Components must not contain product copy directly. The locale framework may expose all planned locales from the beginning, but an enabled locale is not considered production-ready until its required keys are complete and reviewed.

Machine translation may create a draft. It cannot be treated as final without human review, especially for worker-facing instructions, absence reporting, transport, contracts, pay, health, conflict, and legal-adjacent wording.

## 2. Locale inventory

### EU official languages — Wave 2 after the sales demo

| Locale | Language | Status |
| --- | --- | --- |
| `bg` | Bulgarian | Wave 1 |
| `hr` | Croatian | Wave 2 |
| `cs` | Czech | Wave 2 |
| `da` | Danish | Wave 2 |
| `nl` | Dutch | Wave 1 |
| `en` | English | Wave 1 |
| `et` | Estonian | Wave 2 |
| `fi` | Finnish | Wave 2 |
| `fr` | French | Wave 2 |
| `de` | German | Wave 1 |
| `el` | Greek | Wave 2 |
| `hu` | Hungarian | Wave 2 |
| `ga` | Irish | Wave 2 |
| `it` | Italian | Wave 2 |
| `lv` | Latvian | Wave 2 |
| `lt` | Lithuanian | Wave 2 |
| `mt` | Maltese | Wave 2 |
| `pl` | Polish | Wave 1 |
| `pt` | Portuguese | Wave 2 |
| `ro` | Romanian | Wave 1 |
| `sk` | Slovak | Wave 2 |
| `sl` | Slovenian | Wave 2 |
| `es` | Spanish | Wave 2 |
| `sv` | Swedish | Wave 2 |

### Additional workforce languages — Wave 3

| Locale candidate | Language | Status |
| --- | --- | --- |
| `uk` | Ukrainian | Wave 1 for demo; Wave 3 workforce expansion |
| `tr` | Turkish | Wave 3 |
| `sq` | Albanian | Wave 3 |
| `sr` | Serbian | Wave 3 |
| `bs` | Bosnian | Wave 3 |
| `mk` | Macedonian | Wave 3 |
| `ka` | Georgian | Wave 3 |
| `ru` | Russian | Wave 3 |
| `ar` | Arabic | Wave 3 |

Moldovan worker-language needs are represented by Romanian (`ro`) unless a market-specific requirement later justifies a separate content variant.

## 3. Rollout waves

### Wave 1 — sales demo

`nl`, `en`, `pl`, `ro`, `bg`, `uk`, `de`

These seven locales require manual review before the demo is called ready. They cover the initial Dutch agency market, operator language, and high-value worker groups.

### Wave 2 — complete EU coverage

Add the remaining official EU languages using the same message contract and validation script. A locale can be visible as draft/disabled, but must not be presented as reviewed if it is not.

### Wave 3 — additional workforce coverage

Add Turkish, Albanian, Serbian, Bosnian, Macedonian, Georgian, Russian, Arabic, and any validated market-specific variants.

## 4. Message contract

The first message namespace should cover only the connected demo flow:

```text
common
navigation
roles
worker
workerBuddy
transportCase
operations
owner
notifications
privacy
validation
```

Required keys include role labels, shift details, transport prompt, human-contact action, confirmation copy, case status, coordinator queue labels, owner KPI labels, privacy explanation, and the uncertain-information fallback.

## 5. Translation review checklist

- [ ] Every key exists in the locale file.
- [ ] No locale falls back silently for a required demo key.
- [ ] Worker-facing times, dates, and locations remain unambiguous.
- [ ] Buttons describe the real action.
- [ ] Health, pay, conflict, and legal-adjacent text has human review.
- [ ] AI disclosure and human-contact action are present.
- [ ] Long translations do not break mobile layouts.
- [ ] Pluralization and interpolation placeholders are preserved.
- [ ] The locale is tested in Worker App, Operations Workspace, and Owner Control Tower.

## 6. Validation command contract

The future `scripts/validate-translations.ts` must fail when:

- a required key is missing;
- a locale has an unexpected key without an explicit allowlist decision;
- an interpolation placeholder is lost or renamed;
- a required Wave 1 message is empty;
- a component bypasses the message layer for known user-facing copy.

The script reports locale, namespace, key, and severity so a missing translation is actionable.

## 7. Feature flags

Locale availability is controlled independently from locale files. This allows a draft translation to remain in the repository without exposing it in the public demo. Wave 1 is enabled by default for the demo; Wave 2 and Wave 3 are enabled only after validation and review.
