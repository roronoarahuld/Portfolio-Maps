import { useEffect, useRef } from 'react';
import styles from './Loader.module.scss';
import mapBg from '../../assets/map-background.svg';

const COLS = 24;
const ROWS = 15;
const REVEAL_DURATION = 2000; // total ms for all blocks to clear
const FADE_EACH = 200;        // each block fades over 200ms

const Loader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const W = canvas.parentElement.offsetWidth;
    const H = canvas.parentElement.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const bw = W / COLS;
    const bh = H / ROWS;

    // Build blocks with random staggered delays
    const blocks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        blocks.push({
          x:     c * bw,
          y:     r * bh,
          delay: Math.random() * REVEAL_DURATION,
          done:  false,
        });
      }
    }

    let startTime = null;

    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, W, H);

      let allDone = true;

      for (const b of blocks) {
        if (b.done) continue;

        const t = elapsed - b.delay;

        if (t < 0) {
          // not yet started — solid white tile
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(b.x, b.y, bw + 0.5, bh + 0.5);
          allDone = false;
        } else if (t < FADE_EACH) {
          // fading out
          const alpha = 1 - t / FADE_EACH;
          ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
          ctx.fillRect(b.x, b.y, bw + 0.5, bh + 0.5);
          allDone = false;
        } else {
          b.done = true;
        }
      }

      if (!allDone) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, W, H);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className={styles.loaderWrapper}>
      {/* Map always underneath */}
      <img
        src={mapBg}
        alt="map background"
        className={styles.mapBg}
        draggable={false}
      />

      {/* White block grid that dissolves away */}
      <canvas ref={canvasRef} className={styles.revealCanvas} />

      {/* Input: wipes in left → right after blocks clear */}
      <div className={styles.inputWrapper}>
        <div className={styles.searchBar} />
      </div>
    </div>
  );
};

export default Loader;
