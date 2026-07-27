import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import Markdown from "react-markdown";
import { ChatMessage } from "../types";

export const ChatbotTool: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: `Hello! I am **CraftIQ**, your dedicated AI business mentor for handmade entrepreneurs.

Whether you need advice on:
- Increasing sales for your crochet, floral, or jewelry crafts
- Launching new seasonal collections (e.g. Eid, Valentine's, Mother's Day)
- Etsy SEO, Instagram Reels hooks, or dealing with discount requests
- Setting up custom order policies & deposit terms

How can I help grow your artisan business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionPrompts = [
    "How can I increase my handmade product sales on Instagram?",
    "How should I launch my new crochet collection?",
    "What products should I create for Eid & festive holidays?",
    "How do I politely respond to customers asking for cheap discounts?",
    "What is the best way to price custom personalized orders?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);
    setError(null);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, text: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          conversationHistory: historyPayload,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to get AI mentor response.");
      }

      const data = await response.json();

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: data.response || "I am here to guide your artisan business.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to reach AI mentor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: "Chat history cleared. What business question would you like to discuss next?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setError(null);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-teal-50/90 rounded-[32px] p-6 sm:p-8 border border-teal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-teal-200/80 text-teal-800 text-xs font-bold tracking-wide">
            <Bot className="w-3.5 h-3.5 text-teal-600" />
            <span>CraftIQ AI Business Mentor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Artisan Business Consultant
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Get practical, realistic guidance on pricing, marketing strategy, client communications, and scaling your creative business.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-teal-50 text-slate-800 text-xs font-bold border border-teal-200/80 transition-colors uppercase tracking-wider shadow-2xs"
          title="Reset conversation"
        >
          <Trash2 className="w-3.5 h-3.5 text-teal-600" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Lightbulb className="w-4 h-4 text-teal-600" />
          <span>Frequently Asked Mentor Topics:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestionPrompts.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(promptText)}
              disabled={loading}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-teal-100/60 text-slate-800 border border-teal-200 font-medium transition-colors shadow-2xs text-left"
            >
              💬 {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-[32px] border border-teal-100 shadow-2xs overflow-hidden flex flex-col h-[540px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs ${
                    isUser
                      ? "bg-slate-900 text-white"
                      : "bg-teal-600 text-white"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 ${
                    isUser
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : "bg-teal-50/90 text-slate-900 border border-teal-200/80 rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 font-semibold gap-2 border-b border-black/10 pb-1 mb-1">
                    <span>{isUser ? "You" : "CraftIQ AI Mentor"}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="prose prose-xs max-w-none text-current space-y-2 leading-relaxed">
                    <Markdown>{msg.text}</Markdown>
                  </div>

                  {!isUser && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="text-[10px] text-teal-700 hover:text-slate-900 flex items-center gap-1 font-bold uppercase tracking-wider"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-teal-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-teal-600" />
                            <span>Copy Advice</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-teal-50/90 border border-teal-200/80 p-3.5 rounded-2xl rounded-tl-none text-xs text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                <span>CraftIQ mentor is thinking...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-teal-50/90 border-t border-teal-200/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask any question about your handmade business..."
              className="flex-1 text-xs sm:text-sm p-3.5 rounded-2xl border border-teal-200/80 focus:ring-2 focus:ring-teal-500/40 bg-white text-slate-900 font-medium"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-teal-950 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
