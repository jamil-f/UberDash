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