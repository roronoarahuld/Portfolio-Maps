import styles from './WorkPanel.module.scss';
import { WORK_DATA } from '../../data/workData';

const WorkPanel = ({ selectedWork, onSelectWork }) => {
  return (
    <div className={styles.panel}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <h2 className={styles.resultsTitle}>Results</h2>
      </div>

      {/* ── List ── */}
      <div className={styles.list}>
        {WORK_DATA.map((work, index) => {
          const isActive = selectedWork?.id === work.id;
          const isLast   = index === WORK_DATA.length - 1;

          return (
            <div
              key={work.id}
              className={[
                styles.card,
                isActive ? styles.cardActive : '',
                isLast   ? styles.cardLast   : '',
              ].join(' ')}
              onClick={() => onSelectWork(work)}
            >
              <div className={styles.cardInner}>

                {/* ── Text block ── */}
                <div className={styles.cardText}>
                  <h3 className={styles.companyName}>{work.company}</h3>

                  <p className={styles.row}>
                    <span className={styles.rowLabel}>{work.roleLabel} </span>
                    <span className={styles.rowSep}>· </span>
                    <span className={styles.rowValue}>{work.role}</span>
                  </p>

                  <p className={`${styles.row} ${styles.rowLast}`}>
                    <span className={styles.rowLabel}>From </span>
                    <span className={styles.rowSep}>· </span>
                    <span className={styles.rowValue}>{work.duration}</span>
                  </p>
                </div>

                {/* ── Initials box ── */}
                <div className={styles.initialsBox}>
                  <span className={styles.initialsText}>{work.initials}</span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default WorkPanel;