import { getChildren } from "@/lib/tree";
import type { TreeNode } from "@/lib/types";

type GenreTreeProps = {
  nodes: TreeNode[];
  root: TreeNode;
  selectedId: string;
  onSelect: (id: string) => void;
};

export function GenreTree({
  nodes,
  root,
  selectedId,
  onSelect,
}: GenreTreeProps) {
  return (
    <div className="tree-frame" role="tree" aria-label="曲风分支树">
      <Branch
        nodes={nodes}
        node={root}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </div>
  );
}

function Branch({
  nodes,
  node,
  selectedId,
  onSelect,
}: {
  nodes: TreeNode[];
  node: TreeNode;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const children = getChildren(nodes, node.id);

  return (
    <div className="gt-branch">
      <button
        type="button"
        role="treeitem"
        aria-selected={selectedId === node.id}
        className={`gt-node${selectedId === node.id ? " is-selected" : ""}`}
        onClick={() => onSelect(node.id)}
      >
        <span className="gt-node-title">{node.title}</span>
        <span className="gt-node-style">{node.style}</span>
      </button>
      {children.length > 0 ? (
        <>
          <span className="gt-stem" aria-hidden="true" />
          <div className="gt-kids">
            {children.map((child) => (
              <div className="gt-kid" key={child.id}>
                <Branch
                  nodes={nodes}
                  node={child}
                  selectedId={selectedId}
                  onSelect={onSelect}
                />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
