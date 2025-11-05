import { StatsGridProps } from "@/features/dashboard/types";
import { useState, useEffect } from "react";



interface StatsMetrics {
    generalChartData: any;
    generalChartOptions: any;
    campaignStatusChartData: any;
    campaignStatusChartOptions: any;
    contactStatusChartData: any;
    contactStatusChartOptions: any;
}

export const useStatsMetrics = ({
    totalCampaigns,
    totalContacts,
    waitingCampaigns,
    activeCampaigns,
    finishedCampaigns,
    waitingContacts,
    activeContacts,
    finishedContacts
}: StatsGridProps): StatsMetrics => {
    
    
    const [metrics, setMetrics] = useState<StatsMetrics>({
        generalChartData: {},
        generalChartOptions: {},
        campaignStatusChartData: {},
        campaignStatusChartOptions: {},
        contactStatusChartData: {},
        contactStatusChartOptions: {},
    });

   
    useEffect(() => {
        if (typeof document === 'undefined') return;

        const documentStyle = getComputedStyle(document.documentElement);
        
 
        const colorActive = documentStyle.getPropertyValue('--green-500');
        const colorWaiting = documentStyle.getPropertyValue('--orange-500');
        const colorFinished = documentStyle.getPropertyValue('--blue-500');
        
        const optionsDoughnut = {
            cutout: '60%',
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        };
        const generalData = {
            labels: ['Campañas Totales', 'Contactos Totales'], 
            datasets: [
                {
                    data: [totalCampaigns, totalContacts],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--cyan-500'), 
                        documentStyle.getPropertyValue('--purple-500'), 
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--cyan-400'), 
                        documentStyle.getPropertyValue('--purple-400'), 
                    ]
                }
            ]
        };

        const campaignStatusData = {
            labels: ['En Espera', 'Activas', 'Finalizadas'], 
            datasets: [
                {
                    data: [waitingCampaigns, activeCampaigns, finishedCampaigns],
                    backgroundColor: [
                        colorWaiting, 
                        colorActive, 
                        colorFinished
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--orange-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--blue-400'), 
                    ]
                }
            ]
        };
        
        const contactStatusData = {
            labels: ['En Campañas en Espera', 'En Campañas Activas', 'En Campañas Finalizadas'], 
            datasets: [
                {
                    data: [waitingContacts, activeContacts, finishedContacts],
                    backgroundColor: [
                        colorWaiting, 
                        colorActive, 
                        colorFinished
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--orange-400'), 
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };

        setMetrics({
            generalChartData: generalData,
            generalChartOptions: optionsDoughnut,
            campaignStatusChartData: campaignStatusData,
            campaignStatusChartOptions: optionsDoughnut,
            contactStatusChartData: contactStatusData,
            contactStatusChartOptions: optionsDoughnut,
        });

    }, [
        totalCampaigns, totalContacts, 
        waitingCampaigns, activeCampaigns, finishedCampaigns,
        waitingContacts, activeContacts, finishedContacts
    ]); 

    return metrics;
};
