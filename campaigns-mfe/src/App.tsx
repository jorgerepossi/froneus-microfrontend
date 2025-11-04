import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CampaignForm } from './features/campaigns/components/CampaignForm';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Layout from './shared/components/Layout';

const App = () => {

  return (

    <BrowserRouter>
     <Layout>
      <Routes>
        <Route path="/campaigns" element={<CampaignForm />} />
        <Route path="/campaigns/new" element={<CampaignForm />} />
        <Route path="/campaigns/edit/:id" element={<CampaignForm />} />
        <Route path="*" element={<div>404 | Ruta no encontrada</div>} />
      </Routes>
     </Layout>
    </BrowserRouter>
  );
};

export default App;