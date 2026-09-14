import type { TreeNode } from "@/lib/types";

export function getRoot(nodes: TreeNode[]): TreeNode {
  const root = nodes.find((node) => node.parentId === null);
  if (!root) {
    throw new Error("Tree is missing a root node (parentId: null).");
  }
  return root;
}

export function getNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  return nodes.find((node) => node.id === id);
}

export function getChildren(nodes: TreeNode[], parentId: string): TreeNode[] {
  return nodes.filter((node) => node.parentId === parentId);
}

export function getParent(
  nodes: TreeNode[],
  node: TreeNode,
): TreeNode | undefined {
  if (!node.parentId) return undefined;
  return getNode(nodes, node.parentId);
}
