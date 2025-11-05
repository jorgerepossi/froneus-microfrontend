import React, {useState, useEffect} from "react"
import { StatsGridProps } from "../types"
import { Card } from "primereact/card"
import { Chart } from 'primereact/chart';
import { useStatsMetrics } from "@/shared/hooks/useStatsMetrics";

const StatsGrid = ({
    totalCampaigns,
    totalContacts,
    waitingCampaigns,
    activeCampaigns,
    finishedCampaigns,
    waitingContacts,
    activeContacts,
    finishedContacts

}: StatsGridProps) => {
    
    const { 
        campaignStatusChartData, 
        campaignStatusChartOptions, 
        contactStatusChartData, 
        contactStatusChartOptions, 
        generalChartData, 
        generalChartOptions
    } = useStatsMetrics({
        totalCampaigns,
        totalContacts,
        waitingCampaigns,
        activeCampaigns,
        finishedCampaigns,
        waitingContacts,
        activeContacts,
        finishedContacts
    });

    return (
        <div className='dashboard_wrapper--stats'>
  
            <Card className="box" title="Generales">
                  <Chart 
                  type="doughnut" 
                  data={generalChartData} 
                  options={generalChartOptions} 
                  className="w-full md:w-30rem" 
                  />
            </Card>

 
            <Card className="box" title="Campañas por Estado">
                <Chart 
                  type="doughnut" 
                  data={campaignStatusChartData} 
                  options={campaignStatusChartOptions} 
                  className="w-full md:w-30rem" 
                />
            </Card>

         
            <Card className="box" title="Contactos por Estado de Campaña">
                 <Chart 
                  type="doughnut" 
                  data={contactStatusChartData} 
                  options={contactStatusChartOptions} 
                  className="w-full md:w-30rem" 
                />
            </Card>
        </div>
    )
}

export {
    StatsGrid
}