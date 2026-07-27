import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  Package,
  Heart,
  Tag,
  BookOpen,
  Share2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { BrandingInput, BrandingResult, SavedAsset } from "../types";
import { BRANDING_PRESETS } from "../data/presets";

interface BrandingToolProps {
  onSaveResult: (asset: Omit<SavedAsset, "id" | "createdAt">) => void;
}

export const BrandingTool: React.FC<BrandingToolProps> = ({ onSaveResult }) => {
  const [formData, setFormData] = useState<BrandingInput>({
    productName: "",
    category: "Crochet",
    materials: "",
    targetAudience: "",
    occasion: "Birthday",
    brandStyle: "Cute",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BrandingResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories = [
    "Crochet",
    "Flowers / Bouquets",
    "Cards & Stationery",
    "Stickers",
    "Jewelry & Accessories",
    "Gifts & Hampers",
    "Resin & Home Decor",
    "Other Handmade Crafts",
  ];

  const occasions = [
    "Birthday",
    "Wedding",
    "Eid / Festive Holiday",
    "Anniversary",
    "Baby Shower",
    "Corporate Gift",
    "Everyday Keepsake",
  ];

  const styles = [
    "Cute & Whimsical",
    "Elegant & Luxury",
    "Minimal & Modern",
    "Traditional & Heritage",
    "Rustic & Handmade",
    "Cozy & Soft",
  ];

  const handleApplyPreset = (presetData: BrandingInput) => {
    setFormData(presetData);
    setError(null);
  };

  const handleClear = () => {
    setFormData({
      productName: "",
      category: "Crochet",
      materials: "",
      targetAudience: "",
      occasion: "Birthday",
      brandStyle: "Cute",
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim() && !formData.materials.trim()) {
      setError("Please enter a product name or materials used.");
      return;
    }

    setLoading(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const response = await fetch("/api/branding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate branding.");
      }

      const data: BrandingResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating branding.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyFullBrand = () => {
    if (!result) return;
    const fullText = `=== CraftIQ Brand Identity Output ===
Tagline: "${result.tagline}"

Brand Story:
${result.brandStory}

Emotional Product Description:
${result.emotionalDescription}

Unique Selling Points:
${result.uniqueSellingPoints.map((usp) => `• ${usp}`).join("\n")}

Packaging Ideas:
${result.packagingIdeas.map((p) => `• ${p.idea}: ${p.details}`).join("\n")}

Social Hook:
${result.socialPostHook}`;

    navigator.clipboard.writeText(fullText);
    setCopiedSection("full");
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSaveResult({
      type: "branding",
      title: result.creativeNames[0]?.name || formData.productName || "Handmade Product Brand",
      subtitle: `${formData.category} • ${result.tagline}`,
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
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>AI Product Branding Generator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Craft a Captivating Brand Identity
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Turn your raw craft into a cohesive brand story with creative product names, emotional taglines, key selling points, and packaging concepts.
          </p>
        </div>
      </div>

      {/* Preset Quick Fill Buttons */}
      <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Try 1-Click Preset Examples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {BRANDING_PRESETS.map((p) => (
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

      {/* Form and Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-teal-100">
            <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-teal-600" />
              <span>Product Specifications</span>
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
            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Product Concept / Current Name *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g. Handmade crochet teddy bear"
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Product Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Materials Used */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Materials Used
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                placeholder="e.g. Soft milk cotton wool, safety eyes, polyester stuffing"
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Birthday gift buyers, baby showers, plushie lovers"
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              />
            </div>

            {/* Occasion & Style Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Occasion
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900"
                >
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Brand Style
                </label>
                <select
                  value={formData.brandStyle}
                  onChange={(e) => setFormData({ ...formData, brandStyle: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900"
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
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
                  <span>AI is Crafting Your Brand Identity...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Generate Brand Identity</span>
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
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Crafting Your Brand Story...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Gemini AI is analyzing your materials, style, and audience to generate emotional descriptions, taglines, and packaging ideas.
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white rounded-[32px] p-10 border border-dashed border-teal-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                No Brand Output Generated Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Fill in your product concept on the left, or click one of the 1-click preset buttons above to see instant AI results.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Action Bar */}
              <div className="bg-teal-50/90 rounded-2xl p-3.5 border border-teal-200/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Brand Identity Package Ready
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyFullBrand}
                    className="px-3.5 py-2 rounded-full bg-white border border-teal-200 text-slate-800 hover:bg-teal-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    {copiedSection === "full" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copied All!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copy Brand Suite</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToLibrary}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-950 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{savedSuccess ? "Saved!" : "Save to Library"}</span>
                  </button>
                </div>
              </div>

              {/* Tagline Banner */}
              <div className="bg-teal-50/90 rounded-[32px] p-6 sm:p-8 border border-teal-200/80 shadow-2xs relative">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white text-teal-700 border border-teal-200">
                      Brand Tagline
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900 mt-3 italic">
                      "{result.tagline}"
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCopyText(result.tagline, "tagline")}
                    className="p-2 rounded-xl bg-white hover:bg-teal-50 text-slate-800 border border-teal-200 text-xs"
                    title="Copy Tagline"
                  >
                    {copiedSection === "tagline" ? (
                      <Check className="w-4 h-4 text-teal-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-teal-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Creative Product Name Options */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span>Creative Product Name Ideas</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.creativeNames.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleCopyText(item.name, `name-${idx}`)}
                      className="p-4 rounded-2xl bg-teal-50/40 hover:bg-teal-50 border border-teal-100 transition-colors cursor-pointer group flex items-start justify-between gap-2"
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-teal-700 font-serif">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.vibe}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 group-hover:text-teal-700 font-bold uppercase tracking-wider">
                        {copiedSection === `name-${idx}` ? "Copied!" : "Copy"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Story & Emotional Description */}
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-teal-600" />
                      <span>Emotional Brand Story</span>
                    </h3>
                    <button
                      onClick={() => handleCopyText(result.brandStory, "story")}
                      className="text-xs text-teal-700 font-semibold hover:underline uppercase tracking-wider"
                    >
                      {copiedSection === "story" ? "Copied!" : "Copy Story"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-5 rounded-2xl border border-teal-100 italic font-serif">
                    "{result.brandStory}"
                  </p>
                </div>

                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-600" />
                      <span>Product Listing Description</span>
                    </h3>
                    <button
                      onClick={() => handleCopyText(result.emotionalDescription, "desc")}
                      className="text-xs text-teal-700 font-semibold hover:underline uppercase tracking-wider"
                    >
                      {copiedSection === "desc" ? "Copied!" : "Copy Description"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-5 rounded-2xl border border-teal-100">
                    {result.emotionalDescription}
                  </p>
                </div>
              </div>

              {/* Unique Selling Points & Packaging Ideas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* USPs */}
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Unique Selling Points</span>
                  </h3>
                  <ul className="space-y-2">
                    {result.uniqueSellingPoints.map((usp, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 flex items-start gap-2 bg-teal-50/40 p-3 rounded-2xl border border-teal-100"
                      >
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{usp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Packaging Ideas */}
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-4 h-4 text-cyan-600" />
                    <span>Unboxing Concepts</span>
                  </h3>
                  <div className="space-y-2">
                    {result.packagingIdeas.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-0.5"
                      >
                        <div className="text-xs font-bold text-slate-900">
                          {p.idea}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {p.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Brand Color Palette & SEO Keywords */}
              {((result.brandColorPalette && result.brandColorPalette.length > 0) || (result.seoKeywords && result.seoKeywords.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Palette */}
                  {result.brandColorPalette && result.brandColorPalette.length > 0 && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span>Curated Brand Palette</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {result.brandColorPalette.map((col, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-2xl bg-teal-50/40 border border-teal-100 flex items-center gap-3"
                          >
                            <div
                              className="w-8 h-8 rounded-xl shrink-0 border border-black/10 shadow-2xs"
                              style={{ backgroundColor: col.hexCode }}
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">
                                {col.colorName}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                {col.hexCode}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SEO Keywords */}
                  {result.seoKeywords && result.seoKeywords.length > 0 && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-cyan-600" />
                        <span>Niche Etsy / Google SEO Keywords</span>
                      </h3>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {result.seoKeywords.map((kw, idx) => (
                          <span
                            key={idx}
                            onClick={() => handleCopyText(kw, `kw-${idx}`)}
                            className="text-xs px-3 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200/80 font-medium cursor-pointer transition-colors"
                            title="Click to copy"
                          >
                            {copiedSection === `kw-${idx}` ? "Copied!" : `🔍 ${kw}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Unboxing Pro-Tip */}
              {result.unboxingTip && (
                <div className="bg-teal-50/90 rounded-2xl p-4 border border-teal-200/80 text-xs text-slate-700 flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                      Artisan Unboxing Pro-Tip
                    </span>
                    <p className="mt-0.5 leading-relaxed">{result.unboxingTip}</p>
                  </div>
                </div>
              )}

              {/* Social Media Hook */}
              <div className="bg-teal-950 text-white rounded-[24px] p-6 sm:p-8 shadow-xl space-y-3 border border-teal-900">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                    Instagram / TikTok Launch Caption Hook
                  </span>
                  <button
                    onClick={() => handleCopyText(result.socialPostHook, "hook")}
                    className="text-xs text-cyan-300 font-semibold hover:underline uppercase tracking-wider"
                  >
                    {copiedSection === "hook" ? "Copied!" : "Copy Hook"}
                  </button>
                </div>
                <p className="text-xs sm:text-sm bg-black/30 p-4 rounded-2xl border border-white/10 leading-relaxed italic">
                  {result.socialPostHook}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
