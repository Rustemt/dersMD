import { ModuleShell } from "@/components/module-shell";
import { DefterClient } from "./defter-client";

export default function DefterPage() {
  return (
    <ModuleShell
      title="Markdown ders defteri"
      lede="Sol tarafa not yaz; sağda HTML önizleme anında güncellenir."
    >
      <DefterClient />
    </ModuleShell>
  );
}
