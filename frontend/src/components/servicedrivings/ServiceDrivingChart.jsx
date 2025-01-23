import { ColumnChart } from '@opd/g2plot-react';
import React, { useMemo } from 'react';

const ServiceDrivingChart = ({ drivings, startDate, endDate }) => {
    const { chartData, maxValue } = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredDrivings = drivings.filter(driving => {
            const dateDrived = new Date(driving.fields?.Start); // Safely access fields.Start
            console.log(driving.fields)
            return dateDrived >= start && dateDrived <= end;
        });

        const monthlyData = filteredDrivings.reduce((acc, drive) => {
            const dateDrived = new Date(drive.fields?.Start);
            const month = dateDrived.getMonth();
            const year = dateDrived.getFullYear();

            // Format the key as 'YYYY-MM'
            const monthKey = `${year}-${month + 1 < 10 ? '0' + (month + 1) : month + 1}`;

            // Increment the count for this month
            acc[monthKey] = (acc[monthKey] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(monthlyData)
            .map(monthKey => ({
                name: 'Antal kørsler',
                date: monthKey,
                value: monthlyData[monthKey],
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const max = Math.max(...data.map(item => item.value), 0) + 5;

        return { chartData: data, maxValue: max };
    }, [drivings, startDate, endDate]); // Add dependencies for useMemo

    const chart = {
        height: 350,
        width: 150,
        autoFit: true,
        xField: 'date',
        yField: 'value',
        smooth: true,
        seriesField: 'name',
        meta: {
            value: {
                max: maxValue,
            },
        },
        data: chartData, // Ensure this is properly formatted
        color: '#8800CC', // Set a single color for the bars

    };

    return maxValue === 0 ? (
        <h1>Der er ingen drivings for given periode.</h1>
    ) : (
        <ColumnChart {...chart} />
    );
};

export default ServiceDrivingChart;
