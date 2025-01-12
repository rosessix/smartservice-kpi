import React, { useEffect, useRef, useState } from 'react'
import { ServiceDrivingCard } from './ServiceDrivingCard'
import { fetchBase } from '../../utils/fetchBase';
import ServiceDrivingChart from './ServiceDrivingChart';

export const ServiceDrivingContainer = ({startDate, endDate}) => {
    const [drivingData, setDrivingData] = useState([])
    const fetchDrivings = async () => {
        const json = await fetchBase({
            endpoint: 'servicedrivings',
            controller: 'kpi',
        });
        setDrivingData(json);
    };

    useEffect(() => {
        fetchDrivings()
    }, [])
    
    return (
        <div class="flex gap-4 flex-col p-2">
            <div className='w-[48rem]'>
                {drivingData.length == 0 ? <h1 class="text-2xl">Ingen data</h1> : 
                    <ServiceDrivingChart drivings={drivingData} startDate={startDate} endDate={endDate}/>
                }
            </div>
            <ServiceDrivingCard drivings={drivingData} startDate={startDate} endDate={endDate}/>
        </div>
    )
}