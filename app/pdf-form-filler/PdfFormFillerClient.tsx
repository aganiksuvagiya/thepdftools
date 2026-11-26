"use client";

import { useState, useCallback } from "react";
import DropZone from "@/components/DropZone";
import { needsUnicode } from "@/app/text-to-pdf/unicodePdf";
import { textToPng } from "@/lib/textImage";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } from "pdf-lib";

interface FormField {
  name: string;
  type: "text" | "checkbox" | "dropdown" | "radio" | "unknown";
  value: string;
  options?: string[];
}

// pdf-lib's form fonts cannot encode Gujarati, Hindi, "₹" etc. Such a value is drawn onto the page
// where the field sits, and the (now filled) field is removed.
async function stampUnicodeField(doc: PDFDocument, name: string, value: string) {
  const form = doc.getForm();
  const field = form.getTextField(name);
  const widgets = field.acroField.getWidgets();
  for (let w = 0; w < widgets.length; w++) {
    const rect = widgets[w].getRectangle();
    const page = doc.getPages().find((p) => {
      const annots = p.node.Annots();
      if (!annots) return false;
      for (let i = 0; i < annots.size(); i++) if (annots.lookup(i) === widgets[w].dict) return true;
      return false;
    });
    if (!page) continue;
    const art = textToPng(value, Math.min(12, rect.height * 0.6), "#000000", false);
    const image = await doc.embedPng(art.dataUrl);
    const scale = Math.min(1, (rect.width - 4) / art.textWidth);
    page.drawImage(image, {
      x: rect.x + 2 - art.pad * scale,
      y: rect.y + (rect.height - art.height * scale) / 2,
      width: art.width * scale,
      height: art.height * scale,
    });
  }
  form.removeField(field);
}

export default function PdfFormFillerClient() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [originalBytes, setOriginalBytes] = useState<Uint8Array | null>(null);
  const [filename, setFilename] = useState("form");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noFields, setNoFields] = useState(false);

  const handleFile = useCallback(async (files: File[]) => {
    const f = files[0]; if (!f) return;
    setLoading(true); setError(null); setFields([]); setValues({}); setNoFields(false);
    setFilename(f.name.replace(/\.pdf$/i, ""));
    try {
      const bytes = new Uint8Array(await f.arrayBuffer());
      setOriginalBytes(bytes);
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const form = doc.getForm();
      const rawFields = form.getFields();

      if (!rawFields.length) { setNoFields(true); setLoading(false); return; }

      const parsed: FormField[] = rawFields.map((field) => {
        const name = field.getName();
        // instanceof, not constructor.name: class names are minified in the production build,
        // which made every field show up as "unknown".
        if (field instanceof PDFTextField) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tf = field as any;
            return { name, type: "text", value: tf.getText() || "" };
          } catch { return { name, type: "text", value: "" }; }
        }
        if (field instanceof PDFCheckBox) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cb = field as any;
            return { name, type: "checkbox", value: cb.isChecked() ? "true" : "false" };
          } catch { return { name, type: "checkbox", value: "false" }; }
        }
        if (field instanceof PDFDropdown) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dd = field as any;
            const opts = dd.getOptions?.() || [];
            const sel = dd.getSelected?.() || [];
            return { name, type: "dropdown", value: sel[0] || "", options: opts };
          } catch { return { name, type: "dropdown", value: "", options: [] }; }
        }
        if (field instanceof PDFRadioGroup) {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rg = field as any;
            const opts = rg.getOptions?.() || [];
            const sel = rg.getSelected?.() || "";
            return { name, type: "radio", value: sel, options: opts };
          } catch { return { name, type: "radio", value: "", options: [] }; }
        }
        return { name, type: "unknown", value: "" };
      });

      setFields(parsed);
      const initial: Record<string, string> = {};
      parsed.forEach((f) => { initial[f.name] = f.value; });
      setValues(initial);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read PDF form fields");
    } finally {
      setLoading(false);
    }
  }, []);

  const setValue = (name: string, val: string) =>
    setValues((prev) => ({ ...prev, [name]: val }));

  const handleSave = async () => {
    if (!originalBytes) return;
    setSaving(true);
    try {
      const doc = await PDFDocument.load(originalBytes, { ignoreEncryption: true });
      const form = doc.getForm();

      for (const field of fields) {
        try {
          const val = values[field.name] ?? "";
          if (field.type === "text" && needsUnicode(val)) {
            await stampUnicodeField(doc, field.name, val);
          } else if (field.type === "text") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (form.getTextField(field.name) as any).setText(val);
          } else if (field.type === "checkbox") {
            const cb = form.getCheckBox(field.name);
            val === "true" ? cb.check() : cb.uncheck();
          } else if (field.type === "dropdown" && val) {
            form.getDropdown(field.name).select(val);
          } else if (field.type === "radio" && val) {
            form.getRadioGroup(field.name).select(val);
          }
        } catch { /* skip unwriteable fields */ }
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${filename}-filled.pdf`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save PDF");
    } finally {
      setSaving(false);
    }
  };

  const filledCount = fields.filter((f) => {
    const v = values[f.name];
    return v && v !== "false";
  }).length;

  return (
    <div className="space-y-5">
      <DropZone
        onFilesAccepted={handleFile}
        accept={{ "application/pdf": [".pdf"] }}
        label="Drop your PDF form here"
        sublabel="PDF with form fields · Click to browse"
      />

      {loading && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 py-10">
          <svg className="h-5 w-5 animate-spin text-brand-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          <span className="text-sm text-slate-500">Reading form fields…</span>
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-200">{error}</p>}

      {noFields && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 text-center">
          <p className="text-sm font-semibold text-amber-700">No fillable form fields found</p>
          <p className="mt-1 text-xs text-amber-600">This PDF does not contain interactive form fields. Try a different PDF.</p>
        </div>
      )}

      {fields.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              {fields.length} field{fields.length !== 1 ? "s" : ""} found
              <span className="ml-2 text-xs font-normal text-slate-400">· {filledCount} filled</span>
            </p>
            <button onClick={() => setValues(Object.fromEntries(fields.map((f) => [f.name, ""])))}
              className="text-xs text-slate-400 hover:text-slate-600">Clear all</button>
          </div>

          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.name} className="rounded-xl border border-slate-200 bg-white p-4">
                <label className="block mb-1.5 text-xs font-semibold text-slate-600 truncate" title={field.name}>
                  {field.name}
                  <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-normal text-slate-400 capitalize">{field.type}</span>
                </label>

                {field.type === "text" && (
                  <input
                    type="text"
                    value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    placeholder={`Enter ${field.name}…`}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                  />
                )}

                {field.type === "checkbox" && (
                  <label className="flex cursor-pointer items-center gap-2">
                    <div className={`relative h-5 w-9 rounded-full transition-colors ${values[field.name] === "true" ? "bg-brand-600" : "bg-slate-200"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${values[field.name] === "true" ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                    <span className="text-sm text-slate-600">{values[field.name] === "true" ? "Checked" : "Unchecked"}</span>
                    <input type="checkbox" className="sr-only"
                      checked={values[field.name] === "true"}
                      onChange={(e) => setValue(field.name, e.target.checked ? "true" : "false")} />
                  </label>
                )}

                {(field.type === "dropdown") && field.options && (
                  <select value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100">
                    <option value="">— Select —</option>
                    {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                )}

                {field.type === "radio" && field.options && (
                  <div className="flex flex-wrap gap-3">
                    {field.options.map((o) => (
                      <label key={o} className="flex cursor-pointer items-center gap-1.5">
                        <input type="radio" name={field.name} value={o}
                          checked={values[field.name] === o}
                          onChange={() => setValue(field.name, o)}
                          className="accent-brand-600" />
                        <span className="text-sm text-slate-600">{o}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "unknown" && (
                  <p className="text-xs text-slate-400 italic">This field type cannot be edited</p>
                )}
              </div>
            ))}
          </div>

          <button onClick={handleSave} disabled={saving}
            className="btn-primary w-full">
            {saving ? (
              <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving…</>
            ) : (
              <><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m-4-4l4 4 4-4" /></svg>Download Filled PDF</>
            )}
          </button>
        </>
      )}
    </div>
  );
}
