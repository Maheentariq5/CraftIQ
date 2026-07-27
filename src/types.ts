export type ToolType = "dashboard" | "branding" | "pricing" | "persona" | "marketing" | "chat" | "saved" | "about";

export type CurrencyCode = "USD" | "PKR" | "EUR" | "GBP" | "INR" | "CAD" | "AUD" | "AED";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: "USD", symbol: "$", name: "USD ($)" },
  { code: "PKR", symbol: "PKR ", name: "PKR (Rs)" },
  { code: "EUR", symbol: "€", name: "EUR (€)" },
  { code: "GBP", symbol: "£", name: "GBP (£)" },
  { code: "INR", symbol: "₹", name: "INR (₹)" },
  { code: "CAD", symbol: "CA$", name: "CAD (CA$)" },
  { code: "AUD", symbol: "A$", name: "AUD (A$)" },
  { code: "AED", symbol: "AED ", name: "AED" },
];

export interface BrandingInput {
  productName: string;
  category: string;
  materials: string;
  targetAudience: string;
  occasion: string;
  brandStyle: string;
}

export interface BrandingResult {
  creativeNames: { name: string; vibe: string }[];
  tagline: string;
  brandStory: string;
  emotionalDescription: string;
  uniqueSellingPoints: string[];
  packagingIdeas: { idea: string; details: string }[];
  socialPostHook: string;
  brandColorPalette?: { colorName: string; hexCode: string; mood: string }[];
  seoKeywords?: string[];
  unboxingTip?: string;
}

export interface PricingInput {
  materialCost: number;
  currency: CurrencyCode;
  timeHours: number;
  difficulty: "Easy" | "Medium" | "Hard";
  desiredMargin: string;
  category: string;
  productNotes: string;
}

export interface PricingResult {
  currency: string;
  suggestedPrice: number;
  minimumPrice: number;
  premiumPrice: number;
  wholesalePrice?: number;
  suggestedHourlyRate: number;
  estimatedProfitAmount: number;
  pricingExplanation: string;
  breakdownItems: {
    component: string;
    estimatedCost: string;
    explanation: string;
  }[];
  tipsToIncreaseValue: string[];
  craftingTimeHack?: string;
  customOrderDepositTip?: string;
  disclaimer: string;
}

export interface PersonaInput {
  productType: string;
  priceRange: string;
  occasion: string;
  productStyle: string;
}

export interface PersonaResult {
  personaName: string;
  ageGroup: string;
  occupationAndLifestyle: string;
  buyingMotivation: string;
  painPoints: string[];
  preferredMarketingApproach: string;
  bestPlatforms: {
    platform: string;
    reason: string;
  }[];
  sampleCustomerQuote: string;
  whereToFindThem?: string[];
  objectionHandlingScript?: string;
}

export interface CalendarPost {
  day: string;
  contentType: string;
  concept: string;
  captionHook: string;
  callToAction: string;
}

export interface CalendarWeek {
  week: string;
  posts: CalendarPost[];
}

export interface MarketingInput {
  product: string;
  targetAudience: string;
  platform: string;
  campaignType: string;
}

export interface MarketingResult {
  campaignSummary: string;
  monthlyCalendar: CalendarWeek[];
  campaignIdeas: {
    title: string;
    description: string;
  }[];
  promotionalCaptions: string[];
  discountAndBundleStrategies: string[];
  engagementIdeas: string[];
  recommendedHashtags: string[];
  soloMakerTimeHack?: string;
  shortFormVideoIdeas?: {
    title: string;
    videoConcept: string;
    audioVibe: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface SavedAsset {
  id: string;
  type: "branding" | "pricing" | "persona" | "marketing";
  title: string;
  subtitle: string;
  createdAt: string;
  data: BrandingResult | PricingResult | PersonaResult | MarketingResult;
}
