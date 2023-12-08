
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Notifications from './pages/Notifications';
import Error from './pages/Error';
import Login from './pages/Accounts/Login';
import Signup from './pages/Accounts/Signup';
import Profile from './pages/Accounts/Profile';
import Search from './pages/Search';
import NewPet from './pages/NewPet';
import PetDetails from './pages/PetDetails';

import AppList from './pages/Application/List';
import AppDetail from './pages/Application/Detail';
import AppApply from './pages/Application/Seeker/Create';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/applications" element={<AppList />} />
        <Route path="/listings" element={<Search />} />
        <Route path="/listings/:id" element={<PetDetails />} />
        <Route path="/newpet" element={<NewPet />} />
        <Route path="*" element={<Error />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/applications/*" element={<ApplicationRoutes />} />
      </Routes>
    </Router>
  );
};

const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppList />} />
      <Route path="detail/:applicationID" element={<AppDetail />} />
      <Route path="create/:petID" element={<AppApply />} />
    </Routes>
  );
};


export default App;

