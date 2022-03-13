import { Dialog } from '@reach/dialog';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';
import styles from './ShareLinkDialog.module.css';

export function ShareLinkDialog({
  snapshotId,
  onExit,
}: {
  snapshotId: string;
  onExit: () => void;
}) {
  const shareUrl = `${window.origin}/s/${encodeURI(snapshotId)}`;

  const [didCopy, setCopied] = useState(false);
  const copyShareUrl = useCallback(() => {
    copy(shareUrl);
    setCopied(true);
  }, [shareUrl, setCopied]);

  return (
    <Dialog isOpen onDismiss={onExit} className={styles.dialog}>
      <div className="p">
        You can now share your edits with anyone:
        <br />
        <pre>{shareUrl}</pre>
      </div>
      <div className="p">
        What happened?
        <ul>
          <li>
            The page you first loaded is fully static and built with{' '}
            <a
              target="_blank"
              rel="noopener"
              href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props"
            >
              Next.js SSG
            </a>
            .
          </li>
          <li>
            Additionally, Next.js gave us the ability to generate <em>new</em>{' '}
            versions of that page at runtime, which we used to generate
            previews.
          </li>
        </ul>
      </div>
      <div data-cta>
        <a href="javascript:void(0)" onClick={onExit}>
          Dismiss
        </a>
        <a
          target="_blank"
          rel="noopener"
          href="https://nextjs.org/docs/advanced-features/preview-mode"
        >
          Learn More
        </a>
        <button onClick={copyShareUrl}>
          {didCopy ? 'Copied' : 'Copy URL'}
        </button>
      </div>
    </Dialog>
  );
}
