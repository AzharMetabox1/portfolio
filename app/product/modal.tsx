"use client";

import { useState } from "react";

interface ModalProps {
  buttonText?: string;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  buttonText = "Quick View",
  title = "Details",
  children,
}: ModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
      >
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
                  Client Modal
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="text-sm text-slate-600 mb-6">{children}</div>
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
