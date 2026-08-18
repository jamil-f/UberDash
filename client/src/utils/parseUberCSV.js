export function normalizeUberTrip(row) {
    return {
        city: row.city_name,
        currency: row.currency_code,

        productType: row.product_type_name,

        requestTime: row.request_timestamp_local,
        startTime: row.begintrip_timestamp_local,
        dropoffTime: row.dropoff_timestamp_local,

        pickupAddress: row.begintrip_address,
        dropoffAddress: row.dropoff_address,

        distance: Number(row.trip_distance_miles) || 0,
        duration: Number(row.trip_duration_seconds) || 0,

        fare: Number(row.fare_amount) || 0,

        status: row.status,
        completed: row.is_completed === "true",

        airportTrip: row.is_airport_trip === "true",
        scheduledTrip: row.is_scheduled_trip === "true",
    };
}

export function normalizeUberData(rows) {
    return rows.map(normalizeUberTrip);
}