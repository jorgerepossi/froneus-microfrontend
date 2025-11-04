import React from "react"
import ReactDOM from "react-dom"
import singleSpaReact from "single-spa-react"


import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import App from "./App"
import { ToastProvider } from "./shared/context/ToastContext"

const lifeCycles = singleSpaReact({
    React, ReactDOM, rootComponent: () => (
        <ToastProvider>
            <App />
        </ToastProvider>
    ), 
    errorBoundary(){
        return <div>Error en Home</div>
    
    }
})
export const { bootstrap, mount, unmount } = lifeCycles;