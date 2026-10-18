export interface FaqItemContent {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const FAQS_CONTENT: FaqItemContent[] = [
  {
    id: "faq-01",
    number: "[01]",
    question: "WHAT IS THE DIFFERENCE BETWEEN VAPT AND A VULNERABILITY SCAN?",
    answer:
      "A scan is automated and lists potential weaknesses. VAPT combines scanning with manual testing by security engineers who validate each issue, exploit it safely and show the real business impact.",
  },
  {
    id: "faq-02",
    number: "[02]",
    question: "WHICH SYSTEMS CAN YOU TEST?",
    answer:
      "Web and mobile applications, APIs, internal and external networks, cloud environments (AWS, Azure, GCP), source code and wireless networks. Scope is agreed in writing before testing starts.",
  },
  {
    id: "faq-03",
    number: "[03]",
    question: "WILL TESTING DISRUPT OUR PRODUCTION SYSTEMS?",
    answer:
      "Testing follows agreed rules of engagement, with safe payloads, rate limits and testing windows. High-risk actions need your approval, and we can test staging environments where you prefer.",
  },
  {
    id: "faq-04",
    number: "[04]",
    question: "HOW LONG DOES A TEST TAKE AND WHAT DO WE RECEIVE?",
    answer:
      "Most engagements take one to four weeks depending on scope. You receive an executive summary, technical findings with proof of concept, CVSS ratings, remediation guidance and a walkthrough call.",
  },
  {
    id: "faq-05",
    number: "[05]",
    question: "HOW DO WE GET STARTED WITH A SECURITY ASSESSMENT?",
    answer:
      "Request a quote, join a short scoping call, and sign the authorisation and NDA. We then agree scope, dates and rules of engagement and begin testing.",
  },
  {
    id: "faq-06",
    number: "[06]",
    question: "DO YOU HELP WITH COMPLIANCE AND SECURITY REGULATIONS?",
    answer:
      "Yes. Our reports map to ISO 27001, SOC 2, PCI DSS and GDPR requirements to support your audits, and retesting verifies that your fixes work.",
  },
];
