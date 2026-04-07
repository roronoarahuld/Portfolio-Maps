import { useState } from 'react';
import styles from './AboutPanel.module.scss';
import aboutPhoto from '../../assets/about-photo.jpg';
import figmaIcon from '../../assets/figma.png';
import photoshopIcon from '../../assets/photoshop.png';
import illustratorIcon from '../../assets/illustrator.png';
import htmlIcon from '../../assets/html-5.png';
import cssIcon from '../../assets/css-3.png';
import jsIcon from '../../assets/js.png';
import bootstrapIcon from '../../assets/bootstrap.png';
import tsIcon from '../../assets/typescript.png';
import reactIcon from '../../assets/react.png';
import reactNativeIcon from '../../assets/physics.png';
import angularIcon from '../../assets/angular.png';

const OVERVIEW_TEXT = [
  {
    text: "I'm Rahul Dolui — a Frontend Developer based in Mumbai with ",
    bold: false,
  },
  {
    text: '8+ years',
    bold: true,
  },
  {
    text: ' of experience turning designs into fast, responsive, pixel-perfect interfaces. I specialise in React and React Native, and currently serve as a Team Lead at Homeville Group where I oversee mobile app development end-to-end.',
    bold: false,
  },
  {
    text: "\n\nOver the years I've worked with brands like Staples, Garnier, L'Oréal and institutions like IIT Bombay — from solo ownership of entire frontends to leading full teams.",
    bold: false,
  },
];

const AboutPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className={styles.panel}>

      {/* ── Hero image ── */}
      <div className={styles.imageWrap}>
        <img
          src={aboutPhoto}
          alt="Rahul Dolui"
          className={styles.heroImage}
        />
      </div>

      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.subtitle}>अबाउट</p>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'skills' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
      </div>

      {/* ── Tab content ── */}
      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <p className={styles.overviewText}>
            {OVERVIEW_TEXT.map((segment, i) =>
              segment.bold
                ? <strong key={i} className={styles.bold}>{segment.text}</strong>
                : <span key={i}>{segment.text}</span>
            )}
          </p>
        )}
        {activeTab === 'skills' && (
            <div className={styles.skillsTab}>
              <div className={styles.skillRow}>
                <span className={styles.skillLabel}>Design Tools:</span>
                <div className={styles.skillIcons}>
                  <img src={figmaIcon} alt="Figma" className={styles.skillIcon} />
                  <img src={photoshopIcon} alt="Photoshop" className={styles.skillIcon} />
                  <img src={illustratorIcon} alt="Illustrator" className={styles.skillIcon} />
                </div>
              </div>

              <div className={styles.skillRow}>
                <span className={styles.skillLabel}>Front End Development:</span>
                <div className={styles.skillIcons}>
                  <img src={htmlIcon} alt="HTML5" className={styles.skillIcon} />
                  <img src={cssIcon} alt="CSS3" className={styles.skillIcon} />
                  <img src={jsIcon} alt="JavaScript" className={styles.skillIcon} />
                  <img src={bootstrapIcon} alt="Bootstrap" className={styles.skillIcon} />
                  <img src={tsIcon} alt="TypeScript" className={styles.skillIcon} />
                </div>
              </div>

              <div className={styles.skillRow}>
                <span className={styles.skillLabel}>Frameworks & Libraries:</span>
                <div className={styles.skillIcons}>
                  <img src={reactIcon} alt="React" className={styles.skillIcon} />
                  <img src={reactNativeIcon} alt="React Native" className={styles.skillIcon} />
                  <img src={angularIcon} alt="Angular" className={styles.skillIcon} />
                </div>
              </div>
            </div>
          )}
      </div>

    </div>
  );
};

export default AboutPanel;