import { useCallback, useEffect, useMemo, useState } from 'react';

// Tracks per-lesson interaction state. Resets when the lesson key changes
// (e.g. when the user navigates to a different lesson). This is purely
// in-memory — refresh wipes it, consistent with the rest of the demo.
//
// Each block carries a `interacted: boolean` flag plus a free-form
// `data` slot that block renderers use for their own state (video time,
// code-editor draft, quiz answer, etc.).
export function useLessonState(lessonKey, contentBlocks) {
  const [activeBlockIdx, setActiveBlockIdx] = useState(0);
  const [blocks, setBlocks] = useState(() => seedBlocks(contentBlocks));

  // Reset when the lesson changes so we don't leak state across lessons.
  useEffect(() => {
    setActiveBlockIdx(0);
    setBlocks(seedBlocks(contentBlocks));
  }, [lessonKey, contentBlocks]);

  const updateBlockState = useCallback((blockId, partial) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === blockId ? { ...b, ...partial, data: { ...b.data, ...(partial.data || {}) } } : b
      )
    );
  }, []);

  const markBlockInteracted = useCallback((blockId) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === blockId ? { ...b, interacted: true } : b))
    );
  }, []);

  const lessonProgress = useMemo(() => {
    if (!blocks.length) return 0;
    const done = blocks.filter((b) => b.interacted).length;
    return done / blocks.length;
  }, [blocks]);

  const canMarkComplete = lessonProgress >= 0.8;

  const advance = useCallback(() => {
    setActiveBlockIdx((idx) => Math.min(idx + 1, contentBlocks.length - 1));
  }, [contentBlocks.length]);

  const retreat = useCallback(() => {
    setActiveBlockIdx((idx) => Math.max(idx - 1, 0));
  }, []);

  return {
    activeBlockIdx,
    setActiveBlockIdx,
    blocks,
    updateBlockState,
    markBlockInteracted,
    lessonProgress,
    canMarkComplete,
    advance,
    retreat,
  };
}

function seedBlocks(content) {
  return content.map((c) => ({
    id: c.id,
    type: c.type,
    interacted: false,
    data: {},
  }));
}
