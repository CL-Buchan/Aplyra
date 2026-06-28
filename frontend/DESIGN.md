# Trove — Design System

**Aesthetic:** Premium dark UI · inspired by Linear, Stripe, Vercel  
**Font:** Geist (all weights) · Geist Mono (code/data)

---

## Colours

### Background Layers

| Token             | Hex              | Use                                  |
| ----------------- | ---------------- | ------------------------------------ |
| `bg-base`         | `#0D0D0D`        | Page / frame background              |
| `bg-modal`        | `#151515`        | Modal / card background              |
| `bg-input`        | `#101010`        | Input, textarea, dropdown background |
| `bg-button-ghost` | `#1A1A1A`        | Cancel / ghost button background     |
| `bg-scrim`        | `#000000` at 55% | Overlay behind modals                |

### Borders & Dividers

| Token            | Hex              | Use                             |
| ---------------- | ---------------- | ------------------------------- |
| `border-modal`   | `#FFFFFF` at 8%  | Modal card 1px stroke           |
| `border-input`   | `#FFFFFF` at 10% | Input / button 1px stroke       |
| `border-divider` | `#FFFFFF` at 7%  | Header / footer separator lines |

### Text

| Token               | Hex       | Use                                     |
| ------------------- | --------- | --------------------------------------- |
| `text-primary`      | `#FFFFFF` | Headings, input values, primary content |
| `text-secondary`    | `#888888` | Subtitles, muted labels                 |
| `text-label`        | `#999999` | Form field labels                       |
| `text-optional`     | `#6B6B6B` | "· Optional" label suffix               |
| `text-placeholder`  | `#595959` | Input placeholder text                  |
| `text-muted-button` | `#888888` | Cancel button label                     |

### Status Indicators

| Status    | Hex                |
| --------- | ------------------ |
| Applied   | `#63B37E` (green)  |
| Interview | `#5C8FF7` (blue)   |
| Offer     | `#A78BFA` (purple) |
| Rejected  | `#F87171` (red)    |

### Buttons

| Token              | Hex              | Use                                  |
| ------------------ | ---------------- | ------------------------------------ |
| `btn-primary-bg`   | `#FFFFFF`        | Add Job / primary CTA background     |
| `btn-primary-text` | `#000000`        | Add Job / primary CTA label          |
| `btn-ghost-bg`     | `#1A1A1A`        | Cancel / secondary button background |
| `btn-ghost-text`   | `#888888`        | Cancel / secondary button label      |
| `btn-ghost-border` | `#FFFFFF` at 10% | Cancel / secondary button stroke     |

---

## Typography

**Font family:** `Geist`, `Geist Mono`

| Role                   | Family | Weight   | Size |
| ---------------------- | ------ | -------- | ---- |
| Modal title            | Geist  | SemiBold | 15px |
| Modal subtitle         | Geist  | Regular  | 13px |
| Field label            | Geist  | Medium   | 12px |
| Input value            | Geist  | Regular  | 13px |
| Placeholder            | Geist  | Regular  | 13px |
| Button label (primary) | Geist  | SemiBold | 13px |
| Button label (ghost)   | Geist  | Medium   | 13px |
| Status indicator       | Geist  | Regular  | 13px |

---

## Border Radius

| Element                                | Radius         |
| -------------------------------------- | -------------- |
| Modal card                             | `12px`         |
| Mobile bottom sheet (top corners only) | `16px`         |
| Inputs / dropdowns / textarea          | `7px`          |
| Buttons (all)                          | `7px`          |
| Close (✕) button                       | `6px`          |
| Status dot                             | `50%` (circle) |
| Mobile drag handle                     | `4px`          |

---

## Spacing

| Token              | Value  | Use                                    |
| ------------------ | ------ | -------------------------------------- |
| `modal-padding-x`  | `24px` | Modal horizontal padding               |
| `form-padding-y`   | `20px` | Form body top / bottom padding         |
| `field-gap`        | `14px` | Vertical gap between form fields       |
| `label-input-gap`  | `6px`  | Gap between label and its input        |
| `column-gap`       | `12px` | Gap between side-by-side field columns |
| `footer-padding`   | `16px` | Footer padding all sides               |
| `button-gap`       | `8px`  | Gap between Cancel and Add Job         |
| `button-padding-x` | `16px` | Horizontal padding inside buttons      |
| `header-padding-y` | `20px` | Header top / bottom padding            |

---

## Component Sizing

| Component                | Size                           |
| ------------------------ | ------------------------------ |
| Single-line input height | `36px`                         |
| Textarea height          | `88px`                         |
| Button height            | `32px`                         |
| Close button             | `28 × 28px`                    |
| Status dot               | `7 × 7px`                      |
| Status dot → text gap    | `8px`                          |
| Modal width (desktop)    | `520px`                        |
| Mobile drag handle       | `36 × 4px`                     |
| Drop shadow              | `0 24px 60px -8px #000` at 60% |

---

## Modal Structure

```
┌─────────────────────────────────────┐
│ Header (title + subtitle + ✕)       │  padding: 20px 24px
├─────────────────────────────────────┤  divider: #FFF 7%
│ Form Body                           │  padding: 20px 24px · gap: 14px
│  · Role                             │
│  · Company / Location (2-col)       │
│  · Status (dropdown)                │
│  · Applied Date / Closing (2-col)   │
│  · Job Description (textarea)       │
├─────────────────────────────────────┤  divider: #FFF 7%
│ Footer (● Ready to save · Cancel · Add Job) │  padding: 16px
└─────────────────────────────────────┘
```

---

## Mobile (Bottom Sheet)

- Full-width sheet anchored to bottom of screen
- Top corners `16px` radius · no bottom radius
- Drag handle centred `12px` from top: `36 × 4px`, `#2A2A2A`, `4px` radius
- All fields single-column (no side-by-side rows)
- Footer buttons full-width stacked: Add Job on top · Cancel below · `8px` gap
