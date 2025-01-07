import React, { useEffect, useState, useMemo} from 'react';
import { ColumnChart } from '@opd/g2plot-react';

export const CustomerChart = ({ customers, startDate, endDate }) => {
    const { chartData, maxValue } = useMemo(() => {
        // Parse start and end dates into Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Filter customers within the start and end date range
        const filteredCustomers = customers.filter(customer => {
            const createdDate = new Date(customer.createdTime);
            return createdDate >= start && createdDate <= end;
        });

        // Create a map to group customers by month
        const monthlyData = filteredCustomers.reduce((acc, customer) => {
            const createdDate = new Date(customer.createdTime);
            const month = createdDate.getMonth(); // Get the month (0 = Jan, 11 = Dec)
            const year = createdDate.getFullYear(); // Get the year

            // Format the key as 'YYYY-MM'
            const monthKey = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}`;

            // Increment the count for this month
            acc[monthKey] = (acc[monthKey] || 0) + 1;

            return acc;
        }, {});

        // Convert the map into an array of objects and sort it by date
        const data = Object.keys(monthlyData)
            .map(monthKey => ({
                date: monthKey,
                value: monthlyData[monthKey],
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // Calculate the max value
        const max = Math.max(...data.map(item => item.value), 0);

        return { chartData: data, maxValue: max };
    }, [customers, startDate, endDate]);

    const chart = {
        height: 350,
        autoFit: true,
        xField: 'date',
        yField: 'value',
        smooth: true,
        meta: {
            value: {
                max: maxValue,
            },
        },
        data: chartData, // Dynamic data passed here
    };
    
    return maxValue == 0 ? <h1>Der er ingen kunder for given periode.</h1> : <ColumnChart {...chart} />;
};
