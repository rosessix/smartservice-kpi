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
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <p className="text-gray-500 text-sm mb-2">
                Kunder - fra {start.toLocaleDateString()} til {end.toLocaleDateString()}
            </p>
            <h1 className="font-bold text-5xl text-center text-gray-800">{gainedCount}</h1>
            <p
                className={`text-center font-bold ${
                    percentageRise >= 0 ? "text-green-600" : "text-red-600"
                } mt-2`}
            >
                {percentageRise >= 0 ? "+" : ""}
                {percentageRise.toFixed(2)}% stigning
            </p>
            <div className="mt-4 border-t pt-4 text-gray-600 text-sm">
                <p className="flex justify-between">
                    <span>Totalt før periodens begyndelse:</span>
                    <span>{baselineCount}</span>
                </p>
                <p className="flex justify-between">
                    <span>Totalt nu:</span>
                    <span>{baselineCount + gainedCount}</span>
                </p>
            </div>
        </div>
    );
    
};