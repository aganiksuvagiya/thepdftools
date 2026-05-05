"use client";

import { usePathname } from "next/navigation";

export default function SidePopupAd() {
  const pathname = usePathname();

  const srcdoc = `<!DOCTYPE html>
<html>
<head><style>*{margin:0;padding:0;overflow:hidden}body{background:transparent}</style></head>
<body>
<script src="https://pl29326575.profitablecpmratenetwork.com/d7/ee/d5/d7eed5555f86f85f375c72554f939983.js"><\/script>
</body>
</html>`;

  return (
    <div className="fixed right-0 top-1/2 z-50 -translate-y-1/2">
      <iframe
        key={pathname}
        srcDoc={srcdoc}
        style={{ border: 0, width: "160px", height: "600px", display: "block" }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-top-navigation-by-user-activation"
      />
    </div>
  );
}
