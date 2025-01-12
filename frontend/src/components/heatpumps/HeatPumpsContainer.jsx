import React, { useEffect, useRef, useState } from 'react'
import { fetchBase } from '../../utils/fetchBase'
import { HeatPumpsCard } from './HeatPumpsCard';
import HeatPumpsChart from './HeatPumpsChart';

export const HeatPumpsContainer = ({startDate, endDate}) => {
    const [heatpumpsData, setHeatpumpsData] = useState([])
    const fetchPumps = async () => {
        const json = await fetchBase({
            endpoint: 'heatpumps',
            controller: 'kpi',
        });
        setHeatpumpsData(json);
    };

    useEffect(() => {
        if (heatpumpsData.length == 0) {
            fetchPumps()
        }
    }, [])
    
    return (
        <div class="flex gap-4 flex-col p-2">
            <div className='w-[48rem]'>
                {heatpumpsData.length == 0 ? <h1 class="text-2xl">Ingen data</h1> : 
                    <HeatPumpsChart pumps={heatpumpsData} startDate={startDate} endDate={endDate}/>
                }
            </div>
            <HeatPumpsCard pumps={heatpumpsData} startDate={startDate} endDate={endDate}/>
        </div>
    )
}