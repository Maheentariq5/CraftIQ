import React, { useState } from "react";
import {
  Tag,
  DollarSign,
  Clock,
  Zap,
  TrendingUp,
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  ShieldAlert,
  PieChart,
  HelpCircle,
} from "lucide-react";
import { PricingInput, PricingResult, CurrencyCode, SUPPORTED_CURRENCIES, SavedAsset } from "../types";
import { PRICING_PRESETS } from "../data/presets";

interface PricingToolProps {
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  onSaveResult: (asset: Omit<SavedAsset, "id" | "createdAt">) => void;
}

export const PricingTool: React.FC<PricingToolProps> = ({
  currency,
  setCurrency,
  onSaveResult,
}) => {
  const [formData, setFormData] = useState<PricingInput>({
    materialCost: 500,
    currency: currency,
    timeHours: 4,
    difficulty: "Medium",
    desiredMargin: "Standard (40-50%)",
    category: "Crochet",
    productNotes: "Detailed handmade item with intricate stitching.",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PricingResult | null>(null);
  const [copied, setCopied] = useState(false);
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

  const handleApplyPreset = (presetData: PricingInput) => {
    setFormData({
      ...presetData,
      currency: currency, // keep user's active currency
    });
    setError(null);
  };

  const handleClear = () => {
    setFormData({
      materialCost: 0,
      currency: currency,
      timeHours: 1,
      difficulty: "Medium",
      desiredMargin: "Standard (40-50%)",
      category: "Crochet",
      productNotes: "",
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.materialCost <= 0 && formData.timeHours <= 0) {
      setError("Please provide a valid material cost or labor hours.");
      return;
    }

    setLoading(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const payload = {
        ...formData,
        currency: currency,
      };

      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to calculate pricing.");
      }

      const data: PricingResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while calculating pricing.");
    } finally {
      setLoading(false);
    }
  };

  const activeCurrencyObj = SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];

  const handleCopySummary = () => {
    if (!result) return;
    const text = `=== CraftIQ Pricing Formula Summary ===
Currency: ${result.currency}
Suggested Selling Price: ${activeCurrencyObj.symbol}${result.suggestedPrice}
Minimum Acceptable Price: ${activeCurrencyObj.symbol}${result.minimumPrice}
Premium Price Option: ${activeCurrencyObj.symbol}${result.premiumPrice}
Suggested Fair Labor Hourly Rate: ${activeCurrencyObj.symbol}${result.suggestedHourlyRate}/hr

Breakdown:
${result.pricingExplanation}

Tips to Increase Value:
${result.tipsToIncreaseValue.map((t) => `• ${t}`).join("\n")}

Disclaimer: ${result.disclaimer}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSaveResult({
      type: "pricing",
      title: `${formData.category} Pricing Strategy (${activeCurrencyObj.symbol}${result.suggestedPrice})`,
      subtitle: `Materials: ${activeCurrencyObj.symbol}${formData.materialCost} • Time: ${formData.timeHours} hrs`,
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
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Pricing & Profitability Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Calculate Fair & Profitable Product Prices
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Stop undercharging for your labor and passion. Calculate material expenses, artisan hourly rates, overheads, and profit margins.
          </p>
        </div>
      </div>

      {/* Preset Quick Buttons */}
      <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Try 1-Click Preset Calculator Examples:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRICING_PRESETS.map((p) => (
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
              <DollarSign className="w-4 h-4 text-teal-600" />
              <span>Cost Inputs & Time</span>
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
            {/* Preferred Currency Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Preferred Currency
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {SUPPORTED_CURRENCIES.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className={`py-2 text-xs font-semibold rounded-full border transition-colors ${
                      currency === c.code
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-teal-50 text-slate-800 border-teal-200 hover:bg-teal-100/80"
                    }`}
                  >
                    {c.code} ({c.symbol.trim()})
                  </button>
                ))}
              </div>
            </div>

            {/* Material Cost */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Total Material Cost ({activeCurrencyObj.symbol.trim()}) *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-xs font-bold text-teal-700">
                  {activeCurrencyObj.symbol.trim()}
                </span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={formData.materialCost || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, materialCost: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="e.g. 500"
                  className="w-full text-xs p-3.5 pl-10 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900 font-bold"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Include yarn, fabric, resin, beads, packaging box, ribbons, etc.
              </span>
            </div>

            {/* Time Required */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Time Required to Make (Hours) *
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-4 top-3.5 text-teal-600" />
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={formData.timeHours || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, timeHours: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="e.g. 4"
                  className="w-full text-xs p-3.5 pl-10 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900 font-bold"
                />
              </div>
            </div>

            {/* Difficulty Level & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value as "Easy" | "Medium" | "Hard",
                    })
                  }
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
                >
                  <option value="Easy">Easy (Beginner)</option>
                  <option value="Medium">Medium (Skilled)</option>
                  <option value="Hard">Hard (Mastercraft)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Notes / Details */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Special Details / Intricacy Notes
              </label>
              <textarea
                rows={2}
                value={formData.productNotes}
                onChange={(e) => setFormData({ ...formData, productNotes: e.target.value })}
                placeholder="e.g. Takes 6 hours of detailed crochet stitch work, custom LED lights..."
                className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900"
              />
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
                  <span>Calculating Fair Artisan Price...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Calculate Recommended Price</span>
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
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Analyzing Labor Value & Overhead...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Calculating material multipliers, difficulty wages, platform commissions, and profit margins for {currency}...
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white rounded-[32px] p-10 border border-dashed border-teal-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                No Pricing Calculation Performed
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Enter your material cost and crafting time on the left to generate an instant pricing recommendation card.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Top Action Bar */}
              <div className="bg-teal-50/90 rounded-2xl p-3.5 border border-teal-200/80 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                  <Tag className="w-4 h-4 text-teal-600" />
                  Pricing & Profit Breakdown ({result.currency})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySummary}
                    className="px-3.5 py-2 rounded-full bg-white border border-teal-200 text-slate-800 hover:bg-teal-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copied Summary!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-teal-600" />
                        <span>Copy Formula</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSaveToLibrary}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-950 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{savedSuccess ? "Saved!" : "Save Strategy"}</span>
                  </button>
                </div>
              </div>

              {/* 3 Price Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Minimum Price */}
                <div className="bg-white rounded-[24px] p-5 border border-teal-100 shadow-2xs text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                    Minimum Floor Price
                  </span>
                  <div className="text-2xl font-serif font-extrabold text-slate-900 mt-2">
                    {activeCurrencyObj.symbol.trim()}{result.minimumPrice}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Wholesale or flash sales limit
                  </p>
                </div>

                {/* Suggested Standard Price (Highlighted) */}
                <div className="bg-teal-950 text-white rounded-[24px] p-5 border-2 border-cyan-400 shadow-xl text-center space-y-1 relative transform sm:-translate-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-950 bg-cyan-400 px-3 py-1 rounded-full">
                    ★ Recommended Selling Price
                  </span>
                  <div className="text-3xl font-serif font-extrabold text-white mt-2">
                    {activeCurrencyObj.symbol.trim()}{result.suggestedPrice}
                  </div>
                  <p className="text-xs text-cyan-200 font-medium">
                    Fair profit + artisan labor
                  </p>
                </div>

                {/* Premium Gift Price */}
                <div className="bg-white rounded-[24px] p-5 border border-teal-100 shadow-2xs text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                    Premium / Gift Price
                  </span>
                  <div className="text-2xl font-serif font-extrabold text-slate-900 mt-2">
                    {activeCurrencyObj.symbol.trim()}{result.premiumPrice}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Custom gift wrapping included
                  </p>
                </div>
              </div>

              {/* Labor Wages & Profit Margin Badges */}
              <div className="bg-white rounded-[24px] p-6 border border-teal-100 shadow-2xs flex flex-wrap items-center justify-around gap-4 text-center">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Fair Artisan Labor Rate
                  </span>
                  <span className="text-base font-bold text-slate-900 font-serif">
                    {activeCurrencyObj.symbol.trim()}{result.suggestedHourlyRate} / hr
                  </span>
                </div>
                <div className="h-8 w-px bg-teal-100 hidden sm:block" />
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block uppercase tracking-wider">
                    Estimated Profit Per Unit
                  </span>
                  <span className="text-base font-bold text-teal-700 font-serif">
                    +{activeCurrencyObj.symbol.trim()}{result.estimatedProfitAmount}
                  </span>
                </div>
              </div>

              {/* Pricing Explanation */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-teal-600" />
                  <span>Pricing Formula Breakdown</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-5 rounded-2xl border border-teal-100">
                  {result.pricingExplanation}
                </p>

                {/* Breakdown Items List */}
                {result.breakdownItems?.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {result.breakdownItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs p-3 rounded-2xl bg-teal-50/40 border border-teal-100"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900 block">{item.component}</span>
                          <span className="text-[11px] text-slate-500">{item.explanation}</span>
                        </div>
                        <span className="font-bold text-teal-700 shrink-0 ml-2 font-serif">
                          {item.estimatedCost}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wholesale & Custom Deposit Advice */}
              {(result.wholesalePrice || result.craftingTimeHack || result.customOrderDepositTip) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.wholesalePrice && (
                    <div className="bg-white rounded-[32px] p-6 border border-teal-100 shadow-2xs space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                        Boutique / Wholesale Price
                      </span>
                      <div className="text-xl font-serif font-bold text-slate-900">
                        {activeCurrencyObj.symbol.trim()}{result.wholesalePrice} / unit
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Standard ~50% retail rate for stockists and local gift shop consignment.
                      </p>
                    </div>
                  )}

                  {result.craftingTimeHack && (
                    <div className="bg-white rounded-[32px] p-6 border border-teal-100 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Zap className="w-4 h-4 text-cyan-600" />
                        <span>Production Efficiency Tip</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {result.craftingTimeHack}
                      </p>
                    </div>
                  )}

                  {result.customOrderDepositTip && (
                    <div className="bg-white rounded-[32px] p-6 border border-teal-100 shadow-2xs space-y-1.5 md:col-span-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <ShieldAlert className="w-4 h-4 text-teal-600" />
                        <span>Custom Commission Deposit Policy</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {result.customOrderDepositTip}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Value-Add Tips */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-cyan-600" />
                  <span>4 Actionable Ways to Increase Perceived Product Value</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.tipsToIncreaseValue.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-600 flex items-start gap-2.5"
                    >
                      <span className="text-teal-700 font-bold shrink-0">#{idx + 1}</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-200/80 text-xs text-slate-600 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-slate-900 uppercase tracking-wider text-[10px]">Business Suggestion Disclaimer</span>
                  <p className="text-[11px] mt-0.5 text-slate-600">
                    {result.disclaimer ||
                      "Do not provide financial guarantees. These calculations are business recommendations based on artisan craftsmanship standards and market estimates."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
