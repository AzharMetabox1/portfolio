import type { Metadata } from "next";
import { Suspense } from "react";
import BackButton from "@/app/back-button";

export const metadata: Metadata = {
  title: "Our Team | Next.js Demo App",
  description: "Meet the engineering team.",
};

const teamMembers = [
  { name: "Azhar", role: "Software Engineer Intern", track: "Track B - Web" },
  { name: "Alex", role: "Frontend Mentor", track: "Full Stack" },
  { name: "Sam", role: "Tech Lead", track: "Architecture" },
];

export default function TeamPage() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <h2 className="text-xl font-bold text-slate-900">Engineering Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-1"
          >
            <p className="font-bold text-slate-900 text-sm">{member.name}</p>
            <p className="text-xs text-indigo-600 font-medium">{member.role}</p>
            <p className="text-[11px] text-slate-500">{member.track}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Suspense fallback={<div className="text-xs text-slate-400">Loading navigation...</div>}>
          <BackButton />
        </Suspense>
      </div>
    </div>
  );
}
