import { BrandingInput, PricingInput, PersonaInput, MarketingInput } from "../types";

export interface PresetItem<T> {
  id: string;
  label: string;
  category: string;
  data: T;
}

export const BRANDING_PRESETS: PresetItem<BrandingInput>[] = [
  {
    id: "crochet-bear",
    label: "Handmade Crochet Teddy Bear",
    category: "Crochet",
    data: {
      productName: "Handmade Plush Teddy Bear",
      category: "Crochet",
      materials: "Hypoallergenic Milk Cotton Yarn, Polyester Fiberfill, Safety Eyes",
      targetAudience: "Parents, Baby Shower Guests, Gift Buyers",
      occasion: "Birthday / Baby Shower",
      brandStyle: "Cute & Whimsical",
    },
  },
  {
    id: "resin-coasters",
    label: "Pressed Flower Resin Coasters",
    category: "Resin / Home Decor",
    data: {
      productName: "Botanical Pressed Flower Coaster Set",
      category: "Gifts / Home Decor",
      materials: "Crystal Clear Epoxy Resin, Real Dried Wildflowers, Gold Leaf Flakes",
      targetAudience: "Aesthetic Home Decor Lovers & Bridesmaids",
      occasion: "Wedding / Housewarming",
      brandStyle: "Elegant & Luxury",
    },
  },
  {
    id: "custom-wedding-cards",
    label: "Hand-Painted Floral Wedding Invitations",
    category: "Cards & Paper",
    data: {
      productName: "Custom Calligraphy Wedding Invitation Suite",
      category: "Cards",
      materials: "300gsm Cotton Paper, Watercolor Paints, Gold Wax Seal, Silk Ribbon",
      targetAudience: "Brides, Groom & Event Planners",
      occasion: "Wedding / Anniversary",
      brandStyle: "Elegant & Traditional",
    },
  },
  {
    id: "clay-earrings",
    label: "Abstract Polymer Clay Statement Earrings",
    category: "Jewelry",
    data: {
      productName: "Hand-sculpted Statement Drop Earrings",
      category: "Jewelry",
      materials: "Polymer Clay, Stainless Steel Earring Posts, Brass Charms",
      targetAudience: "Gen Z & Millennial Fashion Enthusiasts",
      occasion: "Everyday Wear / Festival",
      brandStyle: "Minimal & Modern",
    },
  },
];

export const PRICING_PRESETS: PresetItem<PricingInput>[] = [
  {
    id: "crochet-blanket",
    label: "Baby Blanket (Crochet)",
    category: "Crochet",
    data: {
      materialCost: 2500,
      currency: "PKR",
      timeHours: 6,
      difficulty: "Medium",
      desiredMargin: "Standard (40-50%)",
      category: "Crochet",
      productNotes: "Takes 6 hours of detailed stitch work. Uses premium soft velvet yarn.",
    },
  },
  {
    id: "floral-bouquet",
    label: "Satin Ribbon Flower Bouquet",
    category: "Flowers / Gifts",
    data: {
      materialCost: 1800,
      currency: "PKR",
      timeHours: 3.5,
      difficulty: "Medium",
      desiredMargin: "High Margin (50%+)",
      category: "Flowers",
      productNotes: "12 handcrafted satin roses wrapped in vintage Korean floral paper with LED wire lights.",
    },
  },
  {
    id: "sticker-sheet",
    label: "Die-Cut Vinyl Sticker Pack (Set of 5)",
    category: "Stickers",
    data: {
      materialCost: 8,
      currency: "USD",
      timeHours: 1.5,
      difficulty: "Easy",
      desiredMargin: "Standard (40-50%)",
      category: "Stickers",
      productNotes: "Waterproof glossy vinyl stickers designed digitally and hand-cut with Cricut machine.",
    },
  },
];

export const PERSONA_PRESETS: PresetItem<PersonaInput>[] = [
  {
    id: "wedding-bride",
    label: "Handmade Wedding Stationery",
    category: "Wedding Cards",
    data: {
      productType: "Custom Calligraphy Wedding Cards & Wax Seals",
      priceRange: "Premium ($80 - $250 set)",
      occasion: "Wedding & Engagement",
      productStyle: "Elegant & Romantic",
    },
  },
  {
    id: "crochet-parent",
    label: "Custom Baby Keepsakes",
    category: "Crochet",
    data: {
      productType: "Handmade Baby Rattles & Amigurumi Toys",
      priceRange: "Moderate ($25 - $60)",
      occasion: "Baby Shower & First Birthday",
      productStyle: "Cute, Soft & Natural",
    },
  },
];

export const MARKETING_PRESETS: PresetItem<MarketingInput>[] = [
  {
    id: "crochet-launch",
    label: "New Spring Crochet Collection Launch",
    category: "Crochet",
    data: {
      product: "Handcrafted Crochet Plushies & Keychains",
      targetAudience: "Gen-Z craft collectors, gift givers, and aesthetic desk lovers",
      platform: "Instagram & TikTok",
      campaignType: "New Collection Launch",
    },
  },
  {
    id: "eid-special",
    label: "Eid & Festive Gift Hamper Campaign",
    category: "Gifts / Festive",
    data: {
      product: "Handmade Scented Candles, Card & Floral Gift Box",
      targetAudience: "Families, corporate gift givers, and friends celebrating Eid",
      platform: "Instagram & Facebook",
      campaignType: "Festive Sale / Pre-Orders",
    },
  },
];
