import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CampaignForm } from './features/campaigns/components/CampaignForm';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/campaigns" element={<CampaignForm />} />
        <Route path="/campaigns/new" element={<CampaignForm />} />
        <Route path="/campaigns/edit/:id" element={<CampaignForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;