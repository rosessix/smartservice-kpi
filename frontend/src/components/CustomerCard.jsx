import React from 'react'

export const CustomerCard = ({ customers, startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Normalize the start date to the beginning of the day (midnight)
    start.setHours(0, 0, 0, 0); // Set to 00:00:00
    end.setHours(23, 59, 59, 999); // Set to 23:59:59

    const getCustomerCounts = () => {
        // Filter customers who were created up until the startDate
        const customersUpUntilStart = customers.filter(customer => {
            const customerCreatedDate = new Date(customer.createdTime);

            // Check if the date is valid
            if (isNaN(customerCreatedDate.getTime())) {
                return false;  // Skip invalid dates
            }

            return customerCreatedDate < start;
        });

        // Filter customers created between the startDate and endDate
        const customersInRange = customers.filter(customer => {
            const customerCreatedDate = new Date(customer.createdTime);

            // Check if the date is valid
            if (isNaN(customerCreatedDate.getTime())) {
                return false;  // Skip invalid dates
            }

            return customerCreatedDate >= start && customerCreatedDate <= end;
        });

        const baselineCount = customersUpUntilStart.length;
        const gainedCount = customersInRange.length;

        const percentageRise = baselineCount > 0
            ? ((gainedCount / baselineCount) * 100)
            : 0;

        return {
            baselineCount,
            gainedCount,
            percentageRise
        };
    };

    // Get counts and percentage rise
    const { baselineCount, gainedCount, percentageRise } = getCustomerCounts();

    return (
        <div className="bg-neutral-100 w-96 h-48 rounded-md p-2">
            <p className="text-sm">Kunder - fra {start.toLocaleDateString()} til {end.toLocaleDateString()}</p>
            <h1 className="font-bold text-[50px] text-center">{gainedCount}</h1>
            <p className="text-center text-green-700 font-bold">+{percentageRise.toFixed(2)}% stigning</p>
            <p className="text-sm">Totalt før periodens begyndelse: {baselineCount}</p>
            <p className="text-sm">Totalt nu: {baselineCount + gainedCount}</p>
        </div>
    );
};