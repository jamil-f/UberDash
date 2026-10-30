export function getCompletedTrips(trips) {
    return trips.filter((trip) => trip.completed);
}

export function getTotalTrips(trips) {
    return getCompletedTrips(trips).length;
}

export function getTotalSpent(trips) {
    return getCompletedTrips(trips).reduce(
        (total, trip) => total + trip.fare,
        0
    );
}

export function getAverageFare(trips) {
    const completedTrips = getCompletedTrips(trips);

    if (completedTrips.length === 0) {
        return 0;
    }
    
    const totalSpent = getTotalSpent(completedTrips);
    return totalSpent / completedTrips.length;
}

export function getTotalDistance(trips) {
    return getCompletedTrips(trips).reduce(
        (total, trip) => total + trip.distance,
        0
    );
}

export function getMonthlySpending(trips) {
   const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
   ];
   
   
   
    const monthlyTotals = Array(12).fill(0);

    const completedTrips = getCompletedTrips(trips);

    completedTrips.forEach((trip) => {
        const date = new Date(trip.requestTime);
        
        if (Number.isNaN(date.getTime())) {
            return;
        }

        monthlyTotals[date.getMonth()] += trip.fare;
    });
    
    return months.map((month, index) => ({
        month,
        spending: monthlyTotals[index],
    }));
}

export function getRideTypeBreakdown(trips) {
    const completedTrips = getCompletedTrips(trips);

    const rideTypeCounts = {};

    completedTrips.forEach((trip) => {
        const rideType = trip.productType || "Unknown";

        if (!rideTypeCounts[rideType]) {
            rideTypeCounts[rideType] = 0;
        }

        rideTypeCounts[rideType] += 1;
    });

    const totalTrips = completedTrips.length;

    return Object.entries(rideTypeCounts)
        .map(([type, count]) => ({
            type,
            count,
            percentage: 
            totalTrips === 0
                ? 0
                : (count / totalTrips) * 100,
        }))
        .sort((a, b) => b.count - a.count);
}

export function getTripHistory(trips) {
    return getCompletedTrips(trips)
        .filter((trip) => trip.requestTime)
        .sort(
            (a, b) =>
                new Date(b.requestTime) - new Date(a.requestTime)
        );
}

export function getTotalRideTime(trips) {
    const totalSeconds = getCompletedTrips(trips).reduce(
        (total, trip) => total + trip.duration,
        0
    );

    return totalSeconds / 3600;
}

export function getLongestTrip(trips) {
    const completedTrips = getCompletedTrips(trips);

    if (completedTrips.length === 0) {
        return 0;
    }

    return Math.max(
        ...completedTrips.map((trip) => trip.distance)
    );
}

export function getMostExpensiveTrip(trips) {
    const completedTrips = getCompletedTrips(trips);

    if (completedTrips.length === 0) {
        return 0;
    }

    return Math.max(
        ...completedTrips.map((trip) => trip.fare)
    );
}

export function getAverageTripDistance(trips) {
    const completedTrips = getCompletedTrips(trips);

    if(completedTrips.length === 0) {
        return 0;
    }

    const totalDistance = getTotalDistance(completedTrips);

    return totalDistance / completedTrips.length;
}

export function getAirportTrips(trips) {
    return getCompletedTrips(trips).filter(
        (trip) => trip.airportTrip
    ).length;
}