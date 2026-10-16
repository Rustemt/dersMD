import { ModuleShell } from "@/components/module-shell";
import { OdevClient } from "./odev-client";

export default function OdevPage() {
  return (
    <ModuleShell
      title="Ödev toplayıcı"
      lede="Öğrenci teslim eder; öğretmen kontrol listesinde işaretler. Veri bu tarayıcıda tutulur."
    >
      <OdevClient />
    </ModuleShell>
  );
}
