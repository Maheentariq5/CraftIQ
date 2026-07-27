import React, { useState } from "react";
import {
  Sparkles,
  Tag,
  Users,
  Calendar,
  MessageSquare,
  Bookmark,
  Menu,
  X,
  Store,
  DollarSign,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { ToolType, CurrencyCode, SUPPORTED_CURRENCIES } from "../types";

interface NavbarProps {
  currentTool: ToolType;
  setCurrentTool: (tool: ToolType) => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTool,
  setCurrentTool,
  currency,
  setCurrency,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const navItems: { id: ToolType; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <Store className="w-3.5 h-3.5" /> },
    { id: "branding", label: "Brand My Product", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "pricing", label: "Price My Product", icon: <Tag className="w-3.5 h-3.5" /> },
    { id: "persona", label: "Customers", icon: <Users className="w-3.5 h-3.5" /> },
    { id: "marketing", label: "Marketing Plan", icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: "chat", label: "AI Mentor", icon: <MessageSquare className="w-3.5 h-3.5" /> },
    {
      id: "saved",
      label: `Saved (${savedCount})`,
      icon: <Bookmark className="w-3.5 h-3.5" />,
    },
    { id: "about", label: "About", icon: <HelpCircle className="w-3.5 h-3.5" /> },
  ];

  const activeCurrencyObj = SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => {
              setCurrentTool("dashboard");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold italic text-white">C</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">
                  CraftIQ
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/80">
                  Studio
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-light tracking-wide hidden sm:block">
                Artisan Business Companion
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTool === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTool(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-teal-900 text-cyan-100 shadow-xs"
                      : "text-slate-600 hover:text-teal-900 hover:bg-teal-50/80"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Currency Selector & Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full bg-teal-50/80 hover:bg-teal-100/70 text-slate-800 border border-teal-200/80 transition-colors"
                title="Select preferred currency"
              >
                <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                <span>{activeCurrencyObj.code} ({activeCurrencyObj.symbol.trim()})</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-2xl shadow-xl border border-teal-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Pricing Currency
                  </div>
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition-colors ${
                        currency === c.code ? "font-bold text-teal-700 bg-teal-50/80" : "text-slate-700"
                      }`}
                    >
                      <span>{c.name}</span>
                      {currency === c.code && <span className="text-teal-600 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentTool("chat")}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-teal-950 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Consultant</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-800 hover:bg-teal-50 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-100 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between py-2 border-b border-teal-100">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-widest">Currency</span>
            <div className="flex flex-wrap gap-1">
              {SUPPORTED_CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border ${
                    currency === c.code
                      ? "bg-teal-700 text-white border-teal-700 font-bold"
                      : "bg-teal-50 text-slate-700 border-teal-200"
                  }`}
                >
                  {c.code}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {navItems.map((item) => {
              const isActive = currentTool === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTool(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-teal-900 text-cyan-100 font-bold"
                      : "text-slate-700 hover:bg-teal-50"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
