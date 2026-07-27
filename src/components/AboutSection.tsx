import React from "react";
import {
  Sparkles,
  HeartHandshake,
  ShieldAlert,
  Clock,
  TrendingUp,
  Award,
  Scissors,
  DollarSign,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Zap,
  Lightbulb,
  Store,
  MessageSquare,
} from "lucide-react";
import { ToolType } from "../types";

interface AboutSectionProps {
  onSelectTool: (tool: ToolType) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectTool }) => {
  const problemPoints = [
    {
      title: "Underpricing & Labor Loss",
      desc: "Artisans frequently calculate only material costs, ignoring their own skilled labor hours and studio overheads. They end up earning below minimum wage for high-effort handmade creations.",
      icon: <DollarSign className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
    },
    {
      title: "Marketing & Writing Burnout",
      desc: "Makers are artists first, not copywriters or social media strategists. Staring at blank screens trying to write compelling product descriptions, launch captions, and hashtags takes hours away from crafting.",
      icon: <Clock className="w-5 h-5 text-rose-600" />,
      bg: "bg-rose-50 border-rose-200",
    },
    {
      title: "Generic Corporate Advice Doesn't Fit",
      desc: "Standard business courses and advice focus on mass production, dropshipping, or SaaS. They fail to understand yarn gauge, resin cure times, acid-free cardstock, or the emotional value of handmade gifts.",
      icon: <ShieldAlert className="w-5 h-5 text-teal-600" />,
      bg: "bg-teal-50 border-teal-200",
    },
    {
      title: "Solo Maker Overwhelm",
      desc: "When you wear every hat — maker, photographer, accountant, marketer, customer service rep — administrative duties lead to creator fatigue and stalled business growth.",
      icon: <Zap className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50 border-cyan-200",
    },
  ];

  const comparison = [
    {
      aspect: "Pricing Approach",
      without: "Guesses a price based on competitors or charges purely for materials, missing labor & platform fees.",
      withCraftIQ: "Scientific pricing formulas factoring materials, skill difficulty, fair hourly wages, and profit margins.",
    },
    {
      aspect: "Product Branding & Copy",
      without: "Generic, short titles like 'Crochet Doll' that get lost among thousands of Etsy listings.",
      withCraftIQ: "Emotional storytelling, tactile sensory descriptions, and niche SEO keywords that captivate buyers.",
    },
    {
      aspect: "Marketing & Social Media",
      without: "Random posting when time permits, struggle to write captions or figure out what content to film.",
      withCraftIQ: "Structured 4-week calendars, process reel ideas, and 2-hour batching strategies for solo makers.",
    },
    {
      aspect: "Business Mentorship",
      without: "Navigating decisions alone or paying high consultant fees meant for large corporate brands.",
      withCraftIQ: "24/7 empathetic AI mentor specialized exclusively in handmade, craft, and artisan businesses.",
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 rounded-[32px] p-8 sm:p-12 text-white shadow-2xl border border-teal-800">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-800/60 border border-teal-600/60 text-cyan-300 text-xs font-bold tracking-wide">
            <HeartHandshake className="w-4 h-4 text-cyan-400" />
            <span>Why CraftIQ Exists</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight">
            Empowering Handmade Creators to Build <span className="text-cyan-300 italic font-light">Profitable & Sustainable</span> Creative Businesses.
          </h1>

          <p className="text-sm sm:text-base text-teal-100/90 font-light leading-relaxed">
            CraftIQ bridges the gap between passionate craftsmanship and smart business strategy. We believe no artisan should ever sacrifice their fair wages or burn out managing administrative tasks alone.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectTool("branding")}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore AI Tools</span>
            </button>
            <button
              onClick={() => onSelectTool("chat")}
              className="px-6 py-3 bg-teal-900/80 hover:bg-teal-800 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-colors border border-teal-700 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Talk to AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* The Core Problem CraftIQ Solves */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 inline-block">
            The Artisan Dilemma
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            The Real Problems Handmade Entrepreneurs Face Every Day
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Making beautiful items is only half the journey. The hidden struggle lies in pricing, marketing, and positioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problemPoints.map((pt, idx) => (
            <div
              key={idx}
              className={`p-7 rounded-[28px] border ${pt.bg} space-y-3 shadow-2xs hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white shadow-2xs border border-black/5">
                  {pt.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  {pt.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {pt.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Handmade Entrepreneurs Need AI Assistance */}
      <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-teal-100 shadow-2xs space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-teal-100 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-700">
              The AI Advantage
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Why Handmade Businesses Need Specialized AI Assistance
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md leading-relaxed">
            AI gives solo artisans the superpower of a 5-person marketing, copy, accounting, and strategy team without the overhead costs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Save 80%+ Admin Time
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automate copywriting, pricing calculations, and social captions in seconds, leaving more time for hands-on creation and studio production.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-700 text-white flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Protect Maker Wages
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Remove guesswork with formulas that guarantee fair hourly wages, difficulty multipliers, and clear profit margins for custom orders.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900">
              Craft-Specific Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike generic AI, CraftIQ understands crochet stitches, resin curing times, paper gsm, wax seals, and how buyers connect with handmade gifts.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Matrix: Traditional vs CraftIQ */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            The Difference CraftIQ Makes
          </h2>
          <p className="text-xs text-slate-500">
            See how AI transforms the daily workflow for a handmade business owner
          </p>
        </div>

        <div className="bg-white rounded-[32px] border border-teal-100 shadow-2xs overflow-hidden">
          <div className="divide-y divide-teal-100">
            {comparison.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-6 gap-4 hover:bg-teal-50/30 transition-colors"
              >
                <div className="md:col-span-3 font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{item.aspect}</span>
                </div>

                <div className="md:col-span-4 bg-rose-50/50 p-3.5 rounded-2xl border border-rose-100 text-xs text-slate-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-700 text-[11px] uppercase tracking-wider">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Without AI Support</span>
                  </div>
                  <p>{item.without}</p>
                </div>

                <div className="md:col-span-5 bg-teal-50/80 p-3.5 rounded-2xl border border-teal-200/80 text-xs text-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-teal-800 text-[11px] uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    <span>With CraftIQ AI Companion</span>
                  </div>
                  <p className="font-medium">{item.withCraftIQ}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-slate-900 rounded-[32px] p-8 sm:p-10 text-white text-center space-y-4 border border-slate-800 shadow-xl">
        <div className="w-12 h-12 bg-teal-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-teal-500/30">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold max-w-xl mx-auto">
          Ready to Elevate Your Handmade Business Today?
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
          Start by generating a brand story, pricing your next product, or asking your AI business mentor for personalized marketing ideas.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onSelectTool("branding")}
            className="px-7 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-full text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2"
          >
            <span>Brand A Product</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectTool("pricing")}
            className="px-7 py-3 bg-white hover:bg-teal-50 text-slate-900 font-bold rounded-full text-xs uppercase tracking-wider transition-colors"
          >
            Calculate Pricing
          </button>
        </div>
      </div>
    </div>
  );
};
