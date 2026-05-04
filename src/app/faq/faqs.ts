export type FAQItem = {
  question: string;
  answer: string;
};

export const faqs: FAQItem[] = [
  {
    question: "How many locations do I need to get started?",
    answer:
      "You can start with one location. Pythia Scorecard works for a single store, a regional group, or a large chain. Most operators begin with one or two sites, validate the impact on coaching and sales, and then expand deployment across additional locations.",
  },
  {
    question: "What hardware do I actually receive?",
    answer:
      "You receive a compact plug-and-play device for the checkout area. The hardware is designed to sit discreetly at the counter, connect to power and Wi-Fi, and start processing conversations quickly. There is no bulky installation process, and most teams can get the device running without specialized technical support.",
  },
  {
    question:
      "Who can see the insights, just corporate, or store managers too?",
    answer:
      "Corporate leaders, regional operators, and store managers can all access relevant insights. The platform presents a network-wide view for leadership and a store-level view for local teams. That structure helps decision makers compare performance across locations while giving managers practical coaching signals they can use every day.",
  },
  {
    question:
      "How does Pythia handle noisy or high-traffic store environments?",
    answer:
      "Pythia Scorecard is built for busy convenience and fuel retail environments. The system focuses on checkout interactions and filters routine background noise such as traffic, coolers, and overlapping store activity. That approach preserves useful signal quality and helps the platform produce reliable insights even during high-volume operating periods.",
  },
  {
    question: "How is Pythia different from a mystery shop program?",
    answer:
      "Pythia Scorecard measures real checkout conversations continuously instead of sampling a few staged visits each month. Mystery shops provide limited snapshots, while Pythia captures day-to-day behavior across shifts and stores. That continuous view gives operators stronger evidence for coaching, consistency, and inside sales performance than occasional evaluations can provide.",
  },
  {
    question: "How does the AI scoring work?",
    answer:
      "Pythia Scorecard analyzes employee and customer conversations at the register and scores each interaction against defined service and sales behaviors. The platform turns those observations into clear performance signals, trend reporting, and coaching opportunities. Managers receive actionable data that supports more consistent feedback than memory, intuition, or isolated observations.",
  },
  {
    question:
      "How does Pythia handle work orders and maintenance tickets?",
    answer:
      "Pythia Scorecard detects maintenance issues, service breakdowns, and customer complaints during checkout conversations. When a problem is mentioned, the system can capture the issue details and route them into the right workflow quickly. That reduces reporting delays and helps teams respond to operational problems while they still affect the customer experience.",
  },
  {
    question: "How does Pythia handle customer privacy?",
    answer:
      "Pythia Scorecard is designed with privacy as a core requirement. Audio is processed locally on the device using edge AI, and customer voice recordings and personally identifiable information are not stored in the cloud. This architecture helps operators gain operational insight while limiting unnecessary retention of sensitive customer data.",
  },
  {
    question: "Will this integrate with my existing POS system?",
    answer:
      "Pythia Scorecard is built to work as a standalone intelligence layer and can also integrate with existing retail systems. The platform supports connections with major providers such as PDI, Verifone, and Gilbarco when operators want to correlate conversation insights with transaction and operational data.",
  },
];
