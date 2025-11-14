const DEFAULT_CLIENT_PLAN_IDS = {
  starter: 'price_1SP9dPAkkVcTj4lDpEgJw86H',
  professional: 'price_1SP9fAAkkVcTj4lDyXaLp2WE',
  enterprise: 'price_1SP9fcAkkVcTj4lD1hyKGlMa',
}

export const CLIENT_PLAN_IDS = {
  starter:
    process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || DEFAULT_CLIENT_PLAN_IDS.starter,
  professional:
    process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID ||
    DEFAULT_CLIENT_PLAN_IDS.professional,
  enterprise:
    process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID ||
    DEFAULT_CLIENT_PLAN_IDS.enterprise,
}

export const PLAN_NAME_BY_PRICE_ID: Record<string, string> = {
  [CLIENT_PLAN_IDS.starter]: 'Basic',
  [CLIENT_PLAN_IDS.professional]: 'Professional',
  [CLIENT_PLAN_IDS.enterprise]: 'Premium',
}


