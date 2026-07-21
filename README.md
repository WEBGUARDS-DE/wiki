# WEBGUARDS Help & Wiki

Public help website with documentation, FAQ, and support pages for WEBGUARDS customers.

**Backend:** [WEBGUARDS-DE/customer](https://github.com/WEBGUARDS-DE/customer)  
**URL:** https://help.webguards.de  
**Status:** Production

---

## Quick Overview

This is a **static documentation site** with:
- 📚 Central wiki & documentation (`/docs/`)
- ❓ FAQ system with auto-generation (`/faq/`)
- 💬 Public support page (`/support/`)
- ⚖️ Legal information (Handelsregisterauszug)

---

## Dokumentation

**Für Details siehe:**

- **[HELPDESK_FRONTEND.md (im customer Repo)](https://github.com/WEBGUARDS-DE/customer/blob/main/HELPDESK_FRONTEND.md)** – Complete frontend architecture & content management
  - Repository structure
  - FAQ auto-generation with build-faq.js
  - Markdown + Frontmatter format
  - Content management workflows
  - Deployment process

---

## Structure

```
/docs/          Main documentation (guides, references, projects)
/faq/           FAQ system (auto-generated from Markdown)
/support/       Public support page
/handelsregister/  Legal company information
/assets/        General images & resources
/assets_webguards/ WEBGUARDS branding
```

---

## Build & Deploy

**FAQ Generation:**
```bash
npm run build:faq
```
Reads `/faq/questions/*.md` → generates `/faq/index.html`

**Content Updates:**
1. Edit Markdown files in `/docs/` or `/faq/questions/`
2. Run `npm run build:faq` (if FAQ changes)
3. Commit & push
4. CI/CD auto-deploys

---

## Adding FAQ Entries

1. Create file: `/faq/questions/my-question.md`
2. Add Frontmatter (title, category, tags) + Content
3. Run `npm run build:faq`
4. Commit & deploy

Example:
```markdown
---
title: "How do I set up my account?"
category: "Getting Started"
tags: ["setup", "account"]
---

## Step by step...
```

---

## Tech Stack

- **Parser:** marked (^11.0.0) – Markdown to HTML
- **Frontmatter:** gray-matter (^4.0.3) – YAML metadata
- **Build:** Node.js (build-faq.js)
- **Hosting:** Static site (Netlify/GitHub Pages/Server)

---

## Integration

**Form to Tickets:**
```
help.webguards.de/support
  → Ticket Form (planned)
    → GitHub Issue in WEBGUARDS-DE/customer
      → Support Team handles it
```

---

## Resources

- **Help Website:** https://help.webguards.de
- **FAQ:** https://help.webguards.de/faq
- **Support:** https://help.webguards.de/support
- **Backend Tickets:** https://github.com/WEBGUARDS-DE/customer

---

**Team:** WEBGUARDS Development & Support  
**Last Updated:** 2026-07-21
