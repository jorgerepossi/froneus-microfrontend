import React, { ReactNode, useEffect, useState } from 'react';

import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout  = ({ children } : LayoutProps) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('single-spa:routing-event', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('single-spa:routing-event', handleLocationChange);
    };
  }, []);

  const handleNavigation = (path: string) => {
 
    window.history.pushState({}, '', path);
    
 
    const navigationEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navigationEvent);
    
 
    setCurrentPath(path);
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="header-content">
          <h1>📞 Campaign Manager</h1>
          <p className="header-subtitle">Sistema de Gestión de Campañas</p>
        </div>
      </header>

      <div className="wrapper">
        <nav className="app-nav">
        <button 
          className={currentPath === '/' ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavigation('/')}
        >
          <i className="pi pi-home"></i>
          Dashboard
        </button>
        <button 
          className={currentPath.startsWith('/campaigns') ? 'nav-link active' : 'nav-link'}
          onClick={() => handleNavigation('/campaigns')}
        >
          <i className="pi pi-plus-circle"></i>
          Crear Campaña
        </button>
      </nav>

      <main className="app-content">
        {children}
      </main>
      </div>

      <footer className="app-footer">
        <p>Froneus Challenge 2025 - Arquitectura de Microfrontends con Single-SPA</p>
        <p className="footer-tech">React + TypeScript + Zustand + PrimeReact</p>
      </footer>
    </div>
  );
};

export default Layout;