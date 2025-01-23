import React, { useEffect, useRef, useState } from 'react'
import { fetchBase } from '../../utils/fetchBase'
import { HeatPumpsCard } from './HeatPumpsCard';
import HeatPumpsChart from './HeatPumpsChart';

export const HeatPumpsContainer = ({heatpumpsData, startDate, endDate}) => {
    return (
        <div class="flex gap-4 flex-col bg-white shadow-md rounded-lg p-2">
            <div className='w-full'>
                <HeatPumpsChart pumps={heatpumpsData} startDate={startDate} endDate={endDate}/>
            </div>
            {/* <HeatPumpsCard pumps={heatpumpsData} startDate={startDate} endDate={endDate}/> */}
        </div>
    )
}