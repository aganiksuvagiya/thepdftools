// Excel number / date format codes -> display text.

export interface Formatted {
  text: string;
  color: string | null;
}

const BUILTIN: Record<number, string> = {
  0: "General", 1: "0", 2: "0.00", 3: "#,##0", 4: "#,##0.00", 9: "0%", 10: "0.00%", 11: "0.00E+00", 12: "# ?/?", 13: "# ??/??",
  14: "m/d/yyyy", 15: "d-mmm-yy", 16: "d-mmm", 17: "mmm-yy", 18: "h:mm AM/PM", 19: "h:mm:ss AM/PM", 20: "h:mm", 21: "h:mm:ss",
  22: "m/d/yyyy h:mm", 37: "#,##0 ;(#,##0)", 38: "#,##0 ;[Red](#,##0)", 39: "#,##0.00;(#,##0.00)", 40: "#,##0.00;[Red](#,##0.00)",
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)', 42: '_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)', 44: '_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)',
  45: "mm:ss", 46: "[h]:mm:ss", 47: "mm:ss.0", 48: "##0.0E+0", 49: "@",
};

export function builtinFormat(id: number): string {
  return BUILTIN[id] || "General";
}

const COLORS: Record<string, string> = {
  red: "#ff0000", blue: "#0000ff", green: "#008000", yellow: "#ffff00", magenta: "#ff00ff", cyan: "#00ffff", black: "#000000", white: "#ffffff",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function splitSections(code: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQ = false;
  let inB = false;
  for (let i = 0; i < code.length; i++) {
    const c = code[i];
    if (c === "\\" && !inQ) {
      cur += c + (code[i + 1] || "");
      i++;
      continue;
    }
    if (c === '"') inQ = !inQ;
    else if (!inQ && c === "[") inB = true;
    else if (!inQ && c === "]") inB = false;
    if (c === ";" && !inQ && !inB) {
      out.push(cur);
      cur = "";
    } else cur += c;
  }
  out.push(cur);
  return out;
}

interface Tok {
  k: "lit" | "digit" | "dot" | "comma" | "pct" | "text" | "date" | "exp" | "elapsed";
  s: string;
}

function tokenize(sec: string): { toks: Tok[]; color: string | null; cond: { op: string; v: number } | null } {
  const toks: Tok[] = [];
  let color: string | null = null;
  let cond: { op: string; v: number } | null = null;
  for (let i = 0; i < sec.length; i++) {
    const c = sec[i];
    if (c === '"') {
      let j = i + 1;
      let s = "";
      while (j < sec.length && sec[j] !== '"') s += sec[j++];
      toks.push({ k: "lit", s });
      i = j;
    } else if (c === "\\") {
      toks.push({ k: "lit", s: sec[i + 1] || "" });
      i++;
    } else if (c === "_") {
      toks.push({ k: "lit", s: " " });
      i++;
    } else if (c === "*") {
      i++;
    } else if (c === "[") {
      const j = sec.indexOf("]", i);
      const inner = sec.slice(i + 1, j < 0 ? sec.length : j);
      i = j < 0 ? sec.length : j;
      const lower = inner.toLowerCase();
      if (COLORS[lower]) color = COLORS[lower];
      else if (inner.charAt(0) === "$") {
        const sym = inner.slice(1).split("-")[0];
        if (sym) toks.push({ k: "lit", s: sym });
      } else if (/^(h+|m+|s+)$/i.test(inner)) toks.push({ k: "elapsed", s: lower });
      else {
        const m = /^(<=|>=|<>|<|>|=)\s*(-?[\d.]+)$/.exec(inner);
        if (m) cond = { op: m[1], v: parseFloat(m[2]) };
      }
    } else if (c === "0" || c === "#" || c === "?") toks.push({ k: "digit", s: c });
    else if (c === ".") toks.push({ k: "dot", s: c });
    else if (c === ",") toks.push({ k: "comma", s: c });
    else if (c === "%") toks.push({ k: "pct", s: c });
    else if (c === "@") toks.push({ k: "text", s: c });
    else if ((c === "E" || c === "e") && (sec[i + 1] === "+" || sec[i + 1] === "-")) {
      toks.push({ k: "exp", s: sec[i + 1] });
      i++;
    } else if (/[ymdhsYMDHS]/.test(c) || ((c === "A" || c === "a") && /^(am\/pm|a\/p)/i.test(sec.slice(i)))) {
      if (c === "A" || c === "a") {
        const m = /^(am\/pm|a\/p)/i.exec(sec.slice(i)) as RegExpExecArray;
        toks.push({ k: "date", s: m[1] });
        i += m[1].length - 1;
      } else {
        let j = i;
        while (j + 1 < sec.length && sec[j + 1].toLowerCase() === c.toLowerCase()) j++;
        toks.push({ k: "date", s: sec.slice(i, j + 1) });
        i = j;
      }
    } else toks.push({ k: "lit", s: c });
  }
  return { toks, color, cond };
}

function serialToDate(serial: number, d1904: boolean): Date {
  if (d1904) return new Date(Math.round((serial - 24107) * 86400000));
  const adj = serial >= 61 ? 25569 : 25568;
  return new Date(Math.round((serial - adj) * 86400000));
}

function pad(n: number, w: number): string {
  let s = String(n);
  while (s.length < w) s = "0" + s;
  return s;
}

function formatDate(toks: Tok[], v: number, d1904: boolean): string {
  const total = Math.round(v * 86400) / 86400;
  const d = serialToDate(total, d1904);
  const Y = d.getUTCFullYear(), M = d.getUTCMonth(), D = d.getUTCDate(), W = d.getUTCDay();
  const secs = Math.round((v - Math.floor(v)) * 86400) % 86400;
  const hh = Math.floor(secs / 3600), mi = Math.floor((secs % 3600) / 60), ss = secs % 60;
  const ampm = toks.some((t) => t.k === "date" && /^(am\/pm|a\/p)$/i.test(t.s));
  let out = "";
  toks.forEach((t, i) => {
    if (t.k === "elapsed") {
      const total2 = Math.floor(v * 86400);
      const n = t.s.charAt(0) === "h" ? Math.floor(total2 / 3600) : t.s.charAt(0) === "m" ? Math.floor(total2 / 60) : total2;
      out += pad(n, t.s.length);
      return;
    }
    if (t.k !== "date") {
      out += t.k === "lit" ? t.s : t.k === "digit" || t.k === "dot" || t.k === "comma" ? (t.k === "dot" ? "." : "") : t.s;
      return;
    }
    const s = t.s;
    const ls = s.toLowerCase();
    if (/^(am\/pm|a\/p)$/i.test(s)) {
      const pm = hh >= 12;
      out += ls === "a/p" ? (pm ? "P" : "A") : pm ? "PM" : "AM";
    } else if (ls[0] === "y") out += ls.length <= 2 ? pad(Y % 100, 2) : pad(Y, 4);
    else if (ls[0] === "d") out += ls.length === 1 ? D : ls.length === 2 ? pad(D, 2) : ls.length === 3 ? DAYS[W].slice(0, 3) : DAYS[W];
    else if (ls[0] === "h") {
      const h = ampm ? hh % 12 || 12 : hh;
      out += ls.length === 1 ? h : pad(h, 2);
    } else if (ls[0] === "s") out += ls.length === 1 ? ss : pad(ss, 2);
    else if (ls[0] === "m") {
      // minute when next to h or s, otherwise month
      let minute = false;
      for (let k = i - 1; k >= 0; k--) {
        if (toks[k].k === "date") {
          minute = toks[k].s.toLowerCase()[0] === "h";
          break;
        }
        if (toks[k].k === "elapsed") {
          minute = toks[k].s[0] === "h";
          break;
        }
      }
      if (!minute) {
        for (let k = i + 1; k < toks.length; k++) {
          if (toks[k].k === "date") {
            minute = toks[k].s.toLowerCase()[0] === "s";
            break;
          }
        }
      }
      if (minute) out += ls.length === 1 ? mi : pad(mi, 2);
      else out += ls.length === 1 ? M + 1 : ls.length === 2 ? pad(M + 1, 2) : ls.length === 3 ? MONTHS[M].slice(0, 3) : ls.length === 4 ? MONTHS[M] : MONTHS[M][0];
    }
  });
  return out;
}

function groupThousands(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumberTokens(toks: Tok[], v: number, negShown: boolean): string {
  let x = Math.abs(v);
  const pctCount = toks.filter((t) => t.k === "pct").length;
  for (let i = 0; i < pctCount; i++) x *= 100;

  // scaling commas: commas directly after the last digit placeholder
  let lastDigit = -1;
  toks.forEach((t, i) => {
    if (t.k === "digit") lastDigit = i;
  });
  let scale = 0;
  for (let i = lastDigit + 1; i < toks.length && toks[i].k === "comma"; i++) scale++;
  for (let i = 0; i < scale; i++) x /= 1000;

  const hasExp = toks.some((t) => t.k === "exp");
  const dotIdx = toks.findIndex((t) => t.k === "dot");
  const digitIdxs: number[] = [];
  toks.forEach((t, i) => {
    if (t.k === "digit") digitIdxs.push(i);
  });
  const expIdx = toks.findIndex((t) => t.k === "exp");
  const mantIdxs = hasExp ? digitIdxs.filter((i) => i < expIdx) : digitIdxs;
  const decIdxs = dotIdx >= 0 ? mantIdxs.filter((i) => i > dotIdx) : [];
  const intIdxs = mantIdxs.filter((i) => dotIdx < 0 || i < dotIdx);
  const thousands = toks.some((t, i) => t.k === "comma" && i > (intIdxs[0] ?? 1e9) && i < (intIdxs[intIdxs.length - 1] ?? -1));
  const decimals = decIdxs.length;

  let expText = "";
  if (hasExp) {
    const expDigits = digitIdxs.filter((i) => i > expIdx).length;
    let e = x === 0 ? 0 : Math.floor(Math.log(x) / Math.LN10);
    let m = x === 0 ? 0 : x / Math.pow(10, e);
    if (parseFloat(m.toFixed(decimals)) >= 10) {
      m /= 10;
      e++;
    }
    x = m;
    expText = (e < 0 ? "-" : toks[expIdx].s === "+" ? "+" : "") + pad(Math.abs(e), Math.max(1, expDigits));
  }

  const fixed = x.toFixed(decimals);
  const [ip, fp = ""] = fixed.split(".");
  let intStr = ip;
  if (thousands) intStr = groupThousands(intStr);
  // trailing optional decimals
  let decStr = fp;
  for (let k = decIdxs.length - 1; k >= 0; k--) {
    if (decStr[k] === "0" && toks[decIdxs[k]].s !== "0") decStr = decStr.slice(0, k) + (toks[decIdxs[k]].s === "?" ? " " : "") + decStr.slice(k + 1);
    else break;
  }
  const decOut = decStr;

  // fill integer placeholders right to left
  const assigned: Record<number, string> = {};
  let rest = intStr;
  if (rest === "0" && intIdxs.length && !intIdxs.some((i) => toks[i].s === "0")) rest = "";
  for (let k = intIdxs.length - 1; k >= 0; k--) {
    const idx = intIdxs[k];
    const ph = toks[idx].s;
    if (k === 0) {
      assigned[idx] = rest;
      rest = "";
    } else if (rest.length) {
      assigned[idx] = rest.slice(-1);
      rest = rest.slice(0, -1);
    } else assigned[idx] = ph === "0" ? "0" : ph === "?" ? " " : "";
  }
  if (intIdxs.length && assigned[intIdxs[0]] === "" && toks[intIdxs[0]].s === "0") assigned[intIdxs[0]] = "0";
  decIdxs.forEach((idx, k) => (assigned[idx] = decOut[k] ?? ""));
  if (!intIdxs.length && !decIdxs.length) {
    // no placeholders (format like "text"): nothing numeric to print
  }

  let out = negShown ? "-" : "";
  toks.forEach((t, i) => {
    if (t.k === "digit") out += assigned[i] !== undefined ? assigned[i] : "";
    else if (t.k === "dot") out += decimals > 0 || toks.some((u, j) => j > i && u.k === "digit" && false) ? "." : "";
    else if (t.k === "comma") out += "";
    else if (t.k === "pct") out += "%";
    else if (t.k === "exp") out += "E" + expText;
    else if (t.k === "lit") out += t.s;
  });
  if (hasExp) {
    // remove the exponent digit placeholders that were rendered
    out = out.replace(/E[+-]?\d*$/, "E" + expText);
  }
  return out;
}

function general(v: number): string {
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e11 || a < 1e-9) return v.toExponential(5).replace(/\.?0+e/, "E").replace("e+", "E+").replace("e-", "E-");
  if (Number.isInteger(v)) return String(v);
  return String(parseFloat(v.toPrecision(10)));
}

export function isDateCode(code: string): boolean {
  const secs = splitSections(code);
  const { toks } = tokenize(secs[0]);
  return toks.some((t) => t.k === "date" || t.k === "elapsed") && !toks.some((t) => t.k === "digit");
}

export function formatValue(value: number | string | boolean, code: string, d1904: boolean): Formatted {
  if (typeof value === "boolean") return { text: value ? "TRUE" : "FALSE", color: null };
  const secs = splitSections(code || "General");
  if (typeof value === "string") {
    const sec = secs.length >= 4 ? secs[3] : secs.find((s) => s.indexOf("@") >= 0) || "";
    if (!sec) return { text: value, color: null };
    const { toks, color } = tokenize(sec);
    return { text: toks.map((t) => (t.k === "text" ? value : t.k === "lit" ? t.s : "")).join(""), color };
  }
  const v = value;
  if (!isFinite(v)) return { text: String(v), color: null };

  // choose the section
  let idx = 0;
  const parsed = secs.map((s) => tokenize(s));
  const hasCond = parsed.some((p) => p.cond);
  if (hasCond) {
    idx = parsed.length - 1;
    for (let i = 0; i < parsed.length; i++) {
      const c = parsed[i].cond;
      if (c && ((c.op === ">" && v > c.v) || (c.op === "<" && v < c.v) || (c.op === ">=" && v >= c.v) || (c.op === "<=" && v <= c.v) || (c.op === "=" && v === c.v) || (c.op === "<>" && v !== c.v))) {
        idx = i;
        break;
      }
      if (!c && i === parsed.length - 1) idx = i;
    }
  } else if (secs.length >= 3 && v === 0) idx = 2;
  else if (secs.length >= 2 && v < 0) idx = 1;
  const negShown = v < 0 && !(secs.length >= 2 && idx === 1 && !hasCond);
  const sec = secs[Math.min(idx, secs.length - 1)];
  const { toks, color } = parsed[Math.min(idx, parsed.length - 1)];

  if (/^\s*general\s*$/i.test(sec) || !sec.trim()) return { text: general(v), color };
  if (toks.some((t) => t.k === "date" || t.k === "elapsed") && !toks.some((t) => t.k === "digit")) {
    return { text: formatDate(toks, v, d1904), color };
  }
  if (toks.some((t) => t.k === "text")) {
    return { text: toks.map((t) => (t.k === "text" ? general(v) : t.k === "lit" ? t.s : "")).join(""), color };
  }
  if (!toks.some((t) => t.k === "digit")) {
    // literal-only format such as "n/a"
    return { text: toks.map((t) => (t.k === "lit" ? t.s : "")).join(""), color };
  }
  return { text: formatNumberTokens(toks, v, negShown), color };
}
