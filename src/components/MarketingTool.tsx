import React, { useState } from "react";
import {
  Calendar,
  Sparkles,
  Share2,
  Copy,
  Check,
  Bookmark,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  Hash,
  Gift,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { MarketingInput, MarketingResult, SavedAsset } from "../types";
import { MARKETING_PRESETS } from "../data/presets";

interface MarketingToolProps {
  onSaveResult: (asset: Omit<SavedAsset, "id" | "createdAt">) => void;
}

export const MarketingTool: React.FC<MarketingToolProps> = ({ onSaveResult }) => {
  const [formData, setFormData] = useState<MarketingInput>({
    product: "Handcrafted Crochet Plushies",
    targetAudience: "Gen-Z craft collectors & gift givers",
    platform: "Instagram & TikTok",
    campaignType: "Launch",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MarketingResult | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const platforms = [
    "Instagram",
    "TikTok",
    "Instagram & TikTok",
    "Facebook",
    "Etsy / Pinterest",
  ];

  const campaignTypes = [
    "New Collection Launch",
    "Festive / Holiday Pre-Orders",
    "Flash Sale / Seasonal Offer",
    "Brand Awareness & Behind-The-Scenes",
  ];

  const handleApplyPreset = (presetData: MarketingInput) => {
    setFormData(presetData);
    setError(null);
  };

  const handleClear = () => {
    setFormData({
      product: "",
      targetAudience: "",
      platform: "Instagram",
      campaignType: "New Collection Launch",
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.product.trim()) {
      setError("Please specify your product or collection.");
      return;
    }

    setLoading(true);
    setError(null);
    setSavedSuccess(false);

    try {
      const response = await fetch("/api/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate marketing plan.");
      }

      const data: MarketingResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while generating marketing plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSaveResult({
      type: "marketing",
      title: `${formData.product} Marketing Plan`,
      subtitle: `${formData.platform} • ${formData.campaignType}`,
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
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Marketing & Social Media Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Promote Your Crafts & Increase Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Generate 4-week content calendars, launch captions, behind-the-scenes video concepts, hashtags, and smart bundle promotions.
          </p>
        </div>
      </div>

      {/* Presets Bar */}
      <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Try 1-Click Marketing Campaign Presets:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {MARKETING_PRESETS.map((p) => (
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
              <Megaphone className="w-4 h-4 text-teal-600" />
              <span>Campaign Inputs</span>
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
            {/* Product */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                Product / Collection Name *
              </label>
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="e.g. Handmade crochet plushies, floral gift boxes..."
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
                placeholder="e.g. Gen-Z gift buyers, brides, aesthetic desk lovers"
                className="w-full text-xs p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 bg-white text-slate-900"
              />
            </div>

            {/* Platform & Campaign Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Primary Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">
                  Campaign Type
                </label>
                <select
                  value={formData.campaignType}
                  onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                  className="w-full text-xs p-3 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
                >
                  {campaignTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
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
                  <span>Planning Your Marketing Campaign...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Generate Marketing Plan</span>
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
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                Designing Your 4-Week Content Plan...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Creating post schedules, behind-the-scenes video ideas, ready captions, and bundle promotions...
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="bg-white rounded-[32px] p-10 border border-dashed border-teal-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-slate-900">
                No Marketing Plan Generated Yet
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Enter your product and platform details on the left to receive a custom 4-week marketing calendar and social captions.
              </p>
            </div>
          )}

          {!loading && result && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Action Bar */}
              <div className="bg-teal-50/90 rounded-2xl p-3.5 border border-teal-200/80 flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  4-Week Content & Campaign Strategy
                </span>
                <button
                  onClick={handleSaveToLibrary}
                  className="px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-950 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs uppercase tracking-wider"
                >
                  <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{savedSuccess ? "Saved!" : "Save Plan"}</span>
                </button>
              </div>

              {/* Campaign Summary */}
              <div className="bg-teal-950 text-white rounded-[32px] p-6 sm:p-8 shadow-xl space-y-3 border border-teal-900">
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Campaign Executive Strategy
                </span>
                <p className="text-xs sm:text-sm leading-relaxed text-cyan-100 font-serif italic">
                  {result.campaignSummary}
                </p>
              </div>

              {/* 4-Week Content Calendar Grid */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Monthly 4-Week Content Calendar</span>
                </h3>

                <div className="space-y-4">
                  {result.monthlyCalendar.map((weekItem, wIdx) => (
                    <div
                      key={wIdx}
                      className="border border-teal-100 rounded-2xl overflow-hidden bg-teal-50/30"
                    >
                      <div className="bg-teal-50/80 px-4 py-2.5 border-b border-teal-200/80 text-xs font-bold text-slate-900 flex items-center justify-between font-serif">
                        <span>{weekItem.week}</span>
                        <span className="text-[10px] text-slate-500 font-sans font-medium uppercase tracking-wider">
                          {weekItem.posts.length} Posts Scheduled
                        </span>
                      </div>

                      <div className="p-3.5 space-y-3">
                        {weekItem.posts.map((post, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-4 rounded-2xl bg-white border border-teal-100 text-xs space-y-1.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <span className="font-bold text-teal-700 font-serif">
                                {post.day}: {post.contentType}
                              </span>
                              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-teal-50 text-slate-800 font-bold border border-teal-100">
                                CTA: {post.callToAction}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-900 font-medium">
                              Visual Concept: {post.concept}
                            </p>
                            <p className="text-[11px] text-slate-500 italic font-serif">
                              Hook: "{post.captionHook}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solo Maker Batching Hack & Short Form Video Ideas */}
              {(result.soloMakerTimeHack || (result.shortFormVideoIdeas && result.shortFormVideoIdeas.length > 0)) && (
                <div className="grid grid-cols-1 gap-6">
                  {result.soloMakerTimeHack && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2 text-base font-serif font-bold text-slate-900">
                        <Sparkles className="w-4 h-4 text-cyan-600" />
                        <span>Solo Maker 2-Hour Batching Time Hack</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-teal-50/40 p-4 rounded-2xl border border-teal-100">
                        {result.soloMakerTimeHack}
                      </p>
                    </div>
                  )}

                  {result.shortFormVideoIdeas && result.shortFormVideoIdeas.length > 0 && (
                    <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                      <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-teal-600" />
                        <span>Viral Process Reel / TikTok Video Concepts</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {result.shortFormVideoIdeas.map((vid, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs space-y-1.5"
                          >
                            <span className="font-bold text-slate-900 block font-serif">
                              {vid.title}
                            </span>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {vid.videoConcept}
                            </p>
                            <span className="text-[10px] text-teal-700 font-medium block italic">
                              🎵 Audio Vibe: {vid.audioVibe}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Ready Promotional Captions */}
              <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4">
                <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>Ready Promotional Captions</span>
                </h3>
                <div className="space-y-4">
                  {result.promotionalCaptions.map((caption, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-teal-700 text-[11px] uppercase tracking-wider">
                          Caption Template #{idx + 1}
                        </span>
                        <button
                          onClick={() => handleCopyText(caption, `caption-${idx}`)}
                          className="text-[11px] text-teal-700 font-bold hover:underline flex items-center gap-1 uppercase tracking-wider"
                        >
                          {copiedSection === `caption-${idx}` ? (
                            <Check className="w-3.5 h-3.5 text-teal-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-teal-600" />
                          )}
                          <span>{copiedSection === `caption-${idx}` ? "Copied!" : "Copy Caption"}</span>
                        </button>
                      </div>
                      <p className="whitespace-pre-line font-sans text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-teal-100">
                        {caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount / Bundle Strategies & Engagement Ideas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bundles */}
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Gift className="w-4 h-4 text-teal-600" />
                    <span>Margin-Protecting Bundles</span>
                  </h3>
                  <div className="space-y-2">
                    {result.discountAndBundleStrategies.map((strat, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-600"
                      >
                        • {strat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engagement Ideas */}
                <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-3">
                  <h3 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span>Social Engagement Polls</span>
                  </h3>
                  <div className="space-y-2">
                    {result.engagementIdeas.map((eng, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-teal-50/40 border border-teal-100 text-xs text-slate-600"
                      >
                        • {eng}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Hashtags */}
              <div className="bg-slate-900 text-white rounded-[24px] p-6 sm:p-8 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                    <Hash className="w-4 h-4" />
                    <span>Recommended Craft Hashtags</span>
                  </h3>
                  <button
                    onClick={() =>
                      handleCopyText(result.recommendedHashtags.join(" "), "hashtags")
                    }
                    className="text-xs text-cyan-400 font-semibold hover:underline uppercase tracking-wider"
                  >
                    {copiedSection === "hashtags" ? "Copied!" : "Copy All Hashtags"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.recommendedHashtags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-cyan-200 border border-white/10 font-mono"
                    >
                      {tag.startsWith("#") ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
