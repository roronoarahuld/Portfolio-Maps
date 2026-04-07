import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.scss';

// ─── Fix Leaflet's default marker icon broken in Vite ─────────────────────────
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon   from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:       markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl:     markerShadow,
});

// ─── Coords ───────────────────────────────────────────────────────────────────
const MUMBAI_CENTER = [19.076, 72.8777];
const MY_LOCATION   = [19.1136, 72.8697]; // Andheri West

// ─── Soft bounds so map stays around Mumbai ───────────────────────────────────
const MUMBAI_BOUNDS = [
  [18.85, 72.75],
  [19.35, 73.05],
];

// ─── Existing blue location marker (your Andheri West dot) ───────────────────
const myIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:42px;height:42px;
      background:#1a73e8;
      border:3px solid #ffffff;
      border-radius:50%;
      box-shadow:0 2px 12px rgba(26,115,232,0.5);
      display:flex;align-items:center;justify-content:center;
    ">
      <div style="
        width:14px;height:14px;
        background:#ffffff;border-radius:50%;
      "></div>
    </div>
  `,
  iconSize:   [42, 42],
  iconAnchor: [21, 21],
});

// ─── Work pin icon (red Google-style drop pin, no black background) ───────────
const createWorkPinIcon = (index) =>
  L.divIcon({
    html: `
      <div class="work-pin-wrapper" style="animation-delay:${index * 90}ms">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
          <path
            d="M15 0C6.716 0 0 6.716 0 15c0 10.313 15 25 15 25S30 25.313 30 15C30 6.716 23.284 0 15 0z"
            fill="#E53935"
          />
          <circle cx="15" cy="15" r="6.5" fill="white" opacity="0.92"/>
        </svg>
      </div>
    `,
    className:  '',
    iconSize:   [30, 40],
    iconAnchor: [15, 40],  // tip of pin is the anchor point
  });

// ─── WorkMarkers — child so it has access to Leaflet map instance via useMap ──
const WorkMarkers = ({ data, showPins, onHover, onHoverOut, onPinClick }) => {
  const map        = useMap();
  const markersRef = useRef([]);

  useEffect(() => {
    // Clean up previous pins
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (!showPins) return;

    data.forEach((work, index) => {
      const marker = L.marker(work.coords, { icon: createWorkPinIcon(index) });

      marker.on('mouseover', (e) => {
        const { clientX, clientY } = e.originalEvent;
        onHover(work, clientX, clientY);
      });

      marker.on('mouseout', () => {
        onHoverOut();
      });

      marker.on('click', () => {
        onPinClick(work);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
    };
  }, [showPins, data, map]);

  return null;
};

// ─── MapView ──────────────────────────────────────────────────────────────────
const MapView = ({
  showWorkPins = false,
  workData     = [],
  onPinHover,
  onPinHoverOut,
  onPinClick,
}) => {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={MUMBAI_CENTER}
        zoom={12}
        minZoom={11}
        maxZoom={18}
        maxBounds={MUMBAI_BOUNDS}
        maxBoundsViscosity={0.85}
        scrollWheelZoom={true}
        zoomControl={false}
        attributionControl={false}
        className={styles.mapContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* ── Your existing Andheri West blue dot ── */}
        {/* <Marker position={MY_LOCATION} icon={myIcon} /> */}

        {/* ── Work pins — rendered only when Work menu is active ── */}
        <WorkMarkers
          data={workData}
          showPins={showWorkPins}
          onHover={onPinHover     || (() => {})}
          onHoverOut={onPinHoverOut || (() => {})}
          onPinClick={onPinClick    || (() => {})}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;