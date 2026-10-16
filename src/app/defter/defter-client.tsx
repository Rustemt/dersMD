"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";

const SAMPLE = `# Bugünün notu

## Oran–orantı
- **Doğru orantı:** biri artınca diğeri artar
- **Ters orantı:** biri artınca diğeri azalır

> Formül: \`a/b = c/d\`

1. Verileri yaz
2. Çarpraz çarp
3. Bilinmeyeni bul
`;

export function DefterClient() {
  const [md, setMd] = useState(SAMPLE);
  const html = useMemo(() => marked.parse(md, { async: false }) as string, [md]);

  return (
    <div className="defter-grid">
      <label className="field">
        <span>Markdown</span>
        <textarea value={md} onChange={(e) => setMd(e.target.value)} rows={18} />
      </label>
      <div className="md-preview">
        <p className="eyebrow">Önizleme</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
