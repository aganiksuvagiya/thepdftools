"use client";

import { useState, useMemo } from "react";
import { jsPDF } from "jspdf";

type Currency = "USD" | "EUR" | "GBP" | "INR";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\u00A3",
  INR: "\u20B9",
};

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

function generateInvoiceNumber() {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const r = Math.floor(1000 + Math.random() * 9000);
  return `INV-${y}${m}-${r}`;
}

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d + "T00:00:00");
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function InvoiceGeneratorClient() {
  // From
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromAddress, setFromAddress] = useState("");

  // To
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [toAddress, setToAddress] = useState("");

  // Invoice details
  const [invoiceNumber] = useState(generateInvoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState("");

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
  ]);

  // Footer
  const [notes, setNotes] = useState("");
  const [taxPercent, setTaxPercent] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  // Currency
  const [currency, setCurrency] = useState<Currency>("USD");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sym = CURRENCY_SYMBOLS[currency];

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity * it.rate, 0),
    [items]
  );
  const taxAmount = useMemo(() => (subtotal * taxPercent) / 100, [subtotal, taxPercent]);
  const total = useMemo(() => subtotal + taxAmount - discount, [subtotal, taxAmount, discount]);

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const canGenerate = fromName.trim() && toName.trim() && items.some((it) => it.description.trim());

  const handleGenerate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentW = pageW - margin * 2;

      // --- Header ---
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text(fromName, margin, 30);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      if (fromEmail) doc.text(fromEmail, margin, 37);
      const fromAddrLines = doc.splitTextToSize(fromAddress, contentW / 2) as string[];
      let y = fromEmail ? 43 : 37;
      if (fromAddress) {
        doc.text(fromAddrLines, margin, y);
        y += fromAddrLines.length * 5;
      }

      // Invoice title on the right
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(79, 70, 229);
      doc.text("INVOICE", pageW - margin, 30, { align: "right" });

      // Invoice details on the right
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      const detailsX = pageW - margin;
      doc.text(`Invoice #: ${invoiceNumber}`, detailsX, 40, { align: "right" });
      doc.text(`Date: ${formatDate(invoiceDate)}`, detailsX, 46, { align: "right" });
      if (dueDate) {
        doc.text(`Due Date: ${formatDate(dueDate)}`, detailsX, 52, { align: "right" });
      }

      // --- Divider ---
      const dividerY = Math.max(y + 5, 60);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, dividerY, pageW - margin, dividerY);

      // --- Bill To ---
      let billY = dividerY + 10;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 150, 150);
      doc.text("BILL TO", margin, billY);
      billY += 6;

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(toName, margin, billY);
      billY += 5;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      if (toEmail) {
        doc.text(toEmail, margin, billY);
        billY += 5;
      }
      if (toAddress) {
        const toAddrLines = doc.splitTextToSize(toAddress, contentW / 2) as string[];
        doc.text(toAddrLines, margin, billY);
        billY += toAddrLines.length * 5;
      }

      // --- Items Table ---
      let tableY = billY + 10;

      // Table header
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, tableY - 4, contentW, 10, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100, 100, 100);
      doc.text("DESCRIPTION", margin + 3, tableY + 2);
      doc.text("QTY", margin + contentW * 0.55, tableY + 2, { align: "center" });
      doc.text("RATE", margin + contentW * 0.72, tableY + 2, { align: "right" });
      doc.text("AMOUNT", margin + contentW - 3, tableY + 2, { align: "right" });

      tableY += 10;

      // Table rows
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);

      for (const item of items) {
        if (!item.description.trim()) continue;
        const amount = item.quantity * item.rate;
        const descLines = doc.splitTextToSize(item.description, contentW * 0.5) as string[];
        doc.text(descLines, margin + 3, tableY + 2);
        doc.text(String(item.quantity), margin + contentW * 0.55, tableY + 2, { align: "center" });
        doc.text(`${sym}${item.rate.toFixed(2)}`, margin + contentW * 0.72, tableY + 2, { align: "right" });
        doc.text(`${sym}${amount.toFixed(2)}`, margin + contentW - 3, tableY + 2, { align: "right" });

        const rowH = Math.max(descLines.length * 5, 7);
        tableY += rowH + 3;

        // Row separator
        doc.setDrawColor(240, 240, 240);
        doc.setLineWidth(0.3);
        doc.line(margin, tableY - 1, pageW - margin, tableY - 1);
      }

      // --- Totals ---
      tableY += 6;
      const totalsX = margin + contentW * 0.65;
      const totalsValX = margin + contentW - 3;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text("Subtotal", totalsX, tableY);
      doc.setTextColor(50, 50, 50);
      doc.text(`${sym}${subtotal.toFixed(2)}`, totalsValX, tableY, { align: "right" });

      if (taxPercent > 0) {
        tableY += 7;
        doc.setTextColor(100, 100, 100);
        doc.text(`Tax (${taxPercent}%)`, totalsX, tableY);
        doc.setTextColor(50, 50, 50);
        doc.text(`${sym}${taxAmount.toFixed(2)}`, totalsValX, tableY, { align: "right" });
      }

      if (discount > 0) {
        tableY += 7;
        doc.setTextColor(100, 100, 100);
        doc.text("Discount", totalsX, tableY);
        doc.setTextColor(50, 50, 50);
        doc.text(`-${sym}${discount.toFixed(2)}`, totalsValX, tableY, { align: "right" });
      }

      // Total line
      tableY += 4;
      doc.setDrawColor(79, 70, 229);
      doc.setLineWidth(0.8);
      doc.line(totalsX - 2, tableY, totalsValX + 2, tableY);
      tableY += 7;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(79, 70, 229);
      doc.text("Total", totalsX, tableY);
      doc.text(`${sym}${total.toFixed(2)}`, totalsValX, tableY, { align: "right" });

      // --- Notes ---
      if (notes.trim()) {
        tableY += 16;
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(150, 150, 150);
        doc.text("NOTES", margin, tableY);
        tableY += 6;
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        const noteLines = doc.splitTextToSize(notes, contentW) as string[];
        doc.text(noteLines, margin, tableY);
      }

      doc.save(`invoice-${invoiceNumber}.pdf`);
    } catch {
      setError("Failed to generate invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Currency selector */}
      <div className="flex items-center justify-end gap-3">
        <label className={labelClass}>Currency</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (&euro;)</option>
          <option value="GBP">GBP (&pound;)</option>
          <option value="INR">INR (&#8377;)</option>
        </select>
      </div>

      {/* From / To */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* From */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            From
          </h3>
          <div className="space-y-2">
            <label className={labelClass}>Company / Your Name</label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="Your company or name"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="your@email.com"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Address</label>
            <textarea
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              placeholder="Street, City, Country"
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>
        </div>

        {/* To */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Bill To
          </h3>
          <div className="space-y-2">
            <label className={labelClass}>Client Name</label>
            <input
              type="text"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              placeholder="Client or company name"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Client Email</label>
            <input
              type="email"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="client@email.com"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Client Address</label>
            <textarea
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="Street, City, Country"
              rows={2}
              className={inputClass + " resize-none"}
            />
          </div>
        </div>
      </div>

      {/* Invoice details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className={labelClass}>Invoice #</label>
          <input type="text" value={invoiceNumber} readOnly className={inputClass + " bg-gray-100 cursor-not-allowed"} />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Date</label>
          <input
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className={labelClass}>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Items Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Items
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="pb-2 pr-2">Description</th>
                <th className="pb-2 px-2 w-20 text-center">Qty</th>
                <th className="pb-2 px-2 w-28 text-right">Rate ({sym})</th>
                <th className="pb-2 px-2 w-28 text-right">Amount</th>
                <th className="pb-2 pl-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="py-2 pr-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      className={inputClass}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", Math.max(1, Number(e.target.value)))}
                      className={inputClass + " text-center"}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={item.rate || ""}
                      onChange={(e) => updateItem(item.id, "rate", Math.max(0, Number(e.target.value)))}
                      placeholder="0.00"
                      className={inputClass + " text-right"}
                    />
                  </td>
                  <td className="py-2 px-2 text-right font-medium text-slate-700">
                    {sym}{(item.quantity * item.rate).toFixed(2)}
                  </td>
                  <td className="py-2 pl-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addItem} className="btn-secondary text-sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Item
        </button>
      </div>

      {/* Footer: Tax, Discount, Notes */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className={labelClass}>Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Payment terms, thank you note, etc."
            rows={3}
            className={inputClass + " resize-none"}
          />
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={labelClass}>Tax %</label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={taxPercent || ""}
                onChange={(e) => setTaxPercent(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label className={labelClass}>Discount ({sym})</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={discount || ""}
                onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                placeholder="0.00"
                className={inputClass}
              />
            </div>
          </div>

          {/* Totals summary */}
          <div className="space-y-2 rounded-xl bg-slate-50 p-4">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{sym}{subtotal.toFixed(2)}</span>
            </div>
            {taxPercent > 0 && (
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax ({taxPercent}%)</span>
                <span>{sym}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-sm text-slate-600">
                <span>Discount</span>
                <span>-{sym}{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-brand-700">
              <span>Total</span>
              <span>{sym}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loading || !canGenerate}
          className="btn-primary flex-1"
        >
          {loading ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            "Generate Invoice"
          )}
        </button>
        <button
          onClick={() => {
            setFromName(""); setFromEmail(""); setFromAddress("");
            setToName(""); setToEmail(""); setToAddress("");
            setItems([{ id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 }]);
            setNotes(""); setTaxPercent(0); setDiscount(0);
          }}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
