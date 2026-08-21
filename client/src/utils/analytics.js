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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
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