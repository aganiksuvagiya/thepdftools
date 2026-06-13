"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

type TemplateId = "modern" | "classic" | "minimal" | "professional" | "creative";

interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  font: "helvetica" | "times";
  accent: [number, number, number];
  nameAlign: "left" | "center";
  headerStyle: "underline" | "bar" | "plain" | "box";
  swatch: string;
}

const TEMPLATES: TemplateConfig[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Indigo accents with underlined section headers.",
    font: "helvetica",
    accent: [79, 70, 229],
    nameAlign: "left",
    headerStyle: "underline",
    swatch: "bg-indigo-500",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Centered header, serif font, traditional layout.",
    font: "times",
    accent: [40, 40, 40],
    nameAlign: "center",
    headerStyle: "plain",
    swatch: "bg-slate-700",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean black & white with generous whitespace.",
    font: "helvetica",
    accent: [100, 100, 100],
    nameAlign: "left",
    headerStyle: "plain",
    swatch: "bg-slate-400",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Navy section bars for a corporate look.",
    font: "helvetica",
    accent: [30, 58, 95],
    nameAlign: "left",
    headerStyle: "bar",
    swatch: "bg-blue-900",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Centered header with teal accent markers.",
    font: "helvetica",
    accent: [13, 148, 136],
    nameAlign: "center",
    headerStyle: "box",
    swatch: "bg-teal-500",
  },
];

function rgbToHex([r, g, b]: [number, number, number]) {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function formatMonth(value: string) {
  if (!value) return "";
  const [y, m] = value.split("-");
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function SectionLabelInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="flex items-center gap-1.5 text-slate-400" title="Edit this section's heading on the PDF">
      <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-40 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-right text-xs font-semibold uppercase tracking-[0.1em] text-slate-600 focus:border-brand-400 focus:bg-white focus:text-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-400"
      />
    </label>
  );
}

function formatDateRange(start: string, end: string, current: boolean) {
  const s = formatMonth(start);
  const e = current ? "Present" : formatMonth(end);
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}

interface ResumePreviewProps {
  template: TemplateConfig;
  photo: string | null;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summaryLabel: string;
  summary: string;
  experienceLabel: string;
  experience: ExperienceItem[];
  educationLabel: string;
  education: EducationItem[];
  skillsLabel: string;
  skills: string[];
}

function ResumePreview({
  template,
  photo,
  fullName,
  jobTitle,
  email,
  phone,
  location,
  website,
  summaryLabel,
  summary,
  experienceLabel,
  experience,
  educationLabel,
  education,
  skillsLabel,
  skills,
}: ResumePreviewProps) {
  const accentColor = `rgb(${template.accent.join(",")})`;
  const accentTint = `rgba(${template.accent.join(",")}, 0.12)`;
  const fontClass = template.font === "times" ? "font-serif" : "font-sans";
  const centered = template.nameAlign === "center";

  const realContactParts = [email, phone, location, website].filter((p) => p.trim());
  const realExpItems = experience.filter((e) => e.position.trim() || e.company.trim());
  const realEduItems = education.filter((e) => e.school.trim() || e.degree.trim());

  const hasAnyContent =
    fullName.trim() ||
    jobTitle.trim() ||
    realContactParts.length > 0 ||
    summary.trim() ||
    realExpItems.length > 0 ||
    realEduItems.length > 0 ||
    skills.length > 0;

  // Show sample data until the user starts filling in the form, so the preview is never empty.
  const displayName = fullName.trim() || (hasAnyContent ? "" : "Alex Morgan");
  const displayTitle = jobTitle.trim() || (hasAnyContent ? "" : "Product Marketing Manager");
  const contactParts = hasAnyContent
    ? realContactParts
    : ["alex.morgan@email.com", "+1 (555) 123-4567", "San Francisco, CA"];
  const displaySummary =
    summary.trim() ||
    (hasAnyContent
      ? ""
      : "Results-driven marketing professional with 6+ years of experience launching products and driving growth for SaaS companies. Skilled in cross-functional collaboration, data-driven strategy, and brand storytelling.");
  const expItems: ExperienceItem[] = hasAnyContent
    ? realExpItems
    : [
        {
          id: "demo-exp",
          position: "Senior Marketing Manager",
          company: "Brightwave Inc.",
          location: "San Francisco, CA",
          startDate: "2021-01",
          endDate: "",
          current: true,
          description:
            "Led go-to-market strategy for 3 major product launches, growing qualified leads by 42% year over year.",
        },
      ];
  const eduItems: EducationItem[] = hasAnyContent
    ? realEduItems
    : [
        {
          id: "demo-edu",
          school: "University of California, Berkeley",
          degree: "B.A.",
          field: "Marketing",
          startDate: "2014-09",
          endDate: "2018-05",
        },
      ];
  const displaySkills = hasAnyContent
    ? skills
    : ["Product Marketing", "SEO", "Data Analysis", "Team Leadership", "Content Strategy"];

  const renderHeading = (title: string) => {
    switch (template.headerStyle) {
      case "bar":
        return (
          <div
            className="mb-2 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
            style={{ backgroundColor: accentColor }}
          >
            {title}
          </div>
        );
      case "box":
        return (
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-800">
            <span className="h-2 w-2 shrink-0" style={{ backgroundColor: accentColor }} />
            {title}
          </div>
        );
      case "plain":
        return (
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: accentColor }}>
            {title}
          </div>
        );
      default:
        return (
          <div
            className="mb-2 border-b-2 pb-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {title}
          </div>
        );
    }
  };

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${fontClass} text-slate-800`}>
      {!hasAnyContent && (
        <div className="mb-4 rounded-lg bg-amber-50 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-700">
          Sample preview — fill in the form to personalize
        </div>
      )}

      {/* Header */}
      <div className={centered ? "flex flex-col items-center text-center" : "flex items-start justify-between gap-4"}>
        {photo && (
          <img
            src={photo}
            alt="Profile"
            className={`h-16 w-16 rounded-full object-cover ${centered ? "order-1 mb-2" : "order-2"}`}
          />
        )}
        <div className={centered ? "order-2" : "order-1"}>
          <h2 className="text-xl font-bold text-slate-900">{displayName || "Your Name"}</h2>
          {displayTitle && (
            <p className="mt-0.5 text-sm font-medium" style={{ color: accentColor }}>
              {displayTitle}
            </p>
          )}
          {contactParts.length > 0 && (
            <p className="mt-1.5 text-[11px] text-slate-500">{contactParts.join("  •  ")}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      {displaySummary && (
        <div className="mt-4">
          {renderHeading(summaryLabel.trim() || "PROFESSIONAL SUMMARY")}
          <p className="text-[11px] leading-5 text-slate-600">{displaySummary}</p>
        </div>
      )}

      {/* Experience */}
      {expItems.length > 0 && (
        <div className="mt-4">
          {renderHeading(experienceLabel.trim() || "WORK EXPERIENCE")}
          <div className="space-y-2">
            {expItems.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-900">
                    {exp.position || "Position"}
                    {exp.company ? ` — ${exp.company}` : ""}
                  </span>
                  <span className="whitespace-nowrap text-[10px] text-slate-400">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.description && <p className="mt-0.5 text-[11px] leading-4 text-slate-600">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {eduItems.length > 0 && (
        <div className="mt-4">
          {renderHeading(educationLabel.trim() || "EDUCATION")}
          <div className="space-y-2">
            {eduItems.map((edu) => (
              <div key={edu.id} className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900">
                  {edu.degree || "Degree"}
                  {edu.field ? ` in ${edu.field}` : ""}
                  {edu.school ? ` — ${edu.school}` : ""}
                </span>
                <span className="whitespace-nowrap text-[10px] text-slate-400">
                  {formatDateRange(edu.startDate, edu.endDate, false)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {displaySkills.length > 0 && (
        <div className="mt-4">
          {renderHeading(skillsLabel.trim() || "SKILLS")}
          <div className="flex flex-wrap gap-1.5">
            {displaySkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-2 py-0.5 text-[10px] font-medium text-slate-700"
                style={{ backgroundColor: accentTint }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ResumeBuilderClient() {
  // Template
  const [templateId, setTemplateId] = useState<TemplateId>("modern");

  // Accent / title color override
  const [accentOverride, setAccentOverride] = useState<string | null>(null);

  // Photo
  const [photo, setPhoto] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  // Section labels
  const [summaryLabel, setSummaryLabel] = useState("PROFESSIONAL SUMMARY");
  const [experienceLabel, setExperienceLabel] = useState("WORK EXPERIENCE");
  const [educationLabel, setEducationLabel] = useState("EDUCATION");
  const [skillsLabel, setSkillsLabel] = useState("SKILLS");

  // Summary
  const [summary, setSummary] = useState("");

  // Experience
  const [experience, setExperience] = useState<ExperienceItem[]>([
    {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  // Education
  const [education, setEducation] = useState<EducationItem[]>([
    {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  ]);

  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const template = TEMPLATES.find((t) => t.id === templateId) ?? TEMPLATES[0];
  const effectiveAccent: [number, number, number] = accentOverride ? hexToRgb(accentOverride) : template.accent;
  const previewTemplate: TemplateConfig = { ...template, accent: effectiveAccent };

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string | boolean) => {
    setExperience((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    if (experience.length === 1) return;
    setExperience((prev) => prev.filter((it) => it.id !== id));
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    setEducation((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      { id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);
  };

  const removeEducation = (id: string) => {
    if (education.length === 1) return;
    setEducation((prev) => prev.filter((it) => it.id !== id));
  };

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value) return;
    setSkills((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const canGenerate = fullName.trim().length > 0;

  const handleGenerate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);

    try {
      const font = template.font;
      const accent = effectiveAccent;

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 18;
      const contentW = pageW - margin * 2;
      let y = margin;

      const checkPageBreak = (needed: number) => {
        if (y + needed > pageH - margin) {
          doc.addPage();
          y = margin;
        }
      };

      const sectionHeader = (title: string) => {
        checkPageBreak(14);
        switch (template.headerStyle) {
          case "bar":
            doc.setFillColor(accent[0], accent[1], accent[2]);
            doc.rect(margin, y - 4.5, contentW, 7, "F");
            doc.setFontSize(10);
            doc.setFont(font, "bold");
            doc.setTextColor(255, 255, 255);
            doc.text(title, margin + 2, y);
            y += 8;
            break;
          case "box":
            doc.setFillColor(accent[0], accent[1], accent[2]);
            doc.rect(margin, y - 3.2, 3, 3, "F");
            doc.setFontSize(11);
            doc.setFont(font, "bold");
            doc.setTextColor(30, 30, 30);
            doc.text(title, margin + 5, y);
            y += 6;
            break;
          case "plain":
            doc.setFontSize(11);
            doc.setFont(font, "bold");
            doc.setTextColor(30, 30, 30);
            doc.text(title, margin, y);
            y += 1.5;
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.3);
            doc.line(margin, y, pageW - margin, y);
            y += 6;
            break;
          case "underline":
          default:
            doc.setFontSize(11);
            doc.setFont(font, "bold");
            doc.setTextColor(accent[0], accent[1], accent[2]);
            doc.text(title, margin, y);
            y += 1.5;
            doc.setDrawColor(accent[0], accent[1], accent[2]);
            doc.setLineWidth(0.6);
            doc.line(margin, y, pageW - margin, y);
            y += 6;
            break;
        }
      };

      // --- Header ---
      const centered = template.nameAlign === "center";
      const nameX = centered ? pageW / 2 : margin;
      const textOpts = centered ? ({ align: "center" } as const) : undefined;

      // --- Photo ---
      if (photo) {
        const format = photo.startsWith("data:image/png")
          ? "PNG"
          : photo.startsWith("data:image/webp")
          ? "WEBP"
          : "JPEG";
        const photoSize = 24;
        if (centered) {
          doc.addImage(photo, format, pageW / 2 - photoSize / 2, y, photoSize, photoSize);
          doc.setDrawColor(accent[0], accent[1], accent[2]);
          doc.setLineWidth(0.6);
          doc.rect(pageW / 2 - photoSize / 2, y, photoSize, photoSize);
          y += photoSize + 6;
        } else {
          doc.addImage(photo, format, pageW - margin - photoSize, margin, photoSize, photoSize);
          doc.setDrawColor(accent[0], accent[1], accent[2]);
          doc.setLineWidth(0.6);
          doc.rect(pageW - margin - photoSize, margin, photoSize, photoSize);
        }
      }

      doc.setFontSize(24);
      doc.setFont(font, "bold");
      doc.setTextColor(30, 30, 30);
      doc.text(fullName, nameX, y + 6, textOpts);
      y += 9;

      if (jobTitle.trim()) {
        doc.setFontSize(12);
        doc.setFont(font, "normal");
        doc.setTextColor(accent[0], accent[1], accent[2]);
        doc.text(jobTitle, nameX, y, textOpts);
        y += 7;
      }

      const contactParts = [email, phone, location, website].map((s) => s.trim()).filter(Boolean);
      if (contactParts.length) {
        doc.setFontSize(9);
        doc.setFont(font, "normal");
        doc.setTextColor(100, 100, 100);
        const contactLines = doc.splitTextToSize(contactParts.join("   |   "), contentW) as string[];
        doc.text(contactLines, nameX, y, textOpts);
        y += contactLines.length * 5;
      }

      y += 3;
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 8;

      // --- Summary ---
      if (summary.trim()) {
        sectionHeader(summaryLabel.trim() || "PROFESSIONAL SUMMARY");
        doc.setFontSize(10);
        doc.setFont(font, "normal");
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(summary.trim(), contentW) as string[];
        checkPageBreak(lines.length * 5);
        doc.text(lines, margin, y);
        y += lines.length * 5 + 8;
      }

      // --- Experience ---
      const experienceEntries = experience.filter((e) => e.position.trim() || e.company.trim());
      if (experienceEntries.length) {
        sectionHeader(experienceLabel.trim() || "WORK EXPERIENCE");
        for (const exp of experienceEntries) {
          checkPageBreak(12);
          doc.setFontSize(11);
          doc.setFont(font, "bold");
          doc.setTextColor(30, 30, 30);
          doc.text(exp.position || "Position", margin, y);

          const dateStr = formatDateRange(exp.startDate, exp.endDate, exp.current);
          if (dateStr) {
            doc.setFontSize(9);
            doc.setFont(font, "normal");
            doc.setTextColor(100, 100, 100);
            doc.text(dateStr, pageW - margin, y, { align: "right" });
          }
          y += 5;

          const companyLine = [exp.company, exp.location].map((s) => s.trim()).filter(Boolean).join("  —  ");
          if (companyLine) {
            doc.setFontSize(10);
            doc.setFont(font, "italic");
            doc.setTextColor(80, 80, 80);
            doc.text(companyLine, margin, y);
            y += 5.5;
          }

          const bullets = exp.description.split("\n").map((s) => s.trim()).filter(Boolean);
          doc.setFont(font, "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(60, 60, 60);
          for (const bullet of bullets) {
            const lines = doc.splitTextToSize(`•  ${bullet}`, contentW - 4) as string[];
            checkPageBreak(lines.length * 4.8);
            doc.text(lines, margin + 2, y);
            y += lines.length * 4.8;
          }
          y += 5;
        }
      }

      // --- Education ---
      const educationEntries = education.filter((e) => e.school.trim() || e.degree.trim());
      if (educationEntries.length) {
        sectionHeader(educationLabel.trim() || "EDUCATION");
        for (const edu of educationEntries) {
          checkPageBreak(11);
          const degreeLine = [edu.degree, edu.field].map((s) => s.trim()).filter(Boolean).join(", ");
          doc.setFontSize(11);
          doc.setFont(font, "bold");
          doc.setTextColor(30, 30, 30);
          doc.text(degreeLine || "Degree", margin, y);

          const dateStr = formatDateRange(edu.startDate, edu.endDate, false);
          if (dateStr) {
            doc.setFontSize(9);
            doc.setFont(font, "normal");
            doc.setTextColor(100, 100, 100);
            doc.text(dateStr, pageW - margin, y, { align: "right" });
          }
          y += 5;

          if (edu.school.trim()) {
            doc.setFontSize(10);
            doc.setFont(font, "italic");
            doc.setTextColor(80, 80, 80);
            doc.text(edu.school.trim(), margin, y);
            y += 5.5;
          }
          y += 2.5;
        }
      }

      // --- Skills ---
      if (skills.length) {
        sectionHeader(skillsLabel.trim() || "SKILLS");
        doc.setFontSize(10);
        doc.setFont(font, "normal");
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(skills.join("   •   "), contentW) as string[];
        checkPageBreak(lines.length * 5);
        doc.text(lines, margin, y);
        y += lines.length * 5;
      }

      const safeName = fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      doc.save(`resume-${safeName || "untitled"}.pdf`);
    } catch {
      setError("Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setTemplateId("modern");
    setAccentOverride(null);
    setPhoto(null);
    setSummaryLabel("PROFESSIONAL SUMMARY");
    setExperienceLabel("WORK EXPERIENCE");
    setEducationLabel("EDUCATION");
    setSkillsLabel("SKILLS");
    setFullName("");
    setJobTitle("");
    setEmail("");
    setPhone("");
    setLocation("");
    setWebsite("");
    setSummary("");
    setExperience([
      {
        id: crypto.randomUUID(),
        position: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
    setEducation([
      { id: crypto.randomUUID(), school: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);
    setSkills([]);
    setSkillInput("");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400";
  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
    <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Template Selector */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Resume Template
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => setTemplateId(tpl.id)}
              className={
                "rounded-2xl border p-3 text-left transition-colors " +
                (templateId === tpl.id
                  ? "border-brand-400 bg-brand-50 ring-1 ring-brand-400"
                  : "border-slate-200 bg-white hover:border-brand-200")
              }
            >
              <span className={`block h-2 w-8 rounded-full ${tpl.swatch}`} />
              <span className="mt-2 block text-sm font-semibold text-slate-900">{tpl.name}</span>
              <span className="mt-1 block text-xs leading-4 text-slate-500">{tpl.description}</span>
            </button>
          ))}
        </div>

        {/* Title / accent color picker */}
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
          <label htmlFor="accent-color" className="text-sm font-medium text-gray-700">
            Title Color
          </label>
          <input
            id="accent-color"
            type="color"
            value={rgbToHex(effectiveAccent)}
            onChange={(e) => setAccentOverride(e.target.value)}
            className="h-8 w-12 cursor-pointer rounded border border-slate-200 bg-white p-0.5"
          />
          {accentOverride && (
            <button
              type="button"
              onClick={() => setAccentOverride(null)}
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Reset to template color
            </button>
          )}
        </div>
      </div>

      {/* Personal Info */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
          Personal Information
        </h3>
        <div className="flex items-center gap-4">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Profile preview" className="h-16 w-16 rounded-xl object-cover ring-1 ring-slate-200" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
          )}
          <div className="space-y-1">
            <label className={labelClass + " block"}>Profile Photo (optional)</label>
            <div className="flex items-center gap-2">
              <label className="btn-secondary cursor-pointer text-sm">
                {photo ? "Change Photo" : "Upload Photo"}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handlePhotoChange} className="hidden" />
              </label>
              {photo && (
                <button onClick={() => setPhoto(null)} className="text-sm font-medium text-slate-500 hover:text-red-500">
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Professional Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Software Engineer"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@email.com"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 8900"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Website / LinkedIn</label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="linkedin.com/in/janedoe"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Professional Summary
          </h3>
          <SectionLabelInput value={summaryLabel} onChange={setSummaryLabel} />
        </div>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="A brief 2-3 sentence overview of your experience and strengths."
          rows={3}
          className={inputClass + " resize-none"}
        />
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Work Experience
          </h3>
          <SectionLabelInput value={experienceLabel} onChange={setExperienceLabel} />
        </div>
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Position {index + 1}</span>
                <button
                  onClick={() => removeExperience(exp.id)}
                  disabled={experience.length === 1}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                  placeholder="Job Title"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company Name"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="Location (optional)"
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    disabled={exp.current}
                    className={inputClass + (exp.current ? " opacity-50 cursor-not-allowed" : "")}
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400"
                />
                I currently work here
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                placeholder={"Key responsibilities and achievements, one per line\ne.g. Led a team of 5 engineers to ship feature X"}
                rows={3}
                className={inputClass + " resize-none"}
              />
            </div>
          ))}
        </div>
        <button onClick={addExperience} className="btn-secondary text-sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Education
          </h3>
          <SectionLabelInput value={educationLabel} onChange={setEducationLabel} />
        </div>
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Education {index + 1}</span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  disabled={education.length === 1}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                  placeholder="School / University"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Degree (e.g. Bachelor of Science)"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                  placeholder="Field of Study (optional)"
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={addEducation} className="btn-secondary text-sm">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Skills
          </h3>
          <SectionLabelInput value={skillsLabel} onChange={setSkillsLabel} />
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="e.g. JavaScript (press Enter to add)"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addSkill}
            disabled={!skillInput.trim()}
            className="btn-secondary shrink-0 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add
          </button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                  className="text-brand-400 transition hover:text-brand-700"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}
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
            "Generate Resume PDF"
          )}
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Clear
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>

    {/* Live Preview */}
    <div className="lg:sticky lg:top-6">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        Live Preview
      </h3>
      <ResumePreview
        template={previewTemplate}
        photo={photo}
        fullName={fullName}
        jobTitle={jobTitle}
        email={email}
        phone={phone}
        location={location}
        website={website}
        summaryLabel={summaryLabel}
        summary={summary}
        experienceLabel={experienceLabel}
        experience={experience}
        educationLabel={educationLabel}
        education={education}
        skillsLabel={skillsLabel}
        skills={skills}
      />
    </div>
    </div>
  );
}
