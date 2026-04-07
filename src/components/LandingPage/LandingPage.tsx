import { useState, useEffect, useRef } from 'react';
import styles from './LandingPage.module.scss';
import MapView            from '../MapView/MapView';
import DropdownCard       from '../DropdownCard/DropdownCard';
import TrafficWeatherCard from '../TrafficWeatherCard/TrafficWeatherCard';
import Offcanvas          from '../Offcanvas/Offcanvas';
import AboutPanel         from '../Aboutpanel/Aboutpanel';
import WorkPanel          from '../WorkPanel/WorkPanel';
import WorkDetailCard     from '../WorkDetailCard/WorkDetailCard';
import { WORK_DATA }      from '../../data/workData.js';

import searchIconSrc  from '../../assets/search.svg';
import bookOpenSrc    from '../../assets/book-open.svg';
import codesandboxSrc from '../../assets/codesandbox.svg';
import shareIconSrc   from '../../assets/share-2.svg';
import profilepic     from '../../assets/home-img.jpg';

// ─── Icons ────────────────────────────────────────────────────────────────────
const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="#1a1a1a" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
);

const menuItems = [
  { key: 'about',    label: 'About',    Icon: PersonIcon, imgSrc: null          },
  { key: 'work',     label: 'Work',     Icon: null,       imgSrc: codesandboxSrc },
  { key: 'projects', label: 'Projects', Icon: null,       imgSrc: bookOpenSrc   },
];

const HOME_NAME  = 'Rahul Dolui';
const TYPE_SPEED = 75; // ms per character

// ─────────────────────────────────────────────────────────────────────────────

const LandingPage = () => {

  // ── Boot animation states ─────────────────────────────────────────────────
  const [settled,      setSettled]      = useState(false);
  const [displayText,  setDisplayText]  = useState('');
  const [showCursor,   setShowCursor]   = useState(true);
  const [showSearch,   setShowSearch]   = useState(false);
  const [showClose,    setShowClose]    = useState(false);
  const [showAvatar,   setShowAvatar]   = useState(false);
  const [showMenu,     setShowMenu]     = useState(false);
  const [showShare,    setShowShare]    = useState(false);

  // ── Panel / offcanvas states ──────────────────────────────────────────────
  const [panelOpen,    setPanelOpen]    = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTraffic,  setShowTraffic]  = useState(false);
  const [activeMenu,   setActiveMenu]   = useState(null); // 'about' | 'work' | etc.

  // ── Work-specific states ──────────────────────────────────────────────────
  const [selectedWork, setSelectedWork] = useState(null); // drives the detail card
  const [pinTooltip,   setPinTooltip]   = useState(null); // { work, x, y }

  const typeTimerRef    = useRef(null);
  const pinTooltipTimer = useRef(null);

  // ─── Typewriter helper ────────────────────────────────────────────────────
  const typeText = (target, onDone) => {
    if (typeTimerRef.current) clearInterval(typeTimerRef.current);
    setDisplayText('');
    setShowCursor(true);
    let i = 0;
    typeTimerRef.current = setInterval(() => {
      i++;
      setDisplayText(target.slice(0, i));
      if (i === target.length) {
        clearInterval(typeTimerRef.current);
        if (onDone) onDone();
      }
    }, TYPE_SPEED);
  };

  // ─── Boot sequence ────────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setSettled(true), 60);
    const t2 = setTimeout(() => {
      setShowAvatar(true);
      setShowMenu(true);
    }, 300);

    const t3 = setTimeout(() => {
      typeText(HOME_NAME, () => {
        setTimeout(() => {
          setShowCursor(false);
          setShowSearch(true);
          setShowShare(true);
          setTimeout(() => openDropdownPanel(), 300);
        }, 200);
      });
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (typeTimerRef.current) clearInterval(typeTimerRef.current);
    };
  }, []);

  // ─── Reset work state whenever Work menu closes ───────────────────────────
  useEffect(() => {
    if (activeMenu !== 'work') {
      setSelectedWork(null);
      setPinTooltip(null);
    }
  }, [activeMenu]);

  // ─── Dropdown panel helpers ───────────────────────────────────────────────
  const openDropdownPanel = () => {
    setPanelOpen(true);
    setShowDropdown(true);
    setTimeout(() => setShowTraffic(true), 150);
  };

  const closeDropdownPanel = () => {
    setPanelOpen(false);
    setShowDropdown(false);
    setShowTraffic(false);
  };

  // ─── Menu item clicked ────────────────────────────────────────────────────
  const handleMenuClick = (key, label) => {
    if (activeMenu === key) {
      handleClose();
      return;
    }
    closeDropdownPanel();
    setActiveMenu(key);
    setShowSearch(false);
    setShowClose(false);
    typeText(label, () => {
      setShowCursor(false);
      setShowSearch(true);
      setShowClose(true);
    });
  };

  // ─── Close / X button ────────────────────────────────────────────────────
  const handleClose = () => {
    setActiveMenu(null);
    setSelectedWork(null);
    setPinTooltip(null);
    setShowClose(false);
    setShowSearch(false);
    typeText(HOME_NAME, () => {
      setShowCursor(false);
      setShowSearch(true);
      setTimeout(() => openDropdownPanel(), 200);
    });
  };

  // ─── Avatar click ─────────────────────────────────────────────────────────
  const handleAvatarClick = () => {
    if (activeMenu) {
      handleClose();
    } else if (panelOpen) {
      closeDropdownPanel();
    } else {
      openDropdownPanel();
    }
  };

  // ─── Work: list card selection ────────────────────────────────────────────
  const handleWorkSelect = (work) => {
    setSelectedWork(work);
    setPinTooltip(null);
  };

  const handleCloseDetail = () => {
    setSelectedWork(null);
  };

  // ─── Work: map pin hover ──────────────────────────────────────────────────
  const handlePinHover = (work, clientX, clientY) => {
    if (pinTooltipTimer.current) clearTimeout(pinTooltipTimer.current);
    setPinTooltip({ work, x: clientX, y: clientY });
  };

  const handlePinHoverOut = () => {
    // Small grace period so user can move mouse onto the tooltip card
    pinTooltipTimer.current = setTimeout(() => setPinTooltip(null), 280);
  };

  const handleTooltipMouseEnter = () => {
    if (pinTooltipTimer.current) clearTimeout(pinTooltipTimer.current);
  };

  const handleTooltipMouseLeave = () => {
    setPinTooltip(null);
  };

  const handlePinClick = (work) => {
    setPinTooltip(null);
    setSelectedWork(work);
  };

  // ─── Tooltip position — clamps inside viewport ────────────────────────────
  const getTooltipStyle = ({ x, y }) => {
    const tooltipW = 400;
    const tooltipH = 260;   // approximate
    const offsetX  = 18;
    const offsetY  = -200;

    let left = x + offsetX;
    let top  = y + offsetY;

    if (left + tooltipW > window.innerWidth)  left = x - tooltipW - offsetX;
    if (top  < 10)                            top  = 10;
    if (top  + tooltipH > window.innerHeight) top  = window.innerHeight - tooltipH - 10;

    return { left, top };
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.landing}>

      {/* ── Map ── */}
      <MapView
        showWorkPins={activeMenu === 'work'}
        workData={WORK_DATA}
        onPinHover={handlePinHover}
        onPinHoverOut={handlePinHoverOut}
        onPinClick={handlePinClick}
      />

      {/* ── Offcanvas: About ── */}
      <Offcanvas isOpen={activeMenu === 'about'}>
        <AboutPanel />
      </Offcanvas>

      {/* ── Offcanvas: Work ── */}
      <Offcanvas isOpen={activeMenu === 'work'}>
        <WorkPanel
          selectedWork={selectedWork}
          onSelectWork={handleWorkSelect}
        />
      </Offcanvas>

      {/* ── Work detail card (slides in over the map area) ── */}
      <WorkDetailCard
        work={selectedWork}
        visible={!!selectedWork && activeMenu === 'work'}
        onClose={handleCloseDetail}
      />

      {/* ── Pin tooltip (appears on map pin hover) ── */}
      {pinTooltip && (
        <div
          className={styles.pinTooltip}
          style={getTooltipStyle(pinTooltip)}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          onClick={() => handlePinClick(pinTooltip.work)}
        >
          <div className={styles.tooltipBanner}>
            <span className={styles.tooltipInitials}>
              {pinTooltip.work.initials}
            </span>
          </div>
          <div className={styles.tooltipBody}>
            <h4 className={styles.tooltipCompany}>{pinTooltip.work.company}</h4>
            <p className={styles.tooltipLocation}>
              <span className={styles.tooltipLocLabel}>Location – </span>
              <span className={styles.tooltipLocValue}>{pinTooltip.work.location}</span>
            </p>
          </div>
        </div>
      )}

      {/* ── Avatar ── */}
      <div
        className={`${styles.avatar} ${showAvatar ? styles.avatarVisible : ''}`}
        onClick={handleAvatarClick}
        role="button"
        aria-label="Toggle profile"
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
        settled   ? styles.searchBarSettled  : '',
        panelOpen ? styles.searchBarDropdown : '',
      ].join(' ')}>
        <span className={styles.nameText}>
          {displayText}
          {showCursor && <span className={styles.cursor}>|</span>}
        </span>

        <div className={styles.barButtons}>
          {/* Search icon */}
          <button
            className={`${styles.iconBtn} ${showSearch ? styles.iconBtnVisible : ''}`}
            aria-label="Search"
          >
            <img src={searchIconSrc} alt="" width={30} height={30} />
          </button>

          {/* Close (X) icon — only when a section is open */}
          <button
            className={`${styles.iconBtn} ${showClose ? styles.iconBtnVisible : styles.closeBtn}`}
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* ── Dropdown + Traffic (hidden when section is open) ── */}
      <DropdownCard       visible={showDropdown} />
      <TrafficWeatherCard visible={showTraffic}  />

      {/* ── Nav menu ── */}
      <nav className={`${styles.navMenu} ${showMenu ? styles.navMenuVisible : ''}`}>
        {menuItems.map(({ key, label, Icon, imgSrc }) => (
          <button
            key={key}
            className={[
              styles.menuItem,
              activeMenu === key ? styles.menuItemActive : '',
            ].join(' ')}
            onClick={() => handleMenuClick(key, label)}
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