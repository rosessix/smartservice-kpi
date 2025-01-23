import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBase } from '../utils/fetchBase';
import { CustomerCard } from '../components/CustomerCard';
import DatePicker from 'react-datepicker';
import { CustomerChart } from '../components/CustomerChart';
import {ServiceDrivingContainer} from '../components/servicedrivings/ServiceDrivingContainer';
import { HeatPumpsContainer } from '../components/heatpumps/HeatPumpsContainer';
import { ServiceDrivingCard } from '../components/servicedrivings/ServiceDrivingCard';
import { HeatPumpsCard } from '../components/heatpumps/HeatPumpsCard';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date('2023-10-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [dataCategory, setDataCategory] = useState('customers'); // Default category
    const categories = ['customers', 'heat pumps', 'service drivings']; // Add more as needed
    
    // data categories
    const [customersData, setCustomersData] = useState([]);
    const [heatpumpsData, setHeatpumpData] = useState([]);
    const [serviceDrivingData, setserviceDrivingData] = useState([]);
    
    const fetchCustomers = async () => {
        const json = await fetchBase({
            endpoint: 'customers',
            controller: 'kpi',
        });
        setCustomersData(json);
    };

    const fetchHeatPumps = async () => {
        const json = await fetchBase({
            endpoint: 'heatpumps',
            controller: 'kpi',
        });
        setHeatpumpData(json);
    }

    const fetchServiceDrivings = async () => {
        const json = await fetchBase({
            endpoint: 'servicedrivings',
            controller: 'kpi',
        });
        setserviceDrivingData(json);
    }

    useEffect(() => {
        const hasToken = localStorage.getItem('token');
        if (!hasToken) {
            navigate('/login');
        }

        fetchCustomers();
        fetchHeatPumps();
        fetchServiceDrivings();
    }, []);

    return (
        <div class="bg-neutral-200 h-screen w-screen p-2">
            <div className="flex flex-row gap-4 bg-neutral-200 p-2">
                <div class="bg-white p-1 rounded-md">
                    <p class="text-gray-500">Start dato:</p>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div class="bg-white p-1 rounded-md">
                    <p class="text-gray-500">Slut dato:</p>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 [grid-template-rows:repeat(2,_0.7fr)] w-full gap-2">
                <div class="bg-white shadow-md rounded-lg p-2">
                    <CustomerChart customers={customersData} startDate={startDate} endDate={endDate} />
                </div>
                <HeatPumpsContainer heatpumpsData={heatpumpsData} startDate={startDate} endDate={endDate}/>
                <div class="grid grid-cols-1 [grid-template-rows:repeat(2,_0.7fr)] gap-2 w-full">
                    <CustomerCard customers={customersData} startDate={startDate} endDate={endDate}/>
                    <div class="flex gap-2">
                        <ServiceDrivingCard drivings={serviceDrivingData} startDate={startDate} endDate={endDate}/>
                        <HeatPumpsCard pumps={heatpumpsData} startDate={startDate} endDate={endDate}/>
                    </div>
                </div>
                <ServiceDrivingContainer drivingData={serviceDrivingData} startDate={startDate} endDate={endDate}/>
            </div>
        </div>
    );
};
