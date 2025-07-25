// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';
// import axios from 'axios'

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  // const [message, setMessage] = useState([]);

  // useEffect(() => {
  //   axios('/api/hello')
  //     .then(res => setMessage(res.data))
  //     .catch(err => console.log(err))
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
