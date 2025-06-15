import React from 'react';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Footer from './components/Footer';
import Gmap from './Components/Gmap';


const App = () => {
  return (
    <>
      <Navbar />
      <Gmap/>
      <About />
      <Footer />
    </>
  );
};

export default App;
