import EditSvg from '../svgs/edit';
import styles from './index.module.css';

export default function Edit({ onClick }) {
  return (
    <div className={styles.edit} onClick={onClick}>
      <EditSvg />
    </div>
  );
}
