import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';
import { ComingSoonRoutes } from './routes/ComingSoonRoutes';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

export default function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes}
        {ComingSoonRoutes}
        {ProtectedRoutes}
      </Routes>
    </Router>
  );
}