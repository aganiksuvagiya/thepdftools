type ReferenceLink = {
  href: string;
  label: string;
};

export default function SeoReferences({
  links,
  title = "References",
}: {
  links: ReferenceLink[];
  title?: string;
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-700 hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
