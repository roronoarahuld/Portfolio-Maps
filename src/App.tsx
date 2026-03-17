import { useEffect, useState } from 'react'
import Loader from "./components/Loader/Loader"
import './App.scss'

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    const t =setTimeout(() => setLoaded(true),2200);
    return () =>clearTimeout(t)
  },[]);

  return (
    <>
      {!loaded && <Loader/>}
      
    </>
  )
}

export default App
