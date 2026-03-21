import styles from './DropdownCard.module.scss';
import codepenSrc   from '../../assets/codepen.svg';
import bookSrc      from '../../assets/book.svg';
import briefcaseSrc from '../../assets/briefcase.svg';

const items = [
  {
    icon: bookSrc,
    label: 'Front-End Developer',
    sub: null,
  },
  {
    icon: briefcaseSrc,
    label: 'Homeville Group Consulting',
    sub: 'Currently working from March 2022',
  },
  {
    icon: bookSrc,
    label: 'Team Lead',
    sub: 'Role in the current company',
  },
  {
    icon: codepenSrc,
    label: 'UI/UX , HTML, CSS, Javascript, React ....',
    sub: 'Skills',
  },
];

const DropdownCard = ({ visible }) => {
  return (
    <div className={`${styles.card} ${visible ? styles.cardVisible : ''}`}>
      {items.map(({ icon, label, sub }, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.iconWrap}>
            <img src={icon} alt="" width={17} height={17} />
          </div>
          <div className={styles.text}>
            <span className={styles.label}>{label}</span>
            {sub && <span className={styles.sub}>{sub}</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownCard;
