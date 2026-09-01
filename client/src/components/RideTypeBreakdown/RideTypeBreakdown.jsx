import "./RideTypeBreakdown.css";

function RideTypeBreakdown({ data }) {
  return (
    <div className="ride-type-breakdown">
      <h2>Ride Type Breakdown</h2>

      {data.map((rideType) => (
        <div
          className="ride-type-row"
          key={rideType.type}
        >
          <div>
            <strong>{rideType.type}</strong>
          </div>

          <div>
            {rideType.count} trips
          </div>

          <div>
            {rideType.percentage.toFixed(1)}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default RideTypeBreakdown;