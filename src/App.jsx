import React from 'react';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Footer from './components/Footer';
import Gmap from './Components/Gmap';
import { HashRouter } from 'react-router-dom';

const App = () => {
  return (

    <HashRouter>
       <Navbar />
      <Gmap/>
      <About />
      <Footer />
    </HashRouter>
    
  );
};

export default App;
