export type ChatCategory =
  | 'pricing_inquiry'
  | 'demo_request'
  | 'product_info'
  | 'lead_qualification'
  | 'competitor_comparison'
  | 'support'
  | 'contact_info'
  | 'general_pythia';

const PRIORITY_ORDER: ChatCategory[] = [
  'demo_request',
  'lead_qualification',
  'pricing_inquiry',
  'general_pythia',
  'contact_info',
  'competitor_comparison',
  'product_info',
  'support',
];

const CATEGORY_PATTERNS: Record<ChatCategory, RegExp[]> = {
  demo_request: [
    /demo|book|schedule|calendar|trial|try it|see it|show me|walkthrough/i,
    /15.?minute|meeting|call|appointment/i,
    /interested|want to (see|know more|learn)/i,
  ],
  lead_qualification: [
    /\b(\d+)\s*(store|location|site|branch|outlet)/i,
    /\b(one|two|three|four|five|ten|twenty|hundred)\s*(store|location)/i,
    /franchise|chain|multi.?location|multiple (store|site)/i,
    /manager|director|owner|ceo|decision maker|approve/i,
    /how soon|timeline|when can|start|implement|rollout/i,
  ],
  pricing_inquiry: [
    /price|pricing|cost|how much|afford|budget|plan|subscription|fee/i,
    /\$\d+|dollar|monthly|annual|yearly|per month/i,
    /expensive|cheap|value|worth|roi|return on investment/i,
  ],
  contact_info: [
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    /phone|call me|reach me|contact me|follow.?up/i,
  ],
  competitor_comparison: [
    /vs|versus|compare|alternative|competitor|better than|different from/i,
    /other (option|tool|software|product|solution)/i,
  ],
  product_info: [
    /how (does|it|do)|what (is|are|does)|feature|explain|tell me about/i,
    /audio|insight|checkout|counter|cashier|staff performance/i,
  ],
  support: [
    /problem|issue|bug|error|not working|help|stuck|broken/i,
    /how to|setup|install|integrate|connect|configure/i,
  ],
  general_pythia: [
    /pythia|scorecard|retail ai|voice|ticket|work order/i,
    /convenience store|fuel|gas station|restaurant|coffee shop|grocery/i,
    /checkout|point of sale|pos|frontline|employee/i,
  ],
};

export function detectCategory(message: string): ChatCategory | null {
  for (const category of PRIORITY_ORDER) {
    const patterns = CATEGORY_PATTERNS[category];
    for (const pattern of patterns) {
      if (pattern.test(message)) {
        return category;
      }
    }
  }
  return null;
}

export function isBantSignal(message: string): boolean {
  const bantPatterns = [
    ...CATEGORY_PATTERNS.lead_qualification,
    ...CATEGORY_PATTERNS.pricing_inquiry,
    ...CATEGORY_PATTERNS.demo_request,
  ];
  return bantPatterns.some(p => p.test(message));
}

export function extractStoreCount(message: string): number | null {
  const match = message.match(/\b(\d+)\s*(store|location|site|branch|outlet)/i);
  return match ? parseInt(match[1]) : null;
}

export function extractEmail(message: string): string | null {
  const match = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : null;
}
