"use client";

import { useMemo, useState } from "react";
import { GenreCard } from "@/components/GenreCard";
import { GenreTree } from "@/components/GenreTree";
import { NodePlayer } from "@/components/NodePlayer";
import { getNode, getParent, getRoot } from "@/lib/tree";
import type { TreeData, TreeNode } from "@/lib/types";

export function Explorer({ data }: { data: TreeData }) {
  const root = useMemo(() => getRoot(data.nodes), [data.nodes]);
  const [selectedId, setSelectedId] = useState(root.id);
  const [pauseParent, setPauseParent] = useState(0);
  const [pauseChild, setPauseChild] = useState(0);

  const selected = getNode(data.nodes, selectedId) ?? root;
  const parent = getParent(data.nodes, selected);

  return (
    <div className="shell">
      <header className="masthead">
        <div>
          <p className="eyebrow">曲风分支 · Genre Tree</p>
          <h1>{data.melody.title}</h1>
          <p className="lede">{data.melody.titleEn} 的曲风变体树。点节点试听，对比父 / 子版本。</p>
        </div>
        <p className="badge">纯展示 · 不接生成 API</p>
      </header>

      <div className="workspace">
        <section className="grove" aria-labelledby="tree-heading">
          <div className="section-head">
            <h2 id="tree-heading">分支树</h2>
            <p>从原曲往下长出不同曲风。再深一层时，同一套树组件可以继续往下挂。</p>
          </div>
          <GenreTree
            nodes={data.nodes}
            root={root}
            selectedId={selected.id}
            onSelect={setSelectedId}
          />
        </section>

        <aside className="lectern" aria-live="polite">
          <SelectedPanel
            selected={selected}
            parent={parent}
            pauseParent={pauseParent}
            pauseChild={pauseChild}
            onPlaySelected={() => setPauseParent((value) => value + 1)}
            onPlayParent={() => setPauseChild((value) => value + 1)}
          />
        </aside>
      </div>
    </div>
  );
}

function SelectedPanel({
  selected,
  parent,
  pauseParent,
  pauseChild,
  onPlaySelected,
  onPlayParent,
}: {
  selected: TreeNode;
  parent: TreeNode | undefined;
  pauseParent: number;
  pauseChild: number;
  onPlaySelected: () => void;
  onPlayParent: () => void;
}) {
  return (
    <>
      <div className="section-head">
        <h2>试听与对照</h2>
        <p>
          {parent
            ? "当前节点与父节点可分别播放，一边响起时另一边会停。"
            : "这是根节点，没有父版本可对照。"}
        </p>
      </div>

      <NodePlayer
        node={selected}
        caption="当前节点 / Now playing"
        onPlay={onPlaySelected}
        pauseToken={pauseChild}
      />

      {parent ? (
        <NodePlayer
          node={parent}
          caption="父节点对照 / Parent"
          onPlay={onPlayParent}
          pauseToken={pauseParent}
        />
      ) : null}

      <GenreCard card={selected.card} />
    </>
  );
}
