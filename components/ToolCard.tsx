"use client";

import Link from "next/link";
import TiltCard from "./TiltCard";

interface ToolCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  color: "blue" | "purple" | "rose" | "emerald" | "violet" | "amber" | "orange" | "teal" | "indigo" | "pink";
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  rose: "bg-rose-100 text-rose-600",
  emerald: "bg-emerald-100 text-emerald-600",
  violet: "bg-violet-100 text-violet-600",
  amber: "bg-amber-100 text-amber-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600",
  indigo: "bg-indigo-100 text-indigo-600",
  pink: "bg-pink-100 text-pink-600",
};

export default function ToolCard({
  href,
  icon,
  title,
  description,
  badge,
  color,
}: ToolCardProps) {
  return (
    <TiltCard>
      <Link
        href={href}
        className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 h-full shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-100/40 hover:border-brand-100"
      >
        <div className="flex items-start justify-between">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[color]} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
            {icon}
          </div>
          {badge && (
            <span className="rounded-md bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-600">
              {badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 text-[15px] font-semibold text-gray-900 group-hover:text-brand-700 transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-1.5 text-[13px] text-gray-400 leading-relaxed flex-1">
          {description}
        </p>

        <div className="mt-5 flex items-center text-[13px] font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0">
          Open tool
          <svg className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
          </svg>
        </div>
      </Link>
    </TiltCard>
  );
}
