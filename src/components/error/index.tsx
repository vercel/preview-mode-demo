import { Dialog } from '@reach/dialog';
import { ReactNode } from 'react';
import styles from './ErrorDialog.module.css';

export function ErrorDialog({
  children,
  onExit,
}: {
  children: ReactNode;
  onExit: () => void;
}) {
  return (
    <Dialog isOpen onDismiss={onExit} className={styles.dialog}>
      {children}
      <div className={styles.footer}>
        <button type="button" onClick={onExit}>
          OK
        </button>
      </div>
    </Dialog>
  );
}
