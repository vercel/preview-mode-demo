import { useEffect } from 'react';
import CancelSvg from '../svgs/cancel';
import ShareSvg from '../svgs/share';
import styles from './index.module.css';

export default function Cancel({ onCancel, onShare, isSharing }) {
  useEffect(() => {
    function listener(e: KeyboardEvent) {
      if (e.metaKey && e.key === 'Enter') {
        onShare();
      }
    }
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [onShare]);

  return (
    <div className={styles.group}>
      {!isSharing && (
        <div className={styles.cancel} onClick={onCancel}>
          <CancelSvg />
        </div>
      )}
      <div
        className={`${styles.share} ${isSharing ? styles['pending-bg'] : ''}`}
        onClick={onShare}
        style={isSharing ? { pointerEvents: 'none' } : {}}
      >
        {isSharing ? (
          <div className="sk-fading-circle">
            {Array(12)
              .fill('')
              .map((_, index) => (
                <div
                  key={`sk-circle${index + 1}`}
                  className={`sk-circle${index + 1} sk-circle`}
                ></div>
              ))}
          </div>
        ) : (
          <ShareSvg />
        )}
      </div>
    </div>
  );
}
