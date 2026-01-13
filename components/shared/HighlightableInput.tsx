"use client";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";

type HighlightType = "who" | "action" | "where" | "why";

const HIGHLIGHT_STYLES: Record<HighlightType, string> = {
  who: "bg-blue-200 text-blue-900",
  action: "bg-yellow-200 text-yellow-900",
  where: "bg-green-200 text-green-900",
  why: "bg-pink-200 text-pink-900",
};

export function HighlightableInput({
  value,
  onChange,
  maxLength = 200,
}: {
  value: string;
  onChange: (html: string) => void;
  maxLength?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<HighlightType | null>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  /** Sync external value → editor */
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const pushHistory = (html: string) => {
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      next.push(html);
      return next;
    });
    setHistoryIndex((i) => i + 1);
  };

  const handleInput = () => {
    const el = editorRef.current;
    if (!el) return;

    if (el.innerText.length > maxLength) return;

    const html = el.innerHTML;
    onChange(html);
    pushHistory(html);
  };

  const applyHighlight = () => {
    if (!activeType) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const span = document.createElement("span");
    span.className = `px-1 rounded-md ${HIGHLIGHT_STYLES[activeType]}`;
    span.dataset.type = activeType;

    try {
      range.surroundContents(span);
      selection.removeAllRanges();

      const html = editorRef.current!.innerHTML;
      onChange(html);
      pushHistory(html);
    } catch {
      // Prevent invalid DOM crashes
    }
  };

  const undo = () => {
    if (historyIndex <= 0) return;
    const prev = history[historyIndex - 1];

    editorRef.current!.innerHTML = prev;
    onChange(prev);
    setHistoryIndex((i) => i - 1);
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];

    editorRef.current!.innerHTML = next;
    onChange(next);
    setHistoryIndex((i) => i + 1);
  };

  const clearHighlights = () => {
    if (!editorRef.current) return;

    const text = editorRef.current.innerText;
    editorRef.current.innerText = text;

    onChange(text);
    setHistory([text]);
    setHistoryIndex(0);
  };

  return (
    <div className="space-y-1">
      {/* Label + Actions */}
      <div className="flex items-center justify-between">
        <Label>Description</Label>

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={undo}
            disabled={historyIndex <= 0}
            className="font-semibold disabled:opacity-40"
          >
            Undo
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="font-semibold disabled:opacity-40"
          >
            Redo
          </button>
          <button
            type="button"
            onClick={clearHighlights}
            className="font-semibold text-red-600 hover:text-red-500 transition"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={applyHighlight}
        className="w-full min-h-[72px] bg-blue-100 border border-blue-800 rounded-md p-3 text-lg focus:outline-none"
        suppressContentEditableWarning
      />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-grey-200">
          Preferably no longer than {maxLength} characters
        </p>

        {/* Legend */}
        <div className="flex gap-2 text-xs bg-blue-100 px-3 py-1 rounded-xl">
          <Legend
            label="Who"
            color="bg-blue-200"
            active={activeType === "who"}
            onClick={() => setActiveType("who")}
          />
          <Legend
            label="Action"
            color="bg-yellow-200"
            active={activeType === "action"}
            onClick={() => setActiveType("action")}
          />
          <Legend
            label="Where"
            color="bg-green-200"
            active={activeType === "where"}
            onClick={() => setActiveType("where")}
          />
          <Legend
            label="Why/For"
            color="bg-pink-200"
            active={activeType === "why"}
            onClick={() => setActiveType("why")}
          />
        </div>
      </div>
    </div>
  );
}

function Legend({
  label,
  color,
  active,
  onClick,
}: {
  label: string;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-0.5 rounded-full border transition ${
        active ? "border-blue-800" : "border-transparent"
      }`}
    >
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{label}</span>
    </button>
  );
}
