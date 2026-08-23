function TripHistory({ trips }) {
    return (
        <div className="trip-history">
            <h2>Trip History</h2>

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
                    {trips.map((trip, index) => (
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
        </div>
    );
}

export default TripHistory;