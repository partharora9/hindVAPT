# VAULTIX Content Action Registry (CONTENT_TODO.md)

This registry catalogs every item requiring owner verification, client consent, or legal review before public deployment.

---

## 1. [CONFIRM] Company Commitments & Policies
*The owner must explicitly confirm or adjust these operational policies before launching.*

- [ ] **100% Findings Validated**: Hero stat commitment that every automated candidate finding undergoes manual validation by an engineer prior to client reporting.
- [ ] **10+ Testing Domains**: Hero stat claiming capability across Web, Mobile, API, Network, Cloud, Code, Red Team, Social Engineering, Wireless, and Active Directory.
- [ ] **1 Free Retest**: Policy offering one complimentary remediation verification test per engagement scope.
- [ ] **Turnaround Timelines**: FAQ [04] commitment that standard engagements deliver within 1 to 4 weeks.
- [ ] **Rules of Engagement**: About page commitment to 100% written authorisation, pre-agreed testing windows, and safe payload limits.

---

## 2. [VERIFY] Industry Citations & Benchmarks
*Any public figures or external benchmarks must have cited primary sources with year.*

- [ ] **OWASP Top 10 Reference**: Verify current standard version applied across testing methodology (OWASP Top 10:2021).
- [ ] **CVSS Versioning**: Verify all severity ratings default to CVSS v3.1 / CVSS v4.0 standard calculator scoring.
- [ ] **Compliance Frameworks**: Verify testing reporting alignment for ISO 27001:2022, SOC 2 Type II, PCI DSS v4.0.1, and GDPR Article 32.

---

## 3. [REAL] Production Facts & Credentials
*Never publish placeholder names or unverified achievements. Replace with verified facts upon receipt.*

- [ ] **Corporate Contact Details** (`src/content/site.ts`):
  - Official business email (current placeholder: `contact@vaultix.security`)
  - Direct telephone line (current placeholder: `+44 (0) 20 7946 0912`)
  - Registered company office location (current placeholder: `London, United Kingdom`)
- [ ] **Executive Team** (`src/content/about.ts`):
  - Real names, verified headshots, and authenticated certifications (OSCP, OSWE, CREST, CISSP).
  - *Current status*: Hidden in production (`isVerified: false`), rendered with `PLACEHOLDER` ribbon in dev.
- [ ] **Verified Client Testimonials** (`src/content/testimonials.ts`):
  - Signed written consent and approved quote text from client CISOs / CTOs.
  - *Current status*: Hidden in production (`isVerified: false`), rendered with `PLACEHOLDER` ribbon in dev.
- [ ] **Legal Policies** (Draft pages in `/privacy-policy`, `/terms-of-service`, `/responsible-disclosure`, `/security-policy`):
  - Professional legal counsel review required to remove the "Draft: needs legal review" advisory banner.

---

## 4. [LOGO] Enterprise Client Logos & Trademarks
*Only display client trademarks when written authorisation has been granted.*

- [ ] **Client Logos Mode** (`src/content/home.ts` -> `standards.clientLogosMode`):
  - Currently set to `false`. Displays universal security standard wordmarks (OWASP, NIST, MITRE, ISO 27001, etc.).
  - Toggle `clientLogosMode: true` only after obtaining signed trademark licensing permissions from enterprise customers.
