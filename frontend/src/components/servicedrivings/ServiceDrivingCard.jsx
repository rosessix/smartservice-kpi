import React from 'react'

export const ServiceDrivingCard = ({ drivings, startDate, endDate }) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    start.setHours(0,0,0,0)
    end.setHours(23, 59, 59, 999)

    const getDrivingsCount = () => {
        const drivingsUpUntillStart = drivings.filter((driving) => {
            const created = new Date(driving.fields?.Start);

            if (isNaN(created.getTime())) {
                return false;
            }

            return created < start;
        });

        const drivingsInRange = drivings.filter((driving) => {
            const drivingCreatedDate = new Date(driving.fields?.Start);

            // Check if the date is valid
            if (isNaN(drivingCreatedDate.getTime())) {
                return false; // Skip invalid dates
            }

            return drivingCreatedDate >= start && drivingCreatedDate <= end;
        });

        const baselineCount = drivingsUpUntillStart.length;
        const gainedCount = drivingsInRange.length;

        const percentageRise = baselineCount > 0
            ? ((gainedCount / baselineCount) * 100)
            : 0;

        // Explicitly return the values
        return {
            baselineCount,
            gainedCount,
            percentageRise,
        };
    };

    // Destructure the returned object
    const { baselineCount, gainedCount, percentageRise } = getDrivingsCount();

    return (
        <div className="bg-white shadow-md rounded-lg p-2 w-80">
            <p className="text-gray-500 text-sm mb-2">
                Kørsler i perioden {start.toLocaleDateString()} til {end.toLocaleDateString()}
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