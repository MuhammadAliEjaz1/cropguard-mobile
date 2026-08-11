import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detect from './pages/Detect';
import Chat from './pages/Chat';
import About from './pages/About';
import CropCalendar from './pages/CropCalendar';
import FertilizerCalculator from './pages/FertilizerCalculator';
import DiseaseMap from './pages/DiseaseMap';
import Weather from './pages/Weather';
import PestIdentifier from './pages/PestIdentifier';
import Admin from './pages/Admin';

// Makes Android's hardware/on-screen back button navigate back within the
// app (like a normal back button) instead of closing the whole app. Only
// active on the native Android/iOS app — a no-op on the website.
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = CapacitorApp.addListener('backButton', () => {
      if (location.pathname === '/') {
        // Already on the home page — this is where back should exit the app.
        CapacitorApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      listenerPromise.then(handle => handle.remove());
    };
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <BackButtonHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/pest" element={<PestIdentifier />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/calendar" element={<CropCalendar />} />
          <Route path="/fertilizer" element={<FertilizerCalculator />} />
          <Route path="/map" element={<DiseaseMap />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
