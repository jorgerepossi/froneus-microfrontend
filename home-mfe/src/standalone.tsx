 
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';
import { ToastProvider } from './shared/context/ToastContext';

 
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient, 
  rootComponent: () => (
    <ToastProvider>
      <App />
    </ToastProvider>
  ),
  errorBoundary() {
    return <div>Error en Home MFE</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;