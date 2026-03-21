import { useState, useEffect } from 'react';
import styles from './LandingPage.module.scss';
import MapView from '../MapView/MapView';
import DropdownCard from '../DropdownCard/DropdownCard';
import TrafficWeatherCard from '../TrafficWeatherCard/TrafficWeatherCard';

import searchIconSrc from '../../assets/search.svg';
import bookOpenSrc from '../../assets/book-open.svg';
import codesandboxSrc from '../../assets/codesandbox.svg';
import shareIconSrc from '../../assets/share-2.svg';
import profilepic from '../../assets/home-img.jpg';

const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const menuItems = [
  { label: 'About', Icon: PersonIcon, imgSrc: null },
  { label: 'Skills', Icon: null, imgSrc: codesandboxSrc },
  { label: 'Projects', Icon: null, imgSrc: bookOpenSrc },
];

const FULL_NAME = 'Rahul Dolui';
const TYPE_SPEED = 85;

const LandingPage = () => {
  // ── Animation states ────────────────────────────────────────
  const [settled, setSettled] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // ── Panel visibility ─────────────────────────────────────────
  // panelOpen: true = dropdown + traffic visible, input = 16px radius
  //            false = dropdown hidden, input = pill (9999px)
  const [panelOpen, setPanelOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);
  const [dropdownDone, setDropdownDone] = useState(false);

  // ── Boot sequence ────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setSettled(true), 60);
    const t2 = setTimeout(() => { setShowAvatar(true); setShowMenu(true); }, 300);

    // Typewriter
    const t3 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTypedName(FULL_NAME.slice(0, i));
        if (i === FULL_NAME.length) {
          clearInterval(iv);
          setTimeout(() => {
            setShowCursor(false);
            setShowSearch(true);
            setShowShare(true);
            // Open panel automatically after name is typed
            setTimeout(() => openPanel(), 300);
          }, 200);
        }
      }, TYPE_SPEED);
    }, 1400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // ── Panel open/close ─────────────────────────────────────────
  const openPanel = () => {
    setPanelOpen(true);
    setShowDropdown(true);
    // Traffic card staggers in slightly after dropdown
    setTimeout(() => setShowTraffic(true), 150);
    setTimeout(() => setDropdownDone(true), 400);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setShowDropdown(false);
    setShowTraffic(false);
    setDropdownDone(false);
  };

  // Click menu item → close panel
  const handleMenuClick = () => {
    if (panelOpen) closePanel();
  };

  // Click avatar → toggle panel
  const handleAvatarClick = () => {
    if (panelOpen) closePanel();
    else openPanel();
  };

  return (
    <div className={styles.landing}>

      {/* ── Map ── */}
      <MapView />

      {/* ── Avatar ── */}
      <div
        className={`${styles.avatar} ${showAvatar ? styles.avatarVisible : ''}`}
        onClick={handleAvatarClick}
        role="button"
        aria-label="Toggle profile panel"
      >
        <div className={styles.avatarRing}>
          <div className={styles.avatarPhoto}>
            <img src={profilepic} alt="Rahul Dolui" />
          </div>
        </div>
      </div>

      {/* ── Search / Name bar ── */}
      <div className={[
        styles.searchBar,
        settled ? styles.searchBarSettled : '',
        panelOpen ? styles.searchBarDropdown : '',
      ].join(' ')}>
        <span className={styles.nameText}>
          {typedName}
          {showCursor && <span className={styles.cursor}>|</span>}
        </span>
        <button
          className={`${styles.searchBtn} ${showSearch ? styles.searchBtnVisible : ''}`}
          aria-label="Search"
        >
          <img src={searchIconSrc} alt="" width={30} height={30} />
        </button>
      </div>

      {/* ── Dropdown card ── */}
      <DropdownCard visible={showDropdown} />

      {/* ── Traffic + Weather card ── */}
      <TrafficWeatherCard visible={showTraffic} />

      {/* ── Nav menu ── */}
      <nav className={`${styles.navMenu} ${showMenu ? styles.navMenuVisible : ''}`}>
        {menuItems.map(({ label, Icon, imgSrc }) => (
          <button
            key={label}
            className={styles.menuItem}
            onClick={handleMenuClick}
          >
            <span className={styles.menuIcon}>
              {Icon
                ? <Icon />
                : <img src={imgSrc} alt="" width={24} height={24} />
              }
            </span>
            <span className={styles.menuLabel}>{label}</span>
          </button>
        ))}
      </nav>

      {/* ── Share ── */}
      <button
        className={`${styles.shareBtn} ${showShare ? styles.shareBtnVisible : ''}`}
        aria-label="Share"
      >
        <img src={shareIconSrc} alt="" width={40} height={40} />
      </button>

    </div>
  );
};

export default LandingPage;
