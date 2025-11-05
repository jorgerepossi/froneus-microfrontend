import React, { useEffect } from 'react';
import { useCampaignStore } from "../../../shared/store"
import { useDashboardStats } from '../hooks/useDashboardStats';
import { StatsGrid } from './StatsGrid';
import { RecentTable } from './RecentTable';
import { BreadCrumb } from 'primereact/breadcrumb';


const Dashboard = () => {

    const { campaigns, initializeMockData } = useCampaignStore();

    const stats = useDashboardStats();

    const items = [
        { label: 'Dashboard' }
    ];

    const home = { 
        icon: 'pi pi-home', 
        url: '/' 
    };

    useEffect(() => {
        if (campaigns.length === 0) {
            initializeMockData();
        }
    }, []);
   

    console.log(stats)

    return (
        <div  className='dashboard'>
           <BreadCrumb model={items} home={home} />
             
            <StatsGrid {...stats} />
            <RecentTable  campaigns={campaigns} />
        </div>
    )
}


export default Dashboard;