import { ModuleShell } from "@/components/module-shell";
import { getTopicMap } from "@/lib/topics";

export default function KonuHaritasiPage() {
  const map = getTopicMap();
  return (
    <ModuleShell
      title="LGS–YKS konu haritası"
      lede="Kazanımları ağaç olarak gör; hangi sınavda çıktığını takip et."
    >
      <div className="tool-block">
        <p className="eyebrow">{map.title}</p>
        <ul className="topic-tree">
          {map.nodes.map((node) => (
            <li key={node.id}>
              <div className="topic-node">
                <strong>{node.label}</strong>
                <span>{node.exam}</span>
              </div>
              {node.children?.length ? (
                <ul>
                  {node.children.map((child) => (
                    <li key={child.id}>
                      <div className="topic-node child">
                        <strong>{child.label}</strong>
                        <span>{child.exam}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <p className="empty-note">
          Yeni düğüm eklemek için `content/topics/lgs-yks.json` dosyasını düzenle.
        </p>
      </div>
    </ModuleShell>
  );
}
