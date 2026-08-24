import { useState } from "react";
import "./TripHistory.css";


function TripHistory({ trips }) {
    const [visibleTrips, setVisibleTrips] = useState(10);

    const displayedTrips = trips.slice(0, visibleTrips);

    return (
        <div className="trip-history">
            <h2>Trip History</h2>
            <p>
                Showing {Math.min(visibleTrips, trips.length)} of {trips.length} trips
            </p>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Ride Type</th>
                        <th>Fare</th>
                        <th>Distance</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedTrips.map((trip, index) => (
                        <tr key={index}>
                            <td>
                                {new Date(trip.requestTime).toLocaleDateString()}
                            </td>
                            <td>
                                {trip.productType}
                            </td>
                            <td>
                                ${trip.fare.toFixed(2)}
                            </td>
                            <td>
                                {trip.distance.toFixed(2)} mi
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
            {visibleTrips < trips.length && (
                <button
                    className="load-more-button"
                    onClick={() => setVisibleTrips(visibleTrips + 10)}
                >
                    Show More Trips
                </button>
            )}
            {visibleTrips > 10 && (
                <button
                    className="show-less-button"
                    onClick={() => setVisibleTrips(visibleTrips - 10)}
                >
                    Show Less Trips
                </button>
            )}
        </div>
    );
}

export default TripHistory;