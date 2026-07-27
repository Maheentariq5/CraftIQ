import React from "react";
import { Sparkles, Tag, Users, Calendar, ArrowRight, CheckCircle2, HeartHandshake, ShieldAlert } from "lucide-react";
import { ToolType } from "../types";

interface LandingHeroProps {
  onStartCreating: () => void;
  onExploreFeature: (tool: ToolType) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartCreating,
  onExploreFeature,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#F4FBFB] pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 relative z-10">
        {/* Main Hero Header */}
        <header className="pt-6 pb-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/90 text-teal-800 text-xs font-semibold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI Business Companion for Handmade Creators & Artisans</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-[1.1] text-slate-900 mb-6 tracking-tight font-bold">
            Turn Handmade Creativity Into a{" "}
            <span className="italic font-light text-teal-600">Growing Business.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-light max-w-2xl leading-relaxed">
            Your AI-powered business companion for branding, pricing, customer insights, and marketing handmade products with confidence.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <button
              onClick={onStartCreating}
              className="px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Start Creating</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const element = document.getElementById("features-section");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 bg-white hover:bg-teal-50 text-slate-800 border border-teal-200 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs"
            >
              Explore Features
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="pt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>No Marketing Degree Needed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Realistic Pricing Formulas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Tailored for Crochet, Resin, Cards & Gifts</span>
            </div>
          </div>
        </header>

        {/* Feature Grid */}
        <main id="features-section" className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Brand */}
          <div
            onClick={() => onExploreFeature("branding")}
            className="bg-white border border-teal-100 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl transition-all group cursor-pointer hover:border-cyan-200"
          >
            <div>
              <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2 font-bold">Brand My Product</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Generate names, taglines, emotional stories, and eco packaging that resonate with buyers.
              </p>
            </div>
            <button className="w-full mt-6 py-3 bg-[#F4FBFB] border border-teal-100 rounded-2xl text-xs font-bold uppercase tracking-wider group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-colors">
              Start Creating
            </button>
          </div>

          {/* Card 2: Price */}
          <div
            onClick={() => onExploreFeature("pricing")}
            className="bg-white border border-teal-100 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl transition-all group cursor-pointer hover:border-teal-200"
          >
            <div>
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Tag className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2 font-bold">Price My Product</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calculate labor wages, material costs, and find your sweet spot in the market.
              </p>
            </div>
            <button className="w-full mt-6 py-3 bg-[#F4FBFB] border border-teal-100 rounded-2xl text-xs font-bold uppercase tracking-wider group-hover:bg-teal-700 group-hover:text-white group-hover:border-teal-700 transition-colors">
              Optimize Pricing
            </button>
          </div>

          {/* Card 3: Customers */}
          <div
            onClick={() => onExploreFeature("persona")}
            className="bg-white border border-teal-100 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl transition-all group cursor-pointer hover:border-cyan-200"
          >
            <div>
              <div className="w-12 h-12 bg-cyan-50/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 text-teal-700" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2 font-bold">Understand Customers</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Build deep buyer personas for your Etsy shop or Instagram craft boutique.
              </p>
            </div>
            <button className="w-full mt-6 py-3 bg-[#F4FBFB] border border-teal-100 rounded-2xl text-xs font-bold uppercase tracking-wider group-hover:bg-teal-800 group-hover:text-white group-hover:border-teal-800 transition-colors">
              Analyze Audience
            </button>
          </div>

          {/* Card 4: Marketing */}
          <div
            onClick={() => onExploreFeature("marketing")}
            className="bg-white border border-teal-100 rounded-[32px] p-8 flex flex-col justify-between hover:shadow-xl transition-all group cursor-pointer hover:border-teal-200"
          >
            <div>
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6 text-cyan-700" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2 font-bold">Plan My Marketing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Create a 4-week content calendar and captions that truly convert into sales.
              </p>
            </div>
            <button className="w-full mt-6 py-3 bg-[#F4FBFB] border border-teal-100 rounded-2xl text-xs font-bold uppercase tracking-wider group-hover:bg-teal-700 group-hover:text-white group-hover:border-teal-700 transition-colors">
              Build Calendar
            </button>
          </div>
        </main>

        {/* Bottom AI Assistant Floating Bar */}
        <div className="mt-10">
          <div className="w-full bg-teal-950 rounded-[24px] p-6 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-xl border border-teal-900">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full border border-teal-700 flex items-center justify-center bg-teal-900/50">
                  <span className="text-xs font-bold tracking-widest text-cyan-400">IQ</span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 rounded-full border-2 border-teal-950" />
              </div>
              <p className="text-xs sm:text-sm font-light italic text-teal-100/90">
                "How can I increase my handmade product sales for the upcoming Eid festival or holiday season?"
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-teal-300/60 font-bold hidden md:inline">
                Business Mentor Active
              </span>
              <div className="h-6 w-px bg-teal-800 hidden md:block" />
              <button
                onClick={() => onExploreFeature("chat")}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                Ask Consultant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
