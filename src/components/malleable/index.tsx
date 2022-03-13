import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type FieldEdit = { id: string; innerText: string };

export type ValidElementTypes =
  | 'p'
  | 'div'
  | 'span'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'pre';

const SlateWrapper = React.lazy(() => import('./editor'));

function PreloadSlateWrapper() {
  const el = useMemo(() => {
    // This doesn't actually need to be in the DOM
    const el = document.createElement('div');
    el.setAttribute('hidden', 'hidden');
    return el;
  }, []);

  return createPortal(
    <Suspense fallback={null}>
      <SlateWrapper As="div" id="" className="" initialText="" noop />
    </Suspense>,
    el
  );
}

export default function Malleable({
  id,
  isActive,
  children,
  as: As = 'p',
  className,
  edits,
}: {
  id: string;
  isActive: boolean;
  children: React.ReactNode;
  as?: ValidElementTypes;
  className?: string;
  edits: FieldEdit[];
}) {
  const editedChildren = useMemo(
    () => edits?.find((c) => c?.id === id)?.innerText || children,
    [edits, children, id]
  );

  const contentRef = useRef<HTMLElement>();
  const [initialText, setInitialText] = useState<string>('');
  useEffect(() => {
    if (isActive || !contentRef.current) return;
    setInitialText(contentRef.current.innerText);
  }, [editedChildren, isActive, contentRef.current]);

  if (As === 'p') {
    As = 'div';
    className += ' p';
  } else if (As === 'span') {
    className += ' span';
  }

  if (isActive) {
    return (
      <Suspense
        fallback={
          <As
            ref={contentRef as any}
            className={className + ' text-muted'}
            id={id}
          >
            {editedChildren}
          </As>
        }
      >
        <SlateWrapper
          As={As}
          id={id}
          className={className}
          initialText={initialText}
        />
      </Suspense>
    );
  }
  return (
    <>
      <As ref={contentRef as any} className={className} id={id}>
        {editedChildren}
      </As>
      {
        // Detect application hydration
        initialText !== '' && (
          // Prerender the Slate editor to trigger `React.lazy` loading (thereby
          // skipping fallback state)
          <PreloadSlateWrapper />
        )
      }
    </>
  );
}
