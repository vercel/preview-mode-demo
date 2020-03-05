import { Dialog } from "@reach/dialog";
import copy from "copy-to-clipboard";
import { useCallback, useState } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import styles from "./ShareLinkDialog.module.css";

export function ShareLinkDialog({
  snapshotId,
  onExit
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
        <Popover
          isOpen={didCopy}
          position="bottom"
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor="black"
              arrowSize={5}
            >
              <div className={styles.tooltip}>Copied!</div>
            </ArrowContainer>
          )}
        >
          <pre className={styles.copy} onClick={copyShareUrl}>
            {shareUrl}
          </pre>
        </Popover>
      </div>
      <div className="p">
        What happened?
        <ul>
          <li>
            The page you first loaded is fully static and built with{" "}
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/zeit/next.js/issues/9524"
            >
              Next.js SSG
            </a>
            .
          </li>
          <li>
            Additionally, Next.js gave us the ability to generate <em>new</em>{" "}
            versions of that page at runtime, which we used to generate
            previews.
          </li>
        </ul>
      </div>
      <div data-cta>
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/zeit/next.js/issues/9524"
        >
          Learn More
        </a>
        <button onClick={onExit}>Dismiss</button>
      </div>
    </Dialog>
  );
}
