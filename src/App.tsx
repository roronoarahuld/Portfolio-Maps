import { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import LandingPage from './components/LandingPage/LandingPage';

const App = () => {
  const [loaderDone,    setLoaderDone]    = useState(false);
  const [showLanding,   setShowLanding]   = useState(false);
  const [loaderRemoved, setLoaderRemoved] = useState(false);

  useEffect(() => {
    // Mount LandingPage just before loader fades — input morphs seamlessly
    const t1 = setTimeout(() => setShowLanding(true),   3100);
    // Start fading loader
    const t2 = setTimeout(() => setLoaderDone(true),    3200);
    // Remove loader from DOM
    const t3 = setTimeout(() => setLoaderRemoved(true), 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <>
      {!loaderRemoved && <Loader fadeOut={loaderDone} />}
      {showLanding    && <LandingPage />}
    </>
  );
};

export default App;
