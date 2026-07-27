import React, { useState } from "react";
import {
  Users,
  Heart,
  Target,
  Sparkles,
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  MessageCircle,
  Share2,
} from "lucide-react";
import { PersonaInput, PersonaResult, SavedAsset } from "../types";
import { PERSONA_PRESETS } from "../data/presets";

interface PersonaToolProps {
  onSaveResult: (asset: Omit<SavedAsset, "id" | "createdAt">) => void;
}

export const PersonaTool: React.FC<PersonaToolProps> = ({ onSaveResult }) => {
  const [formData, setFormData] = useState<PersonaInput>({
    productType: "Wedding Invitation Cards",
    priceRange: "Premium ($80 - $200 set)",
    occasion: "Wedding",
    productStyle: "Elegant & Romantic",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PersonaResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const priceRanges = [
    "Budget ($5 - $20)",
    "Moderate ($25 - $60)",
    "Premium ($80 - $200+)",
    "Custom High-End ($250+)",
  ];

  const handleApplyPreset = (presetData: PersonaInput) => {
    setFormData(presetData);
    setError(null);
  };

  const handleClear = () => {
    setFormData({
      productType: "",
      priceRange: "Moderate ($25 - $60)",
      occasion: "General Gift",
      productStyle: "Handmade & Authentic",
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productType.trim()) {
      setError("Please enter your product type.");
      return;
    }

    setLoading(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const response = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate persona.");
      }

      const data: PersonaResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating persona.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopySummary = () => {
    if (!result) return;
    const text = `=== CraftIQ Ideal Customer Persona ===
Persona Archetype: ${result.personaName}
Target Age Group: ${result.ageGroup}

Lifestyle & Values:
${result.occupationAndLifestyle}

Buying Motivation:
${result.buyingMotivation}

Key Concerns / Pain Points:
${result.painPoints.map((p) => `• ${p}`).join("\n")}

Preferred Marketing Strategy:
${result.preferredMarketingApproach}

Best Social Media Channels:
${result.bestPlatforms.map((p) => `• ${p.platform}: ${p.reason}`).join("\n")}

Customer Mindset Quote:
"${result.sampleCustomerQuote}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSaveResult({
      type: "persona",
      title: result.personaName,
      subtitle: `${formData.productType} • Age ${result.ageGroup}`,
      data: result,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-teal-50/90 rounded-[32px] p-6 sm:p-8 border border-teal-200/80">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Customer Persona Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Understand Your Ideal Handmade Buyers
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover who values your craftsmanship, why they buy handmade items over mass production, their hesitations, and how to reach them effectively.
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Try 1-Click Preset Persona Examples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PERSONA_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleApplyPreset(p.data)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-teal-100/60 text-slate-800 border border-teal-200 font-medium transition-colors shadow-2xs"
            >
              + {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-teal-100">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-600" />
              <span>Product & Market Setup</span>
            </h2>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-slate-900 flex items-center gap-1 font-medium uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Product Type / Concept *
              </label>
              <input
                type="text"
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                placeholder="e.g. Handmade wedding cards, crochet baby toys..."
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Price Range
              </label>
              <select
                value={formData.priceRange}
                onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
              >
                {priceRanges.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Occasion & Style Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Occasion
                </label>
                <input
                  type="text"
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  placeholder="e.g. Wedding, Birthday"
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Product Style
                </label>
                <input
                  type="text"
                  value={formData.productStyle}
                  onChange={(e) => setFormData({ ...formData, productStyle: e.target.value })}
                  placeholder="e.g. Elegant, Cute, Rustic"
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-teal-950 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Building Customer Persona...</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Generate Ideal Customer Persona</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-6">
          {loading && (
            <div className="bg-white rounded-[32px] p-12 border border-teal-100 text-center space-y-4 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto animate-bounce">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Profiling Your Ideal Customer...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Analyzing demographic habits, buying motivations, pain points, and best social media platforms...
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white rounded-[32px] p-10 border border-dashed border-teal-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                No Customer Persona Generated
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Enter your product type on the left to uncover who your ideal handmade buyers are and how to talk to them.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Action Bar */}
              <div className="bg-teal-50/90 rounded-2xl p-3.5 border border-teal-200/80 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                  <Users className="w-4 h-4 text-teal-600" />
                  Target Customer Persona
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="px-3.5 py-2 rounded-full bg-white border border-teal-200 text-slate-800 hover:bg-teal-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copied Persona!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copy Profile</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToLibrary}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-950 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{savedSuccess ? "Saved!" : "Save Persona"}</span>
                  </button>
                </div>
              </div>

              {/* Persona Headline Card */}
              <div className="bg-teal-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl space-y-4 border border-teal-900">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-cyan-400 text-teal-950 px-3 py-1 rounded-full">
                    Ideal Customer Archetype
                  </span>
                  <span className="text-xs text-cyan-200 font-medium">
                    Target Age: {result.ageGroup}
                  </span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  {result.personaName}
                </h2>
                <div className="bg-black/30 p-4 rounded-2xl border border-white/10 text-xs text-cyan-100 italic font-serif leading-relaxed">
                  "{result.sampleCustomerQuote}"
                </div>
              </div>

              {/* Lifestyle & Buying Motivation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600" />
                    <span>Lifestyle & Core Values</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                    {result.occupationAndLifestyle}
                  </p>
                </div>

                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span>Buying Motivation</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                    {result.buyingMotivation}
                  </p>
                </div>
              </div>

              {/* Pain Points / Objections */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-teal-600" />
                  <span>Customer Hesitations & Pain Points</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.painPoints.map((pain, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-800 space-y-1"
                    >
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Objection #{idx + 1}
                      </span>
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where to Find Them & Objection Script */}
              {(result.whereToFindThem || result.objectionHandlingScript) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.whereToFindThem && result.whereToFindThem.length > 0 && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-teal-600" />
                        <span>Where To Reach This Audience</span>
                      </h3>
                      <div className="space-y-2">
                        {result.whereToFindThem.map((place, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-700 font-medium"
                          >
                            📍 {place}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.objectionHandlingScript && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-cyan-600" />
                        <span>Price Objection Response Script</span>
                      </h3>
                      <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-700 leading-relaxed font-sans relative">
                        <button
                          onClick={() => {
                            if (result.objectionHandlingScript) {
                              navigator.clipboard.writeText(result.objectionHandlingScript);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }
                          }}
                          className="text-[10px] text-teal-700 font-bold uppercase tracking-wider underline mb-2 block"
                        >
                          Copy Response Script
                        </button>
                        "{result.objectionHandlingScript}"
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Marketing Approach & Best Platforms */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-5">
                <div className="space-y-2">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                    <span>Preferred Communication Style</span>
                  </h3>
                  <p className="text-xs text-slate-600 bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                    {result.preferredMarketingApproach}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Best Social Media Channels To Target:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.bestPlatforms.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs space-y-1"
                      >
                        <span className="font-bold text-slate-900 block">{p.platform}</span>
                        <span className="text-[11px] text-slate-500">{p.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
