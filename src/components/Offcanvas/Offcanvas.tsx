import styles from './Offcanvas.module.scss';

const Offcanvas = ({ isOpen, children }) => {
  return (
    <div className={`${styles.offcanvas} ${isOpen ? styles.open : ''}`}>
      {children}
    </div>
  );
};

export default Offcanvas;