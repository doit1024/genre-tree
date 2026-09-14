import { Explorer } from "@/components/Explorer";
import tree from "@/data/tree.json";
import type { TreeData } from "@/lib/types";

export default function Home() {
  return <Explorer data={tree as TreeData} />;
}
