"use client";

import { useState, useCallback } from "react";

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length: number, opts: Record<string, boolean>): string {
  let pool = "";
  if (opts.uppercase) pool += CHARS.uppercase;
  if (opts.lowercase) pool += CHARS.lowercase;
  if (opts.numbers) pool += CHARS.numbers;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) pool = CHARS.lowercase;

  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => pool[v % pool.length]).join("");
}

function getStrength(password: string): { label: string; color: string; width: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score <= 4) return { label: "Fair", color: "bg-amber-400", width: "w-2/4" };
  if (score <= 5) return { label: "Good", color: "bg-blue-500", width: "w-3/4" };
  return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: false });
  const [password, setPassword] = useState(() => generatePassword(16, { uppercase: true, lowercase: true, numbers: true, symbols: false }));
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(1);
  const [batch, setBatch] = useState<string[]>([]);

  const generate = useCallback(() => {
    setPassword(generatePassword(length, opts));
    setBatch([]);
    setCopied(false);
  }, [length, opts]);

  const generateBatch = useCallback(() => {
    const list = Array.from({ length: count }, () => generatePassword(length, opts));
    setBatch(list);
    setPassword(list[0]);
  }, [length, opts, count]);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const strength = getStrength(password);

  return (
    <div className="space-y-6">
      {/* Password Output */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <code className="flex-1 break-all font-mono text-base text-slate-900 select-all">{password}</code>
          <button
            onClick={() => copy(password)}
            className="shrink-0 rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        {/* Strength */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Strength</span>
            <span className={`font-semibold ${strength.label === "Weak" ? "text-red-500" : strength.label === "Fair" ? "text-amber-500" : strength.label === "Good" ? "text-blue-500" : "text-emerald-600"}`}>{strength.label}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200">
            <div className={`h-1.5 rounded-full transition-all ${strength.color} ${strength.width}`} />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-700">
            Length: <span className="text-brand-700">{length}</span>
          </label>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-2 w-full accent-brand-700"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>4</span><span>64</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">Include</p>
          {(Object.keys(opts) as (keyof typeof opts)[]).map((key) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={opts[key]}
                onChange={(e) => setOpts((o) => ({ ...o, [key]: e.target.checked }))}
                className="h-4 w-4 rounded accent-brand-700"
              />
              <span className="text-sm text-slate-700 capitalize">{key}</span>
              <span className="ml-auto text-[11px] text-slate-400 font-mono">
                {key === "uppercase" ? "A-Z" : key === "lowercase" ? "a-z" : key === "numbers" ? "0-9" : "!@#$"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={generate}
          className="rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800"
        >
          Generate Password
        </button>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(e) => setCount(Math.min(20, Math.max(1, Number(e.target.value))))}
            className="w-16 rounded-xl border border-slate-200 px-3 py-3 text-sm text-center outline-none focus:border-brand-300"
          />
          <button
            onClick={generateBatch}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            Generate {count > 1 ? `${count} Passwords` : "Batch"}
          </button>
        </div>
      </div>

      {batch.length > 1 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-700">{batch.length} Passwords</p>
            <button
              onClick={() => copy(batch.join("\n"))}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              Copy All
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {batch.map((p, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <code className="flex-1 font-mono text-sm text-slate-800 break-all">{p}</code>
                <button onClick={() => copy(p)} className="shrink-0 text-xs text-brand-600 hover:text-brand-700">Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
