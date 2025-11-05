import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient, 
  rootComponent: App,
  errorBoundary() {
    return <div>Error en Home MFE</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;