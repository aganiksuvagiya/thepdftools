// Font family stacks and line-height factors shared by the Office renderers.

const SERIF = /^(times|georgia|cambria|garamond|palatino|book antiqua|bookman|century schoolbook|baskerville|constantia|minion|sylfaen|rockwell)/i;
const MONO = /^(consolas|courier|lucida console|monaco|menlo|andale mono|source code|fira code|cascadia)/i;

const LH: Record<string, number> = {
  calibri: 1.22, "calibri light": 1.22, cambria: 1.17, arial: 1.15, "arial narrow": 1.15, "times new roman": 1.15,
  verdana: 1.215, tahoma: 1.207, "segoe ui": 1.33, georgia: 1.136, "trebuchet ms": 1.16, consolas: 1.17,
  "courier new": 1.133, aptos: 1.2, "century gothic": 1.22, "comic sans ms": 1.39,
};

export function fontStack(face: string | undefined, theme: { minor: string; major: string }): string {
  let name = face || theme.minor;
  if (name.indexOf("+mj") === 0) name = theme.major;
  else if (name.indexOf("+mn") === 0) name = theme.minor;
  const q = '"' + name.replace(/"/g, "") + '"';
  if (/^calibri/i.test(name)) return `${q}, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
  if (/^(arial|helvetica)/i.test(name)) return `${q}, Arial, Helvetica, "Liberation Sans", sans-serif`;
  if (/^times/i.test(name)) return `${q}, "Times New Roman", Times, "Liberation Serif", serif`;
  if (SERIF.test(name)) return `${q}, Georgia, "Times New Roman", serif`;
  if (MONO.test(name)) return `${q}, "Courier New", Menlo, monospace`;
  return `${q}, Calibri, Carlito, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;
}

export function lineFactor(name: string): number {
  return LH[name.toLowerCase()] || 1.2;
}
