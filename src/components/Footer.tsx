import React from "react";
import { Sparkles, Heart, Store, ShieldAlert } from "lucide-react";
import { ToolType } from "../types";

interface FooterProps {
  setCurrentTool: (tool: ToolType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTool }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div
              onClick={() => setCurrentTool("dashboard")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-tight">
                CraftIQ
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-powered business companion empowering handmade entrepreneurs, crochet artists, card designers, and gift makers to build profitable creative businesses.
            </p>
          </div>

          {/* Core Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              AI Business Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => setCurrentTool("branding")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Product Branding Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("pricing")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Pricing & Profit Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("persona")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Customer Persona Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("marketing")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Marketing Calendar Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Mentorship & Saved */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Resources & Mentor
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => setCurrentTool("chat")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  AI Business Consultant Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("saved")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Saved Assets Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("about")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  About CraftIQ & Why AI Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTool("dashboard")}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Artisan Growth Hub
                </button>
              </li>
            </ul>
          </div>

          {/* Business Disclaimer */}
          <div className="space-y-2 text-xs text-slate-400 bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <div className="flex items-center gap-1.5 font-bold text-teal-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span className="uppercase tracking-wider text-[11px]">Business Guidance Disclaimer</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              CraftIQ provides creative and business recommendations based on artificial intelligence. Financial calculations are estimates and do not constitute legal or guaranteed profit advice.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1">
            <span>CraftIQ © {new Date().getFullYear()} • Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-teal-400 fill-teal-400" />
            <span>for Handmade Creators</span>
          </div>
          <div>All-in-one AI SaaS Platform for Artisan Entrepreneurs</div>
        </div>
      </div>
    </footer>
  );
};
