import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.js';
// import Photos from './pages/Photos.js';
import About from './pages/About.js';
import Dissertations from './pages/Dissertations.js';
import Monographies from './pages/Monographies.js';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer.js';
// import Beach from './pages/Beach.js';
import Contacts from './components/Contacts.js';
import Videos from './pages/Videos.js'; // Import the Videos page

function App() {
  return (
    <div>
      <HashRouter>
        <NavigationBar />
        <Routes>
          <Route element={<Home />} path='/' exact />
          {/* <Route element={<Photos />} path='/photos' exact /> */}
          {/* <Route element={<Beach />} path='/photos/beach' exact /> */}
          <Route element={<About />} path='/about' exact />
          <Route element={<Dissertations />} path='/dissertations' exact />
          <Route element={<Monographies />} path='/monographies' exact />
          <Route element={<Contacts />} path='/contacts' exact />
          <Route element={<Videos />} path='/videos' exact /> {/* Add the Videos route */}
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;