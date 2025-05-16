import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import images for interviews
import hecer5 from './photos/hajar11.png';
import hecer2 from './photos/titles/home2.jpg';
import hecer4 from './photos/titles/home4.jpg';
import hecer7 from './photos/interview4.png';
import hecer8 from './photos/hajar1.png';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Dissertations from './pages/Dissertations.js';
import Monographies from './pages/Monographies.js';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer.js';
import TitlesPage from './pages/TitlesPage.js';
import Contacts from './components/Contacts.js';
import Videos from './pages/Videos.js';
import NotFound from './pages/NotFound.js';
import AdminLogin from './pages/AdminLogin.js';
import AdminDashboard from './pages/AdminDashboard.js';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './components/Admin';

// Initial videos data
const initialVideos = [
  { videoId: 'K-wCck8Vkbw' },
  { videoId: 'X0IB02XbXXQ' },
  { videoId: '0i23vP2xULE' },
  { videoId: '3jnJmZS1qNc' },
  { videoId: 'qsP-kGrf1MI' },
  { videoId: 'IVUfwIkdfoA' },
  { videoId: 'KFJAqsjZVQw' },
  { videoId: 'OQp3ifptP2k' },
];

// Initial interviews data
const initialInterviews = [
  { 
    name: 'Həcər Verdiyeva: "Tarixdə "Böyük Ərməniyyə" olmayıb.', 
    url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', 
    image: hecer5 
  },
  { 
    name: '"Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi"', 
    url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', 
    image: hecer2 
  },
  { 
    name: 'Развязывая «узлы» истории', 
    url: 'https://br.az/politics/63227/razvyazyvaya-uzly-istorii/', 
    image: hecer4 
  },
  { 
    name: 'Архитектура вне времени', 
    url: 'https://baki-baku.az/%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%B2%D0%BD%D0%B5-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8/', 
    image: hecer7 
  },
  { 
    name: 'История, искаженная догмой', 
    url: 'https://br.az/politics/79452/istoriya-iskazhennaya-dogmoy/', 
    image: hecer8 
  }
];

function App() {
  // Load interviews from localStorage or use initial data
  const [interviews, setInterviews] = useState(() => {
    const savedInterviews = localStorage.getItem('interviews');
    if (savedInterviews) {
      try {
        const parsed = JSON.parse(savedInterviews);
        // Convert blob URLs back to actual image references
        return parsed.map(interview => {
          if (interview.image.startsWith('blob:')) {
            // Find the matching initial interview to get the correct image reference
            const matchingInterview = initialInterviews.find(i => i.name === interview.name);
            if (matchingInterview) {
              return { ...interview, image: matchingInterview.image };
            }
          }
          return interview;
        });
      } catch (e) {
        console.error('Error parsing saved interviews:', e);
        return initialInterviews;
      }
    }
    return initialInterviews;
  });

  const [videos, setVideos] = useState(initialVideos);

  // Save interviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('interviews', JSON.stringify(interviews));
  }, [interviews]);

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home interviews={interviews} />} />
          <Route path="/about" element={<About />} />
          <Route path="/dissertations" element={<Dissertations />} />
          <Route path="/monographies" element={<Monographies />} />
          <Route path="/titles" element={<TitlesPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/videos" element={<Videos videos={videos} />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard 
                  videos={videos} 
                  setVideos={setVideos}
                  interviews={interviews}
                  setInterviews={setInterviews}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
