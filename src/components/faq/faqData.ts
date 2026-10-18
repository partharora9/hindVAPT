export interface FaqItemData {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const FAQS_DATA: FaqItemData[] = [
  {
    id: "faq-01",
    number: "[01]",
    question: "WHAT CYBERSECURITY SERVICES DO YOU PROVIDE?",
    answer:
      "We provide continuous threat monitoring, vulnerability management, endpoint and cloud protection, incident response, and compliance support, all from a single platform.",
  },
  {
    id: "faq-02",
    number: "[02]",
    question: "HOW DO YOU PROTECT BUSINESSES FROM CYBER THREATS?",
    answer:
      "Our AI engine correlates events across your whole infrastructure in real time, blocks threats before they spread, and sends prioritized alerts so your team acts on real risks, not noise.",
  },
  {
    id: "faq-03",
    number: "[03]",
    question: "CAN YOUR SOLUTIONS SCALE WITH GROWING BUSINESSES?",
    answer:
      "Yes. VAULTIX scales automatically from a small team to a global enterprise, adding coverage for new users, devices and cloud workloads without re-architecture.",
  },
  {
    id: "faq-04",
    number: "[04]",
    question: "HOW QUICKLY CAN YOU RESPOND TO A SECURITY INCIDENT?",
    answer:
      "Critical threats are detected in under 200ms and automated containment starts immediately. Our response team is available 24/7 for escalation.",
  },
  {
    id: "faq-05",
    number: "[05]",
    question: "HOW DO WE GET STARTED WITH YOUR CYBERSECURITY SERVICES?",
    answer:
      "Start a free trial, connect your environment in minutes, and our team guides you through setup and your first security report.",
  },
  {
    id: "faq-06",
    number: "[06]",
    question: "DO YOU HELP WITH COMPLIANCE AND SECURITY REGULATIONS?",
    answer:
      "We map your controls to major frameworks such as ISO 27001, SOC 2, GDPR and HIPAA, and generate audit-ready evidence automatically.",
  },
];
