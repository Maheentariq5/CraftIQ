import React, { useState } from "react";
import {
  Bookmark,
  Trash2,
  Copy,
  Check,
  Sparkles,
  Tag,
  Users,
  Calendar,
  ExternalLink,
  Search,
} from "lucide-react";
import { SavedAsset } from "../types";

interface SavedLibraryProps {
  savedAssets: SavedAsset[];
  onDeleteAsset: (id: string) => void;
  onClearAll: () => void;
}

export const SavedLibrary: React.FC<SavedLibraryProps> = ({
  savedAssets,
  onDeleteAsset,
  onClearAll,
}) => {
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = savedAssets.filter((asset) => {
    const matchesType = filterType === "all" || asset.type === filterType;
    const matchesSearch =
      asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleCopyAsset = (asset: SavedAsset) => {
    const jsonString = JSON.stringify(asset.data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "branding":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "pricing":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "persona":
        return "bg-teal-50 text-teal-800 border-teal-200";
      case "marketing":
        return "bg-teal-50 text-teal-800 border-teal-200";
      default:
        return "bg-teal-50 text-slate-800 border-teal-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "branding":
        return <Sparkles className="w-4 h-4 text-teal-600" />;
      case "pricing":
        return <Tag className="w-4 h-4 text-teal-600" />;
      case "persona":
        return <Users className="w-4 h-4 text-teal-600" />;
      case "marketing":
        return <Calendar className="w-4 h-4 text-teal-600" />;
      default:
        return <Bookmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-teal-50/90 rounded-[32px] p-6 sm:p-8 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide">
            <Bookmark className="w-3.5 h-3.5 text-teal-600" />
            <span>Saved Business Assets Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Your Saved Strategies ({savedAssets.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All your generated branding kits, pricing strategy formulas, customer personas, and marketing plans saved in one place.
          </p>
        </div>

        {savedAssets.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200 transition-colors flex items-center gap-1.5 shrink-0 uppercase tracking-wider"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Library</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[24px] border border-teal-100 shadow-2xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Assets" },
            { id: "branding", label: "Branding" },
            { id: "pricing", label: "Pricing" },
            { id: "persona", label: "Personas" },
            { id: "marketing", label: "Marketing" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors shrink-0 uppercase tracking-wider ${
                filterType === type.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-teal-50 text-slate-800 hover:bg-teal-100/80 border border-teal-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-teal-600" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved assets..."
            className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-full border border-teal-200/80 bg-white text-slate-900 focus:ring-2 focus:ring-teal-500/40"
          />
        </div>
      </div>

      {/* Saved Items List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[32px] p-12 border border-dashed border-teal-200 text-center space-y-3">
          <Bookmark className="w-10 h-10 text-teal-600 mx-auto" />
          <h3 className="text-base font-serif font-bold text-slate-900">
            No Saved Assets Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {savedAssets.length === 0
              ? "You haven't saved any AI results yet. Use any of the 4 AI tools and click 'Save to Library'."
              : "No saved assets match your search filter."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              className="bg-white rounded-[32px] p-6 sm:p-8 border border-teal-100 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(asset.type)}
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${getBadgeColor(
                        asset.type
                      )}`}
                    >
                      {asset.type}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {asset.createdAt}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-slate-900">
                  {asset.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {asset.subtitle}
                </p>

                {/* Render JSON Data Summary Preview */}
                <div className="bg-teal-50/40 p-4 rounded-2xl border border-teal-100 text-xs text-slate-800 max-h-40 overflow-y-auto space-y-1">
                  {asset.type === "branding" && (
                    <div className="space-y-1">
                      <div className="font-bold italic font-serif">
                        "{(asset.data as any).tagline}"
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-3">
                        {(asset.data as any).brandStory}
                      </div>
                    </div>
                  )}

                  {asset.type === "pricing" && (
                    <div className="space-y-1">
                      <div className="font-bold text-teal-700">
                        Suggested Price: {(asset.data as any).currency}{" "}
                        {(asset.data as any).suggestedPrice}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Labor Wage: {(asset.data as any).currency}{" "}
                        {(asset.data as any).suggestedHourlyRate}/hr
                      </div>
                    </div>
                  )}

                  {asset.type === "persona" && (
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">
                        {(asset.data as any).personaName} (Age {(asset.data as any).ageGroup})
                      </div>
                      <div className="text-[11px] text-slate-500 italic font-serif">
                        "{(asset.data as any).sampleCustomerQuote}"
                      </div>
                    </div>
                  )}

                  {asset.type === "marketing" && (
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900">
                        {(asset.data as any).campaignSummary}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-teal-100 text-xs">
                <button
                  onClick={() => onDeleteAsset(asset.id)}
                  className="text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1 uppercase tracking-wider text-[11px]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <button
                  onClick={() => handleCopyAsset(asset)}
                  className="px-3.5 py-1.5 rounded-full bg-teal-50 hover:bg-teal-100/80 text-slate-800 font-bold border border-teal-200 flex items-center gap-1.5 transition-colors uppercase tracking-wider text-[11px]"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span>Copied Data!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-teal-600" />
                      <span>Copy Data</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
