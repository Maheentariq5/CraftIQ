import React from "react";
import {
  Sparkles,
  Tag,
  Users,
  Calendar,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Bookmark,
  CheckCircle2,
  Clock,
  Shirt,
  Scissors,
  Flower2,
  Award,
} from "lucide-react";
import { ToolType, SavedAsset } from "../types";

interface DashboardCardsProps {
  onSelectTool: (tool: ToolType) => void;
  savedAssets: SavedAsset[];
}

export const DashboardCards: React.FC<DashboardCardsProps> = ({
  onSelectTool,
  savedAssets,
}) => {
  const tools = [
    {
      id: "branding" as ToolType,
      title: "1. Brand My Product",
      subtitle: "AI Product Branding Generator",
      description:
        "Create creative names, taglines, emotional stories, USPs, and packaging concepts tailored to your craft style.",
      icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
      badge: "Branding",
      badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      buttonBg: "bg-slate-900 hover:bg-cyan-700 text-white",
      examples: ["Crochet Plushies", "Resin Coasters", "Hand-painted Cards"],
    },
    {
      id: "pricing" as ToolType,
      title: "2. Price My Product",
      subtitle: "AI Pricing Assistant",
      description:
        "Calculate material costs, fair artisan hourly wages, difficulty multipliers, and recommended profit margins.",
      icon: <Tag className="w-6 h-6 text-teal-600" />,
      badge: "Pricing & Profit",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
      buttonBg: "bg-slate-900 hover:bg-teal-700 text-white",
      examples: ["Material Expense", "Labor Hours", "Multi-Currency"],
    },
    {
      id: "persona" as ToolType,
      title: "3. Understand My Customers",
      subtitle: "AI Customer Persona Generator",
      description:
        "Identify your ideal buyer's demographic, buying triggers, pain points, and preferred social media channels.",
      icon: <Users className="w-6 h-6 text-teal-700" />,
      badge: "Target Audience",
      badgeColor: "bg-cyan-50 text-teal-800 border-cyan-200",
      buttonBg: "bg-slate-900 hover:bg-teal-800 text-white",
      examples: ["Buying Motivation", "Preferred Platforms", "Customer Quote"],
    },
    {
      id: "marketing" as ToolType,
      title: "4. Plan My Marketing",
      subtitle: "AI Marketing Planner",
      description:
        "Build 4-week content calendars, launch campaign ideas, promotional captions, hashtags, and discount strategies.",
      icon: <Calendar className="w-6 h-6 text-cyan-700" />,
      badge: "Marketing Strategy",
      badgeColor: "bg-teal-50 text-cyan-800 border-teal-200",
      buttonBg: "bg-slate-900 hover:bg-teal-700 text-white",
      examples: ["Monthly Calendar", "Launch Captions", "Non-Cheap Bundles"],
    },
  ];

  const quickQuestions = [
    "How can I increase my handmade product sales on Instagram?",
    "How should I launch my new crochet collection for Spring?",
    "What products should I create for Eid and upcoming festive holidays?",
    "How do I handle customers asking for cheap discounts?",
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Banner */}
      <div className="bg-teal-50/90 rounded-[32px] p-6 sm:p-8 border border-teal-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>Artisan Growth Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Welcome to Your Artisan Growth Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Select any of the four core AI engines below to elevate your handmade business, or consult your 24/7 AI Business Mentor.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTool("chat")}
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-teal-950 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Mentor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Tool Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-serif font-bold text-slate-900">
            Core AI Business Engines
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            4 Specialized Tools Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              className="bg-white rounded-[32px] p-8 border border-teal-100 hover:border-teal-300 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${tool.badgeColor}`}
                  >
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">
                    {tool.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tool.examples.map((ex, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-teal-50/60 text-slate-700 border border-teal-100"
                    >
                      ✓ {ex}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-teal-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors uppercase tracking-wider">
                  Open Tool
                </span>
                <div
                  className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${tool.buttonBg}`}
                >
                  <span>Launch</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Business Consultant Quick Chat Section */}
      <div className="bg-white rounded-[32px] p-8 border border-teal-100 shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-slate-900">
                AI Business Consultant Chatbot
              </h2>
              <p className="text-xs text-slate-500">
                Get real-time guidance on your handmade business questions
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTool("chat")}
            className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 uppercase tracking-wider"
          >
            <span>Open Chat Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTool("chat")}
              className="p-4 rounded-2xl bg-teal-50/40 hover:bg-teal-50/90 border border-teal-100 text-left text-xs font-medium text-slate-800 flex items-start gap-2.5 group transition-colors"
            >
              <span className="text-teal-600 font-bold">?</span>
              <span className="group-hover:text-teal-800 transition-colors italic">
                "{q}"
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Results Preview if any */}
      {savedAssets.length > 0 && (
        <div className="bg-teal-50/70 rounded-[32px] p-8 border border-teal-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-teal-700" />
              <h2 className="text-lg font-serif font-bold text-slate-900">
                Your Saved Business Assets ({savedAssets.length})
              </h2>
            </div>
            <button
              onClick={() => onSelectTool("saved")}
              className="text-xs font-bold text-teal-700 hover:underline uppercase tracking-wider"
            >
              View All Saved Assets →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedAssets.slice(0, 3).map((asset) => (
              <div
                key={asset.id}
                onClick={() => onSelectTool("saved")}
                className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:border-teal-400 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                  <span>{asset.type}</span>
                  <span className="text-slate-400 font-normal">
                    {asset.createdAt}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate font-serif">
                  {asset.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {asset.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
