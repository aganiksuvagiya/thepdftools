"use client";

export default function SidePopupAd() {
  const srcdoc = `<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0}</style></head>
<body>
<script src="https://pl29326575.profitablecpmratenetwork.com/d7/ee/d5/d7eed5555f86f85f375c72554f939983.js"><\/script>
</body>
</html>`;

  return (
    <iframe
      srcDoc={srcdoc}
      style={{ position: "fixed", bottom: 0, right: 0, width: 0, height: 0, border: 0 }}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
    />
  );
}
