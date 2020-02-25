import React, { useEffect, useMemo, useRef, useState } from "react";
import { createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";

export type FieldEdit = { id: string; innerText: string };

export default function Malleable({
  id,
  isActive,
  children,
  as: As = "p",
  className,
  edits
}: {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
  as?: "p" | "div" | "span" | "h1" | "h2" | "h3" | "h4" | "pre";
  className?: string;
  edits: FieldEdit[];
}) {
  const editedChildren = useMemo(
    () => edits?.find(c => c?.id === id)?.innerText || children,
    [edits, children, id]
  );

  const contentRef = useRef<HTMLElement>();
  const [initialText, setInitialText] = useState<string>("");
  useEffect(() => {
    if (isActive || !contentRef.current) return;
    setInitialText(contentRef.current.innerText);
  }, [editedChildren, isActive, contentRef.current]);

  const originalState = useMemo(() => [{ children: [{ text: initialText }] }], [
    initialText
  ]);
  const [value, setValue] = useState<Node[]>(originalState);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    if (isActive) return;

    // Undo changes
    setValue(originalState);

    // Clear history
    editor.history.undos = [];
    editor.history.redos = [];
  }, [
    value, // Catch async edits while not active
    isActive,
    editor.history,
    originalState
  ]);

  if (As === "p") {
    As = "div";
    className += " p";
  } else if (As === "span") {
    className += " span";
  }

  if (isActive) {
    return (
      <As ref={contentRef as any} id={id} className={className}>
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <Editable placeholder={"..."} />
        </Slate>
      </As>
    );
  }
  return (
    <As ref={contentRef as any} className={className} id={id}>
      {editedChildren}
    </As>
  );
}
