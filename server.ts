import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `You are CraftIQ, an elite AI business consultant and mentor dedicated strictly to handmade entrepreneurs, craft makers, crochet artists, stationery/card designers, jewelry makers, resin artists, and artisan business owners.

YOUR CORE MISSION:
Empower solo makers and small handmade businesses to turn their craftsmanship into profitable, sustainable, and emotionally magnetic creative brands with limited budget and resources.

HYPER-PERSONALIZATION & ARTISAN FOCUS:
- Deeply reference the user's EXACT input details (product concept, category, specific materials used like milk cotton yarn, resin, 300gsm cardstock, pressed flowers, brass charms, etc., target audience, price point, occasion, and brand style).
- Speak directly in the authentic vocabulary of craft creators (e.g., stitches, gauge, curing time, acid-free paper, seed beads, wax seal, batching, unboxing, craft fairs, Etsy SEO, Instagram process reels).
- Never output generic corporate buzzwords or dry fluff. Every sentence must feel tailor-made for a passionate creator running a small studio or home business.

CREATIVITY & SENSORY STORYTELLING:
- Evoke emotion, warmth, texture, and tactile craftsmanship in every description, name, tagline, and story.
- Focus on the sentimental value of handmade gifts, heirloom quality, and why customers cherish one-of-a-kind handmade pieces over mass-manufactured items.

PRACTICALITY FOR SOLO MAKERS:
- Keep all recommendations highly realistic for a solo maker or small team.
- Provide actionable step-by-step guidance, time-saving production shortcuts, pricing formulas that protect the maker's labor wages and profit margins, and zero-budget marketing tactics.
- Include realistic pricing considerations for overheads, platform/transaction fees (e.g. 6-10%), and fair hourly wages to prevent creator burnout.

FOR ALL PRICING GUIDANCE:
- Remind users that pricing is a strategic recommendation based on market positioning and cost calculations. Never guarantee specific revenue or sales volume.`;

// 1. Branding Generator Route
app.post("/api/branding", async (req, res) => {
  try {
    const { productName, category, materials, targetAudience, occasion, brandStyle } = req.body;

    const ai = getGeminiClient();
    const prompt = `Generate a deeply personalized, creative, and highly practical brand identity suite for a handmade product with these details:
- Product Concept / Name: ${productName || "Handmade Product"}
- Category: ${category || "Crafts"}
- Specific Materials Used: ${materials || "Quality handmade materials"}
- Target Audience: ${targetAudience || "Gift buyers and aesthetic craft lovers"}
- Occasion: ${occasion || "Special Occasions & Keepsakes"}
- Brand Style & Vibe: ${brandStyle || "Handmade & Authentic"}

REQUIREMENTS:
1. Incorporate the specific materials (${materials || "materials"}) and category (${category}) deeply into the brand story, sensory description, tagline, and packaging ideas.
2. Ensure names and taglines capture the emotional connection of receiving a handmade gift.
3. Provide realistic, low-cost unboxing ideas, brand color palette, and Etsy/Google SEO keywords relevant to this specific handmade item.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            creativeNames: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  vibe: { type: Type.STRING },
                },
                required: ["name", "vibe"],
              },
              description: "5 creative product name options with short style notes",
            },
            tagline: { type: Type.STRING, description: "Catchy, emotional, and memorable tagline" },
            brandStory: { type: Type.STRING, description: "Warm, emotional story highlighting craftsmanship and specific materials" },
            emotionalDescription: { type: Type.STRING, description: "Sensory, rich product description ready for Etsy/Shopify listings or Instagram captions" },
            uniqueSellingPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 clear USPs highlighting handmade quality, materials, and emotional value",
            },
            packagingIdeas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  idea: { type: Type.STRING },
                  details: { type: Type.STRING },
                },
                required: ["idea", "details"],
              },
              description: "3 creative, memorable, budget-friendly unboxing and packaging ideas",
            },
            socialPostHook: { type: Type.STRING, description: "A high-converting social media caption hook to introduce this product" },
            brandColorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  colorName: { type: Type.STRING },
                  hexCode: { type: Type.STRING },
                  mood: { type: Type.STRING },
                },
                required: ["colorName", "hexCode", "mood"],
              },
              description: "3-4 curated brand hex colors matching this handmade product style",
            },
            seoKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 high-volume, niche Etsy/Google SEO search terms for this craft",
            },
            unboxingTip: { type: Type.STRING, description: "A low-cost personal unboxing touch (e.g. custom care card, wax seal, or dried sprig)" },
          },
          required: [
            "creativeNames",
            "tagline",
            "brandStory",
            "emotionalDescription",
            "uniqueSellingPoints",
            "packagingIdeas",
            "socialPostHook",
            "brandColorPalette",
            "seoKeywords",
            "unboxingTip",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/branding:", error);
    res.status(500).json({ error: error.message || "Failed to generate branding recommendations." });
  }
});

// 2. Pricing Assistant Route
app.post("/api/pricing", async (req, res) => {
  try {
    const { materialCost, currency = "USD", timeHours, difficulty, desiredMargin, category, productNotes } = req.body;

    const ai = getGeminiClient();
    const prompt = `Calculate a comprehensive, realistic, and highly practical pricing breakdown for a handmade product with these details:
- Category: ${category || "Handmade Item"}
- Total Material Cost: ${materialCost} ${currency}
- Time Required to Craft: ${timeHours} hours
- Crafting Difficulty / Skill Level: ${difficulty || "Medium"}
- Target Margin Goal: ${desiredMargin || "Standard"}
- Maker Notes / Details: ${productNotes || "None"}

CRITICAL CALCULATIONS & PRACTICALITY:
1. Hourly Labor Wage: Calculate a fair hourly rate matching skill level (${difficulty}).
2. Account for overheads (tools, electricity, studio space) and transaction/platform fees (Etsy/Stripe/Shopify ~6-10%).
3. Calculate:
   - Suggested Retail Price (Materials + Fair Labor + Overhead + Net Profit Margin)
   - Minimum Floor Price (Lowest price for sales or wholesale without losing money)
   - Premium / Gift Boxed Price (High-end option with custom gift wrapping)
   - Wholesale Price (Standard ~50% of retail for selling in boutiques/shops)
4. Provide a craft time-saving tip to reduce crafting time per unit and custom order deposit advice.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            currency: { type: Type.STRING },
            suggestedPrice: { type: Type.NUMBER, description: "Ideal standard retail selling price" },
            minimumPrice: { type: Type.NUMBER, description: "Floor price for sales or wholesale margin safety" },
            premiumPrice: { type: Type.NUMBER, description: "High-end / custom gift boxed price option" },
            wholesalePrice: { type: Type.NUMBER, description: "Boutique/wholesale price point (~50% of retail)" },
            suggestedHourlyRate: { type: Type.NUMBER, description: "Calculated fair hourly wage for craft maker" },
            estimatedProfitAmount: { type: Type.NUMBER, description: "Estimated net profit per unit at suggested price" },
            pricingExplanation: { type: Type.STRING, description: "Detailed, encouraging explanation of why this pricing structure protects the maker's time and business" },
            breakdownItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  component: { type: Type.STRING },
                  estimatedCost: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                },
                required: ["component", "estimatedCost", "explanation"],
              },
              description: "Transparent cost items including Materials, Labor, Overhead, Platform Fees, and Profit Margin",
            },
            tipsToIncreaseValue: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 practical actionable tips to justify a higher price point",
            },
            craftingTimeHack: { type: Type.STRING, description: "A practical tip to batch production or cut crafting time without losing quality" },
            customOrderDepositTip: { type: Type.STRING, description: "Advice on deposit policy for custom handmade commissions" },
            disclaimer: { type: Type.STRING, description: "Standard business disclaimer" },
          },
          required: [
            "currency",
            "suggestedPrice",
            "minimumPrice",
            "premiumPrice",
            "wholesalePrice",
            "suggestedHourlyRate",
            "estimatedProfitAmount",
            "pricingExplanation",
            "breakdownItems",
            "tipsToIncreaseValue",
            "craftingTimeHack",
            "customOrderDepositTip",
            "disclaimer",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/pricing:", error);
    res.status(500).json({ error: error.message || "Failed to calculate pricing strategy." });
  }
});

// 3. Customer Persona Generator Route
app.post("/api/persona", async (req, res) => {
  try {
    const { productType, priceRange, occasion, productStyle } = req.body;

    const ai = getGeminiClient();
    const prompt = `Generate a vivid, highly specific, and authentic ideal customer persona for a handmade business with:
- Product Type: ${productType}
- Price Range: ${priceRange}
- Target Occasion: ${occasion}
- Product Aesthetic & Style: ${productStyle}

INSIGHT REQUIREMENTS:
1. Describe an authentic buyer who values artisanal quality over mass-produced items.
2. Explain why they are willing to pay for handmade items at this price point (${priceRange}).
3. Identify their key purchasing hesitation/objection and provide an exact, polite objection-handling script for the creator to use.
4. List specific online communities, hashtags, or channels where this customer hangs out.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personaName: { type: Type.STRING, description: "Relatable customer profile title, e.g., 'Thoughtful Gift Finder Sarah'" },
            ageGroup: { type: Type.STRING, description: "Target age demographic, e.g., '28 - 42 years old'" },
            occupationAndLifestyle: { type: Type.STRING, description: "Detailed description of daily life, values, aesthetic preferences, and shopping habits" },
            buyingMotivation: { type: Type.STRING, description: "Emotional and practical reasons why they choose handmade goods over mass production" },
            painPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 key concerns or objections before purchasing",
            },
            preferredMarketingApproach: { type: Type.STRING, description: "Best messaging tone, storytelling style, and offer triggers" },
            bestPlatforms: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  reason: { type: Type.STRING },
                },
                required: ["platform", "reason"],
              },
            },
            sampleCustomerQuote: { type: Type.STRING, description: "Relatable quote summarizing their exact buyer mindset" },
            whereToFindThem: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "4 specific online spaces, subreddits, hashtags, or local events where this audience hangs out",
            },
            objectionHandlingScript: { type: Type.STRING, description: "A ready-to-use script for the maker when answering 'Why is this priced higher than store items?'" },
          },
          required: [
            "personaName",
            "ageGroup",
            "occupationAndLifestyle",
            "buyingMotivation",
            "painPoints",
            "preferredMarketingApproach",
            "bestPlatforms",
            "sampleCustomerQuote",
            "whereToFindThem",
            "objectionHandlingScript",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/persona:", error);
    res.status(500).json({ error: error.message || "Failed to generate customer persona." });
  }
});

// 4. Marketing Planner Route
app.post("/api/marketing", async (req, res) => {
  try {
    const { product, targetAudience, platform, campaignType } = req.body;

    const ai = getGeminiClient();
    const prompt = `Create an actionable, creative 4-week marketing strategy and content calendar for a handmade creator with:
- Product / Collection: ${product}
- Target Audience: ${targetAudience}
- Main Social Platform: ${platform || "Instagram & TikTok"}
- Campaign Objective: ${campaignType || "New Collection Launch"}

FOCUS ON HANDMADE CREATOR REALITIES:
1. Content ideas must be easy to film while crafting (behind-the-scenes, packaging orders, satisfying process ASMR, material transformations).
2. Include 3 ready-to-copy social media captions complete with call-to-actions.
3. Include margin-protecting bundle/perk strategies that boost average order value without discounting handmade labor.
4. Provide a 2-hour batching time-hack so the creator can spend most of their time crafting instead of managing social media.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            campaignSummary: { type: Type.STRING, description: "Strategic overview of the campaign goals and theme" },
            monthlyCalendar: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING, description: "e.g., 'Week 1: Behind-The-Scenes Teasers & Materials'" },
                  posts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        day: { type: Type.STRING, description: "e.g., 'Monday'" },
                        contentType: { type: Type.STRING, description: "e.g., 'Process Reel / ASMR Crafting Video'" },
                        concept: { type: Type.STRING, description: "Visual filming concept and camera angle suggestion" },
                        captionHook: { type: Type.STRING, description: "Attention-grabbing opening line for social media" },
                        callToAction: { type: Type.STRING, description: "Clear CTA to drive comments, saves, or shop clicks" },
                      },
                      required: ["day", "contentType", "concept", "captionHook", "callToAction"],
                    },
                  },
                },
                required: ["week", "posts"],
              },
            },
            campaignIdeas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["title", "description"],
              },
            },
            promotionalCaptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 complete, ready-to-use social captions with call-to-action placeholders and hashtags",
            },
            discountAndBundleStrategies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 smart gift bundle or perk ideas that preserve maker profit margins",
            },
            engagementIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 interactive poll/story ideas for Instagram/TikTok",
            },
            recommendedHashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of relevant niche hashtags for handmade craft marketing",
            },
            soloMakerTimeHack: { type: Type.STRING, description: "A practical batch filming routine allowing a solo maker to batch 1 month of content in 2 hours" },
            shortFormVideoIdeas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  videoConcept: { type: Type.STRING },
                  audioVibe: { type: Type.STRING },
                },
                required: ["title", "videoConcept", "audioVibe"],
              },
              description: "3 viral short-form video Reel/TikTok concepts designed specifically for craft makers",
            },
          },
          required: [
            "campaignSummary",
            "monthlyCalendar",
            "campaignIdeas",
            "promotionalCaptions",
            "discountAndBundleStrategies",
            "engagementIdeas",
            "recommendedHashtags",
            "soloMakerTimeHack",
            "shortFormVideoIdeas",
          ],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in /api/marketing:", error);
    res.status(500).json({ error: error.message || "Failed to generate marketing plan." });
  }
});

// 5. Business Consultant Chatbot Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();

    // Format chat history for gemini
    const formattedHistory = conversationHistory.map((item: { role: string; text: string }) => ({
      role: item.role === "user" ? "user" : "model",
      parts: [{ text: item.text }],
    }));

    const chat = ai.chats.create({
      model: "gemini-3.6-flash",
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}

CHATBOT MENTORSHIP STYLE:
- Speak as a warm, encouraging, expert business advisor and master artisan who understands the day-to-day journey of building a handmade business.
- Provide structured, practical advice formatted with clear bullet points, bold section headers, and numbered step-by-step action plans.
- Always offer practical tips specific to handmade products (crochet, cards, resin, floral, jewelry, gifts, stickers).
- Whenever asked about pricing, marketing, or branding, provide concrete examples and templates the creator can immediately test.
- End responses with an encouraging sentence and a thoughtful follow-up question to help the creator plan their next step.`,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    res.json({ response: response.text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Failed to get AI mentor response." });
  }
});

// Start Server & Vite Middleware setup
async function startServer() {
  // Vite middleware for dev or Static file serve for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CraftIQ Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
