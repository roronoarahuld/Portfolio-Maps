import { useState, useEffect } from 'react';
import styles from './WorkDetailCard.module.scss';

import locationIcon from '../../assets/location.png';
import clockIcon from '../../assets/clock.svg';
import userIcon from '../../assets/user.svg';

const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="#ffffff" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const WorkDetailCard = ({ work, visible, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Reset tab when the selected work changes
    useEffect(() => {
        setActiveTab('overview');
    }, [work?.id]);

    return (
        // Overlay is always in the DOM so CSS transitions work cleanly
        <div className={`${styles.overlay} ${visible ? styles.overlayActive : ''}`}>
            <div className={`${styles.card} ${visible ? styles.cardVisible : ''}`}>

                {/* ── Close button ── */}
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close detail">
                    <CloseIcon />
                </button>

                {/* ── Blue banner ── */}
                <div className={styles.blueBanner}>
                    {work && (
                        <span className={styles.bannerInitials}>{work.initials}</span>
                    )}
                </div>

                {/* ── Scrollable content ── */}
                <div className={styles.scrollContent}>
                    {work && (
                        <>
                            <h2 className={styles.companyName}>{work.company}</h2>
                            <p className={styles.companyHindi}>{work.companyHindi}</p>

                            {/* ── Tabs ── */}
                            <div className={styles.tabs}>
                                <button
                                    className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    Overview
                                </button>
                            </div>

                            {/* ── Tab content ── */}
                            {activeTab === 'overview' && (
                                <div className={styles.tabContent}>
                                    <div className={styles.infoRow}>
                                        <img src={locationIcon} alt="Location" className={styles.infoIcon} />
                                        <span className={styles.infoText}>{work.location}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <img src={clockIcon} alt="Duration" className={styles.infoIcon} />
                                        <span className={styles.infoText}>{work.duration}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <img src={userIcon} alt="Role" className={styles.infoIcon} />
                                        <span className={styles.infoText}>{work.detailRole}</span>
                                    </div>
                                </div>
                            )}

                            {/* ── Description (below the tab block) ── */}
                            <p className={styles.description}>{work.description}</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default WorkDetailCard;