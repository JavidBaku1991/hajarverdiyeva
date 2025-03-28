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


const videos = [
  { videoId: 'K-wCck8Vkbw', title: '"Multikulturalizm" verilişi 23' },
  { videoId: 'X0IB02XbXXQ', title: 'Французское издание о попытках арменизации албанского храма в Карабахе' },
  { videoId: '5GSeEaKEqi8', title: 'Хроники переселения армян на Кавказ' },
  { videoId: '3jnJmZS1qNc', title: '«Просто о сложном» : переселение армян на Кавказ. Передача вторая' },
  { videoId: 'qsP-kGrf1MI', title: '«Просто о сложном»: переселение армян на Кавказ. Передача первая' },
  { videoId: 'IVUfwIkdfoA', title: '«Просто о сложном»: переселение армян на Кавказ. Передача четвёртая' },
  { videoId: 'KFJAqsjZVQw', title: '«Просто о сложном»: переселение армян на Кавказ. Передача третья' },
  { videoId: 'OQp3ifptP2k', title: '«Просто о сложном» переселение армян на Кавказ' },
];

function App() {
  return (
    <div>
      <HashRouter>
        <NavigationBar />
        <Routes>
          <Route element={<Home />} path='/' exact />

          <Route element={<About />} path='/about' exact />
          <Route element={<Dissertations />} path='/dissertations' exact />
          <Route element={<Monographies />} path='/monographies' exact />
          <Route element={<Contacts />} path='/contacts' exact />
          <Route element={<Videos videos={videos} />} path='/videos' exact /> {/* Add the Videos route */}
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;