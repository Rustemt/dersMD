import { ModuleShell } from "@/components/module-shell";
import { SinifQuizClient } from "./sinif-client";

export default function SinifQuizPage() {
  return (
    <ModuleShell
      title="Sınıf quiz paneli"
      lede="Öğretmen oda açar, öğrenciler kod ile girer. Aynı sunucu oturumunda canlıdır."
    >
      <SinifQuizClient />
    </ModuleShell>
  );
}
