
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Notifications from './pages/Notifications';

import SeekerAppList from './pages/Application/Seeker/SeekerAppList';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/seekerapps" element={<SeekerAppList />} />
      </Routes>
    </Router>
  );
};

export default App;