import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBase } from '../utils/fetchBase';
import { CustomerCard } from '../components/CustomerCard';
import DatePicker from 'react-datepicker';
import { CustomerChart } from '../components/CustomerChart';

export const DashboardPage = () => {
    const navigate = useNavigate();
    const [customersData, setCustomersData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('2023-10-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [dataCategory, setDataCategory] = useState('customers'); // Default category

    const categories = ['customers', 'heat pumps', 'service drivings']; // Add more as needed

    const fetchCustomers = async () => {
        const json = await fetchBase({
            endpoint: 'customers',
            controller: 'kpi',
        });
        setCustomersData(json);
    };

    useEffect(() => {
        const hasToken = localStorage.getItem('token');
        if (!hasToken) {
            navigate('/login');
        }

        fetchCustomers();
    }, []);

    const renderView = () => {
        switch (dataCategory) {
            case 'customers':
                return (
                    <>
                        <div className="w-[48rem]">
                            <CustomerChart customers={customersData} startDate={startDate} endDate={endDate} />
                        </div>
                        <CustomerCard customers={customersData} startDate={startDate} endDate={endDate} />
                    </>
                );
            case 'heat pumps':
                return <p>Heat Pumps View (coming soon)</p>;
            case 'service drivings':
                return <p>Service Drivings View (coming soon)</p>;
            default:
                return <p>Unknown category</p>;
        }
    };

    return (
        <>
            <p>Dashboard</p>
            <div className="flex flex-row gap-4 bg-neutral-200 p-2">
                <div>
                    <p>Start dato:</p>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div>
                    <p>Slut dato:</p>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
                <div>
                    <p>Data kategori</p>
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
        </>
    );
};
