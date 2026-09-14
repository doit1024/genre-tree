"use client";

import { useEffect, useRef } from "react";
import type { TreeNode } from "@/lib/types";

type NodePlayerProps = {
  node: TreeNode;
  caption?: string;
  onPlay?: () => void;
  pauseToken?: number;
};

export function NodePlayer({
  node,
  caption,
  onPlay,
  pauseToken = 0,
}: NodePlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current?.pause();
  }, [pauseToken]);

  return (
    <div className="deck">
      {caption ? <p className="eyebrow">{caption}</p> : null}
      <p className="deck-title">{node.title}</p>
      <p className="deck-style">{node.style}</p>
      <audio
        ref={audioRef}
        key={node.audioPath}
        className="deck-audio"
        controls
        preload="metadata"
        src={node.audioPath}
        onPlay={onPlay}
      >
        你的浏览器不支持 HTML5 audio。
      </audio>
    </div>
  );
}
