import React, { useEffect } from 'react';
import { useCampaignStore } from "../../../shared/store"
import { useDashboardStats } from '../hooks/useDashboardStats';
import { StatsGrid } from './StatsGrid';
import { RecentTable } from './RecentTable';
import { Button } from 'primereact/button';


const Dashboard = () => {

    const { campaigns, initializeMockData } = useCampaignStore();
    console.log(campaigns);
    const stats = useDashboardStats();

    useEffect(() => {
        if (campaigns.length === 0) {
            initializeMockData();
        }
    }, []);
   const handleCreateCampaign = () => {
    window.history.pushState({}, '', '/campaigns');
    window.dispatchEvent(new PopStateEvent('popstate'));
};

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
             <Button
                    label="Crear Nueva Campaña"
                    icon="pi pi-plus"
                    onClick={handleCreateCampaign}
                    severity="success"
                />
            <StatsGrid {...stats} />
            <RecentTable  campaigns={campaigns} />
        </div>
    )
}


export default Dashboard;