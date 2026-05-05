"use client";

type AdsterraZoneProps = {
  optionsScript?: string;
  scriptSrc: string;
  className?: string;
  height?: number;
};

export default function AdsterraZone({
  optionsScript,
  scriptSrc,
  className = "",
  height = 90,
}: AdsterraZoneProps) {
  const srcdoc = `<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0;overflow:hidden}</style></head>
<body>
${optionsScript ? `<script>${optionsScript}<\/script>` : ""}
<script src="${scriptSrc}"><\/script>
</body>
</html>`;

  return (
    <div className={className}>
      <iframe
        srcDoc={srcdoc}
        style={{ border: 0, width: "100%", height: `${height}px`, display: "block", overflow: "hidden" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
