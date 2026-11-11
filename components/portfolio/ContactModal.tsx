'use client';

import React, { useState } from 'react';
import { X, Copy, Check, ArrowUpRight, Send, Download, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const email = 'azharsoopun.dev@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#141413', '#7A7A75', '#EFECE6'],
      });
    } catch {}
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
      onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#EFECE6] text-[#141413] border border-[#141413]/20 shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#141413]/14">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7A7A75]">
              [ INQUIRIES &amp; COLLABORATION ]
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-[#141413]" />
          </button>
        </div>

        {/* Heading */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#141413]">
            Let&apos;s build software that performs.
          </h3>
          <p className="text-sm text-[#4A4A46] pt-1">
            Available for full-time engineering roles, high-impact product contracts, and architecture consulting.
          </p>
        </div>

        {/* Fast Copy Email Pill */}
        <div className="p-4 bg-white/70 border border-[#141413]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-[#141413]" />
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-[#141413]">
              {email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#141413] text-[#EFECE6] text-xs font-medium hover:bg-[#252523] transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to clipboard' : 'Copy email'}</span>
            </button>
            <a
              href={`mailto:${email}?subject=Software Engineering Inquiry`}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#141413]/20 text-xs font-medium hover:bg-[#141413] hover:text-[#EFECE6] transition-colors"
            >
              <span>Mailto</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Message Form */}
        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-2 bg-white/50 border border-emerald-500/30 p-6">
            <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center font-bold">
              ✓
            </span>
            <div className="text-lg font-bold text-[#141413]">Message Received</div>
            <p className="text-xs text-[#6E6E6A]">
              Thank you! I will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#7A7A75] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name or team"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#141413]/15 focus:border-[#141413] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#7A7A75] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#141413]/15 focus:border-[#141413] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#7A7A75] mb-1">
                Project Scope or Message
              </label>
              <textarea
                rows={3}
                placeholder="Tell me about what you're building..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#141413]/15 focus:border-[#141413] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#141413] text-[#EFECE6] text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>SEND INQUIRY</span>
            </button>
          </form>
        )}

        {/* Footer Meta */}
        <div className="pt-2 border-t border-[#141413]/12 flex items-center justify-between text-[11px] font-mono text-[#7A7A75]">
          <span>PORT LOUIS, MAURITIUS</span>
          <a
            href="https://github.com/azharsoopun"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#141413] transition-colors"
          >
            GITHUB // @AZHARSOOPUN
          </a>
        </div>
      </div>
    </div>
  );
}
