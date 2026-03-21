import { useState, useEffect } from 'react';
import styles from './TrafficWeatherCard.module.scss';

// ─── Real weather from Open-Meteo (free, no API key) ──────────
const fetchWeather = async () => {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast' +
      '?latitude=19.076&longitude=72.8777' +
      '&current=temperature_2m,weathercode' +
      '&timezone=Asia%2FKolkata'
    );
    const data = await res.json();
    return Math.round(data.current.temperature_2m);
  } catch {
    return 28; // fallback
  }
};

// ─── Simulate traffic based on time of day ────────────────────
const getTrafficLevel = () => {
  const hour = new Date().getHours();
  // Morning rush: 8–11, Evening rush: 17–21
  if ((hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 21)) return 'high';
  if ((hour >= 12 && hour <= 16) || (hour >= 7 && hour <= 7)) return 'moderate';
  return 'low';
};

const TRAFFIC_CONFIG = {
  high: {
    bg     : '#E53935',
    label  : 'Heavy traffic in this area',
    sub    : 'Longer than usual',
  },
  moderate: {
    bg     : '#FB8C00',
    label  : 'Moderate traffic in this area',
    sub    : 'Slower than usual',
  },
  low: {
    bg     : '#43A047',
    label  : 'Light traffic in this area',
    sub    : 'Faster than usual',
  },
};

// ─── Car SVG icon ─────────────────────────────────────────────
const CarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="#ffffff" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
    <circle cx="7.5" cy="17.5" r="2.5"/>
    <circle cx="16.5" cy="17.5" r="2.5"/>
  </svg>
);

// ─── Sun icon ─────────────────────────────────────────────────
const SunIcon = () => (
  <div className={styles.sunCircle} />
);

// ─────────────────────────────────────────────────────────────

const TrafficWeatherCard = ({ visible }) => {
  const [temp,    setTemp]    = useState(null);
  const [traffic, setTraffic] = useState(getTrafficLevel());

  useEffect(() => {
    fetchWeather().then(setTemp);

    // Refresh traffic every 5 minutes
    const interval = setInterval(() => {
      setTraffic(getTrafficLevel());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const cfg = TRAFFIC_CONFIG[traffic];

  return (
    <div className={`${styles.card} ${visible ? styles.cardVisible : ''}`}>

      {/* ── Weather row ── */}
      <div className={styles.weatherRow}>
        <span className={styles.city}>Mumbai</span>
        <div className={styles.weatherRight}>
          <span className={styles.temp}>
            {temp !== null ? `${temp}°` : '--°'}
          </span>
          <SunIcon />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={styles.divider} />

      {/* ── Traffic row ── */}
      <div className={styles.trafficRow}>
        <div
          className={styles.trafficIconWrap}
          style={{ background: cfg.bg }}
        >
          <CarIcon />
        </div>
        <div className={styles.trafficText}>
          <span className={styles.trafficLabel}>{cfg.label}</span>
          <span className={styles.trafficSub}>{cfg.sub}</span>
        </div>
      </div>

    </div>
  );
};

export default TrafficWeatherCard;
