"use client";

import { useState } from "react";

function toLocal(ts: number) {
  const d = new Date(ts * 1000);
  return {
    iso: d.toISOString(),
    local: d.toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" }),
    utc: d.toUTCString(),
    relative: getRelative(d),
  };
}

function getRelative(d: Date): string {
  const diff = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const past = diff < 0;
  if (abs < 60) return past ? `${Math.round(abs)} seconds ago` : `in ${Math.round(abs)} seconds`;
  if (abs < 3600) return past ? `${Math.round(abs / 60)} minutes ago` : `in ${Math.round(abs / 60)} minutes`;
  if (abs < 86400) return past ? `${Math.round(abs / 3600)} hours ago` : `in ${Math.round(abs / 3600)} hours`;
  const days = Math.round(abs / 86400);
  return past ? `${days} days ago` : `in ${days} days`;
}

export default function TimestampClient() {
  const [tsInput, setTsInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 16));
  const [result, setResult] = useState<ReturnType<typeof toLocal> | null>(null);
  const [tsFromDate, setTsFromDate] = useState<number | null>(null);
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState("");

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const convertTs = () => {
    const ts = parseInt(tsInput.trim());
    if (isNaN(ts)) return;
    const ms = ts.toString().length > 11 ? ts : ts * 1000;
    setResult(toLocal(Math.floor(ms / 1000)));
  };

  const convertDate = () => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return;
    setTsFromDate(Math.floor(d.getTime() / 1000));
  };

  const refreshNow = () => setNow(Math.floor(Date.now() / 1000));

  const Row = ({ label, value, id }: { label: string; value: string; id: string }) => (
    <div className="flex items-start gap-3 rounded-lg bg-slate-50 px-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="mt-0.5 font-mono text-sm text-slate-900 break-all">{value}</p>
      </div>
      <button onClick={() => copy(value, id)} className="shrink-0 text-xs text-brand-600 hover:text-brand-700 font-medium">
        {copied === id ? "✓" : "Copy"}
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Current timestamp */}
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Current Unix Timestamp</p>
            <p className="mt-1 font-mono text-2xl font-bold text-slate-900">{now}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => copy(now.toString(), "now")} className="rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50">
              {copied === "now" ? "Copied!" : "Copy"}
            </button>
            <button onClick={refreshNow} className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-medium text-white hover:bg-brand-800">
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Timestamp → Date */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">Unix Timestamp → Human Date</h2>
        <div className="flex gap-2">
          <input
            value={tsInput}
            onChange={(e) => setTsInput(e.target.value)}
            placeholder="e.g. 1717027200"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-mono text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
          <button onClick={convertTs} className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
            Convert
          </button>
        </div>
        {result && (
          <div className="mt-4 space-y-2">
            <Row label="ISO 8601" value={result.iso} id="iso" />
            <Row label="Local Time" value={result.local} id="local" />
            <Row label="UTC" value={result.utc} id="utc" />
            <Row label="Relative" value={result.relative} id="rel" />
          </div>
        )}
      </div>

      {/* Date → Timestamp */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">Date & Time → Unix Timestamp</h2>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
          />
          <button onClick={convertDate} className="rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800">
            Convert
          </button>
        </div>
        {tsFromDate !== null && (
          <div className="mt-4 space-y-2">
            <Row label="Unix Timestamp (seconds)" value={tsFromDate.toString()} id="ts-s" />
            <Row label="Unix Timestamp (milliseconds)" value={(tsFromDate * 1000).toString()} id="ts-ms" />
          </div>
        )}
      </div>
    </div>
  );
}
