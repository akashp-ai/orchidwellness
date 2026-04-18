"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type Step = "idle" | "open" | "loading" | "success" | "error";

export default function InquiryWidget() {
  const [step, setStep] = useState<Step>("idle");
  const [form, setForm] = useState({ name: "", phone: "", query: "" });
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Focus name field when opened
  useEffect(() => {
    if (step === "open") setTimeout(() => nameRef.current?.focus(), 150);
  }, [step]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && (step === "open" || step === "error")) {
        setStep("idle");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.query.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setStep("loading");

    // ── GOOGLE SHEETS CONNECTION ──────────────────────────────────────────
    // Paste your Google Apps Script Web App URL below.
    // See README for the exact step-by-step setup instructions.
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
    // ─────────────────────────────────────────────────────────────────────

    try {
      // We use mode:"no-cors" because Google Apps Script does not send
      // CORS headers. This means we cannot read the response body,
      // so we optimistically show success after the request fires.
      // You can verify entries directly in your Google Sheet.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        // Content-Type must be text/plain to avoid a CORS preflight request
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          query: form.query,
          submittedAt: new Date().toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "short",
            timeStyle: "short",
          }),
        }),
      });

      // With no-cors the response is always opaque — treat completion as success.
      setStep("success");
      setForm({ name: "", phone: "", query: "" });
      setTimeout(() => setStep("idle"), 4000);
    } catch {
      setError("Could not send. Please call or WhatsApp us directly.");
      setStep("error");
    }
  };

  const isOpen = step === "open" || step === "loading" || step === "success" || step === "error";

  return (
    <>
      {/* Backdrop (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setStep("idle")}
        />
      )}

      {/* Floating button */}
      <button
        onClick={() => setStep(isOpen ? "idle" : "open")}
        className={`fixed right-4 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? "bg-charcoal-700 bottom-[88px] md:bottom-4 rotate-0"
            : "bg-rose-500 hover:bg-rose-600 bottom-[88px] md:bottom-6 hover:scale-110"
        }`}
        aria-label={isOpen ? "Close inquiry" : "Ask us anything"}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageSquare size={22} className="text-white" />
        )}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed right-4 z-[60] w-[calc(100vw-2rem)] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-cream-300 overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ bottom: "calc(88px + 4rem)", maxWidth: "360px" }}
        aria-live="polite"
      >
        {/* Header */}
        <div className="bg-rose-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-sm shadow-green-400/50 flex-shrink-0" />
            <div>
              <div className="text-white font-serif font-semibold text-base">
                {t("inquiry.title")}
              </div>
              <div className="text-white/70 text-xs mt-0.5">
                {t("inquiry.subtitle")}
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep("idle")}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {step === "success" ? (
            <div className="py-6 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
                {t("inquiry.successTitle")}
              </h3>
              <p className="text-charcoal-500 text-sm leading-relaxed">
                {t("inquiry.successText")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="text-charcoal-500 text-sm mb-4 leading-relaxed">
                Leave your details and we&apos;ll respond as soon as possible.
              </p>

              {/* Name */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide">
                  Your Name *
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 text-charcoal-800 text-sm placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
                  disabled={step === "loading"}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 text-charcoal-800 text-sm placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition"
                  disabled={step === "loading"}
                />
              </div>

              {/* Query */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 uppercase tracking-wide">
                  Your Query *
                </label>
                <textarea
                  value={form.query}
                  onChange={(e) => setForm({ ...form, query: e.target.value })}
                  placeholder="e.g. I'd like to book a massage session for next Saturday..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 text-charcoal-800 text-sm placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition resize-none"
                  disabled={step === "loading"}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={step === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
              >
                {step === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {t("inquiry.sending")}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t("inquiry.sendBtn")}
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-charcoal-400 mt-3">
                {t("inquiry.disclaimer")}
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
