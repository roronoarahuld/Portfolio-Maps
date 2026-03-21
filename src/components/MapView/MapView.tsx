import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.scss';

// ─── Fix Leaflet's default marker icon broken in Vite ─────────
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon   from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:       markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl:     markerShadow,
});

// ─── Coords ───────────────────────────────────────────────────
const MUMBAI_CENTER = [19.076, 72.8777];
// const MY_LOCATION   = [19.1136, 72.8697]; // Andheri West

// ─── Custom blue location marker ──────────────────────────────
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

// ─── Soft bounds so map stays around Mumbai ───────────────────
const MUMBAI_BOUNDS = [
  [18.85, 72.75],
  [19.35, 73.05],
];

const MapView = () => {
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
      </MapContainer>
    </div>
  );
};

export default MapView;
