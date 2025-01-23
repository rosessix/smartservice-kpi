import React, { useEffect, useRef, useState } from 'react'
import { ServiceDrivingCard } from './ServiceDrivingCard'
import { fetchBase } from '../../utils/fetchBase';
import ServiceDrivingChart from './ServiceDrivingChart';

export const ServiceDrivingContainer = ({drivingData, startDate, endDate}) => {
    return (
        <div class="flex gap-4 flex-col bg-white shadow-md rounded-lg p-2">
            <div className='w-full'>
                <ServiceDrivingChart drivings={drivingData} startDate={startDate} endDate={endDate}/>
            </div>
            {/* <ServiceDrivingCard drivings={drivingData} startDate={startDate} endDate={endDate}/> */}
        </div>
    )
}