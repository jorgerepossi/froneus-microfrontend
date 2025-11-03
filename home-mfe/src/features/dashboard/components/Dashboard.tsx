import React, { useEffect } from 'react';
import { useCampaignStore } from "../../../shared/store"
import { useDashboardStats } from '../hooks/useDashboardStats';
import { StatsGrid } from './StatsGrid';
import { RecentTable } from './RecentTable';


const Dashboard = () => {

    const { campaigns, initializeMockData } = useCampaignStore();
    const stats = useDashboardStats();

    useEffect(() => {
        if (campaigns.length === 0) {
            initializeMockData();
        }
    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <StatsGrid {...stats} />
            <RecentTable  campaigns={campaigns} />
        </div>
    )
}


export default Dashboard;