import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBase } from '../utils/fetchBase';
import { CustomerCard } from '../components/CustomerCard';
import DatePicker from 'react-datepicker';
import { CustomerChart } from '../components/CustomerChart';
import {ServiceDrivingContainer} from '../components/servicedrivings/ServiceDrivingContainer';
import { HeatPumpsContainer } from '../components/heatpumps/HeatPumpsContainer';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [customersData, setCustomersData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2023-10-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [dataCategory, setDataCategory] = useState('customers'); // Default category
    const categories = ['customers', 'heat pumps', 'service drivings']; // Add more as needed

    const hasFetched = useRef(false)

    const fetchCustomers = async () => {
        hasFetched.current = false
        const json = await fetchBase({
            endpoint: 'customers',
            controller: 'kpi',
        });
        setCustomersData(json);
        hasFetched.current = true
    };

    useEffect(() => {
        const hasToken = localStorage.getItem('token');
        if (!hasToken) {
            navigate('/login');
        }

        fetchCustomers();
    }, []);

    const renderView = () => {
        if (!hasFetched.current) {
            return <h1 class="text-2xl">Loading...</h1>
        }
        switch (dataCategory) {
            case 'customers':
                return (
                    <div class="flex gap-4 flex-col p-2">
                        <div className="w-[48rem]">
                            <CustomerChart customers={customersData} startDate={startDate} endDate={endDate} />
                        </div>
                        <div class="flex flex-row gap-2">
                            <CustomerCard customers={customersData} startDate={startDate} endDate={endDate} />
                        </div>
                    </div>
                );
            case 'heat pumps':
                return <HeatPumpsContainer startDate={startDate} endDate={endDate}/>
            case 'service drivings':
                return <ServiceDrivingContainer startDate={startDate} endDate={endDate}/>;
            default:
                return <p>Unknown category</p>;
        }
    };

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
                <div class="bg-white p-2 rounded-md">
                    <p class="text-gray-500">Data kategori</p>
                    <select
                        value={dataCategory}
                        onChange={(e) => setDataCategory(e.target.value)}
                        className="border rounded"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-4">{renderView()}</div>
        </div>
    );
};
