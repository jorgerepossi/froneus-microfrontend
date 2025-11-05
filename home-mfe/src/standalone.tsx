 
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';
import { ToastProvider } from './shared/context/ToastContext';
import { PrimeReactProvider } from 'primereact/api'; 



const lifecycles = singleSpaReact({
  React,
  ReactDOMClient, 
  rootComponent: () => (
    <PrimeReactProvider>
      
    <ToastProvider>
      <App />
    </ToastProvider>
    </PrimeReactProvider>
  ),
  errorBoundary() {
    return <div>Error en Home MFE</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;