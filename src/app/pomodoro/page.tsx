import { ModuleShell } from "@/components/module-shell";
import { PomodoroClient } from "./pomodoro-client";

export default function PomodoroPage() {
  return (
    <ModuleShell
      title="Pomodoro + hedef"
      lede="25 dk odak, 5 dk mola. Günlük hedef ve streak tarayıcıda saklanır."
    >
      <PomodoroClient />
    </ModuleShell>
  );
}
