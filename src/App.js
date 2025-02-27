import './App.css';
import {HashRouter,Routes,Route} from 'react-router-dom';

import Home from './pages/Home.js'
import Photos from './pages/Photos.js'
import About from './pages/About.js'
import Titles from './pages/Titles.js'
import NavigationBar from './components/Navbar';
import Footer from './components/Footer.js';
import Beach from './pages/Beach.js';


function App() {


  return (<div>
       <HashRouter>
       <NavigationBar />

      <Routes>

               <Route element={<Home />} path='/'  exact/>
               <Route element={<Photos />} path='/photos'  exact/>
               <Route element={<Beach />} path='/photos/beach'  exact/>
               <Route element={<About />} path='/about'  exact/>
               <Route element={<Titles />} path='/titles'  exact/>
      
      </Routes>
      <Footer />
      
    </HashRouter>
   
  </div>
    
  );
}

export default App;