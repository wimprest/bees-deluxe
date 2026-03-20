# Phase 10: Contact Page

**Core Alignment:** Advances **Goals 1 and 2** by building a clean, modern contact form that replaces the dated Wix form — consistent with the site's design system, social links in header/footer only.
**Depends on:** Phase 01, Phase 02

**Acceptance Criteria:**
- [ ] Contact form renders with all four fields
- [ ] Suggested placeholder text in each field
- [ ] Form submits via a server action or API route (no third-party form service required for Phase 10 — mailto fallback is acceptable, flag for Phase 13 upgrade)
- [ ] No social media icons in the page body
- [ ] Booking agent contact info renders
- [ ] Page passes `npm run build` with no TypeScript errors
- [ ] Visual spot-check at 375px and 1280px

---

## Design

Clean, minimal form on a dark background. No card wrapper around the form — fields float directly on the page surface. Teal focus states on inputs. Submit button uses brand.teal background with brand.black text.

The page has two columns on desktop:
- Left (~55%): contact form
- Right (~45%): booking info + context text

Single column on mobile, form first.

---

## Content

### Form Fields

All fields use the following base styling:
```
bg-brand-slate border border-brand-teal/20 text-brand-white
focus:border-brand-teal focus:outline-none
placeholder:text-brand-muted
rounded-none (sharp corners)
px-4 py-3 w-full
```

**Name**
- Label: "Name"
- Placeholder: "Your name"
- Type: text, required

**Email**
- Label: "Email"  
- Placeholder: "your@email.com"
- Type: email, required

**Subject**
- Label: "Subject"
- Placeholder: "Booking inquiry, press request, general question..."
- Type: text, required

**Message**
- Label: "Message"
- Placeholder: "Tell us what's on your mind. For booking inquiries, include your venue name, capacity, and preferred dates."
- Type: textarea, rows: 6, required

**Submit Button**
- Text: "Send Message"
- Style: bg-brand-teal text-brand-black font-heading uppercase tracking-widest px-8 py-3 hover:bg-brand-tealDark transition
- Full width on mobile, auto width on desktop

### Right Column — Booking Info

```
Booking

Steve Gaetz
stevebigcrush@gmail.com
978-537-5111

For press inquiries, interview requests, or review copies,
use the contact form and include your publication credentials.
```

Style: 
- "Booking" label: SectionDivider treatment (or just brand.teal uppercase tracking-widest text-sm)
- Name: font-heading, brand.white, text-lg
- Email: brand.teal, hover:brand.tealLight (mailto link)
- Phone: brand.teal, hover:brand.tealLight (tel link)
- Press note: brand.muted, text-sm, mt-6

### Form Submission

Implement as a Next.js Server Action:
```typescript
// src/app/contact/actions.ts
// 'use server'
// Takes FormData, extracts name/email/subject/message
// For Phase 10: send via nodemailer to a placeholder address OR
// use mailto: fallback that opens email client
// Flag in Phase Report: recommend upgrading to Resend or similar in Phase 13
// Show success/error state in the form after submission
```

Success state: Replace form with "Thanks for reaching out. We'll be in touch soon." in brand.teal.
Error state: Show error message in brand.red below submit button.

---

## Important: No Body Social Icons

The current Wix contact page has social media links in the page body. Do NOT include these. Social icons exist in the nav header and footer only — that was established in Phase 02. Do not add a third instance.

---

## Page Implementation

Replace stub at `src/app/contact/page.tsx`:

```typescript
// 'use client' for form state management
// OR: server component with client ContactForm child component
//
// <PageShell>
//   <SectionDivider label="Contact Bees Deluxe" />
//   <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-16 py-12">
//     <ContactForm />  {/* client component with form state */}
//     <BookingInfo />  {/* static right column */}
//   </div>
// </PageShell>
```

---

## Verification

```bash
npm run build
npm run dev -- -p 3015
```

- [ ] localhost:3015/contact — form renders with all four fields
- [ ] Placeholder text present in all fields
- [ ] Teal border focus state visible when clicking into a field
- [ ] Submit button styled correctly
- [ ] Booking info present on right (desktop) / below form (mobile)
- [ ] No social icons in page body
- [ ] Form submits without console errors
- [ ] Success state renders after submission
- [ ] 375px: single column, form full width, booking info below
