import React, { useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { ValidElementTypes } from './index';

export default function SlateWrapper({
  As,
  id,
  className,
  initialText,
  noop,
}: {
  As: ValidElementTypes;
  id: string;
  className: string;
  initialText: string;
  noop?: boolean;
}) {
  const originalState = useMemo(
    () => [{ children: [{ text: initialText }] }],
    [initialText]
  );
  const [value, setValue] = useState<Node[]>(originalState);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  if (noop) return null;

  return (
    <As id={id} className={className}>
      <Slate
        editor={editor}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <Editable placeholder={'...'} />
      </Slate>
    </As>
  );
}
