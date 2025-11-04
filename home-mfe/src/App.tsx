import React from 'react';
 
import { Dashboard } from './features/dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CampaignDetail from './features/dashboard/components/CampaignDetail';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App  = () => {
  
  return (
    
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;