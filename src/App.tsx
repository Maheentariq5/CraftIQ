import React, { useState, useEffect } from "react";
import { ToolType, CurrencyCode, SavedAsset } from "./types";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { DashboardCards } from "./components/DashboardCards";
import { BrandingTool } from "./components/BrandingTool";
import { PricingTool } from "./components/PricingTool";
import { PersonaTool } from "./components/PersonaTool";
import { MarketingTool } from "./components/MarketingTool";
import { ChatbotTool } from "./components/ChatbotTool";
import { SavedLibrary } from "./components/SavedLibrary";
import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentTool, setCurrentTool] = useState<ToolType>("dashboard");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [savedAssets, setSavedAssets] = useState<SavedAsset[]>(() => {
    try {
      const stored = localStorage.getItem("craftiq_saved_assets");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load saved assets from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("craftiq_saved_assets", JSON.stringify(savedAssets));
    } catch (e) {
      console.error("Failed to save assets to localStorage", e);
    }
  }, [savedAssets]);

  const handleSaveAsset = (assetData: Omit<SavedAsset, "id" | "createdAt">) => {
    const newAsset: SavedAsset = {
      ...assetData,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setSavedAssets((prev) => [newAsset, ...prev]);
  };

  const handleDeleteAsset = (id: string) => {
    setSavedAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const handleClearAllSaved = () => {
    if (window.confirm("Are you sure you want to clear all saved assets?")) {
      setSavedAssets([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4FBFB] text-[#0F172A] flex flex-col font-sans selection:bg-cyan-200 selection:text-cyan-950">
      {/* Top Navbar */}
      <Navbar
        currentTool={currentTool}
        setCurrentTool={setCurrentTool}
        currency={currency}
        setCurrency={setCurrency}
        savedCount={savedAssets.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {currentTool === "dashboard" && (
          <div className="space-y-12">
            <LandingHero
              onStartCreating={() => setCurrentTool("branding")}
              onExploreFeature={(tool) => setCurrentTool(tool)}
            />
            <DashboardCards
              onSelectTool={(tool) => setCurrentTool(tool)}
              savedAssets={savedAssets}
            />
            <AboutSection onSelectTool={(tool) => setCurrentTool(tool)} />
          </div>
        )}

        {currentTool === "branding" && (
          <BrandingTool onSaveResult={handleSaveAsset} />
        )}

        {currentTool === "pricing" && (
          <PricingTool
            currency={currency}
            setCurrency={setCurrency}
            onSaveResult={handleSaveAsset}
          />
        )}

        {currentTool === "persona" && (
          <PersonaTool onSaveResult={handleSaveAsset} />
        )}

        {currentTool === "marketing" && (
          <MarketingTool onSaveResult={handleSaveAsset} />
        )}

        {currentTool === "chat" && <ChatbotTool />}

        {currentTool === "saved" && (
          <SavedLibrary
            savedAssets={savedAssets}
            onDeleteAsset={handleDeleteAsset}
            onClearAll={handleClearAllSaved}
          />
        )}

        {currentTool === "about" && (
          <AboutSection onSelectTool={setCurrentTool} />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentTool={setCurrentTool} />
    </div>
  );
}
