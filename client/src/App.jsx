import { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";
import { normalizeUberData } from "./utils/parseUberCSV";
import StatCard from "./components/StatCard/StatCard";
import "./App.css";
import YearFilter from "./components/YearFilter/YearFilter";
import SpendingChart from "./components/SpendingChart";
import RideTypeBreakdown from "./components/RideTypeBreakdown";
import TripHistory from "./components/TripHistory/TripHistory";

import {
  getTotalTrips,
  getTotalSpent,
  getTotalDistance,
  getAverageFare,
  getMonthlySpending,
  getRideTypeBreakdown,
  getTripHistory,
  getTotalRideTime,
  getLongestTrip,
  getMostExpensiveTrip,
  getAverageTripDistance,
  getAirportTrips
} from "./utils/analytics";



function App() {
  const [trips, setTrips] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");  
  const [uploadError, setUploadError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  
    const availableYears = [
    ...new Set(
      trips
      .map((trip) => new Date(trip.requestTime).getFullYear())
      .filter((year) => !Number.isNaN(year))
    ),
  ].sort((a, b) => b - a);

  const filteredTrips = 
  selectedYear === "all"
    ? trips
    : trips.filter((trip) => {
        const tripYear = new Date(trip.requestTime).getFullYear();
        return tripYear === Number(selectedYear);
      });


  const totalTrips = getTotalTrips(filteredTrips);
  const totalSpent = getTotalSpent(filteredTrips);
  const totalDistance = getTotalDistance(filteredTrips);
  const averageFare = getAverageFare(filteredTrips);
  const monthlySpending = getMonthlySpending(filteredTrips);
  const rideTypeBreakdown = getRideTypeBreakdown(filteredTrips);
  const tripHistory = getTripHistory(filteredTrips);
  const totalRideTime = getTotalRideTime(filteredTrips);
  const longestTrip = getLongestTrip(filteredTrips);
  const mostExpensiveTrip = getMostExpensiveTrip(filteredTrips);
  const averageTripDistance = getAverageTripDistance(filteredTrips);
  const airportTrips = getAirportTrips(filteredTrips);

  
  const handleFileUpload = (file) => {
    setTrips([]);
    setSelectedYear("all");
    setUploadedFileName("");
    setUploadError("");
    
    if(!file.name.toLowerCase().endsWith(".csv")) {
      setUploadError("Please upload a CSV file.");
      return;
    }

    setIsLoading(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        const requiredColumns = [
          "request_timestamp_local",
          "fare_amount",
          "trip_distance_miles",
          "is_completed",
          "product_type_name",
        ];

        const uploadedColumns = results.meta.fields || [];

        const missingColumns = requiredColumns.filter(
          (column) => !uploadedColumns.includes(column)
        );

        if (missingColumns.length > 0) {
          setUploadError(
            "This file does not appear to be a supported Uber trip export. Please upload trips_data.csv file from within the Rider stats folder from Uber Data."
          );

          setIsLoading(false);
          return;
        }
        console.log("Raw Uber data:", results.data);

        const normalizedTrips = normalizeUberData(results.data);

        console.log("Normalized Uber data::", normalizedTrips);

        setTrips(normalizedTrips);
        setUploadedFileName(file.name);
        setUploadError("")
        setIsLoading(false);
      },

      error: (error) => {
        console.error("Error parsing CSV:", error);

        setUploadError(
          "There was a problem reading this file. Please try again."
        );

        setIsLoading(false);
      },
    });
  };


  return (
    <div>
      <h1>Uber Analytics</h1>

      <FileUpload onFileUpload={handleFileUpload} />

      {isLoading && (
        <p>Processing your Uber data...</p>
      )}

      {uploadError && (
        <p className="upload-error">
          {uploadError}
        </p>
      )}

      {uploadedFileName && !uploadError && (
        <p>
          Loaded: {uploadedFileName}
        </p>
      )}

      {trips.length > 0 && (
        <div>
         <h2>{selectedYear === "all"
            ? "Your Lifetime Uber Stats"
            : `Your ${selectedYear} Uber Stats`}</h2>

          <YearFilter
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
          />
         <div className="stats-container">
          <StatCard
            title="Total Trips"
            value={totalTrips}
          />

          <StatCard
            title="Yearly Fare"
            value={`$${totalSpent.toFixed(2)}`}
          />
          <StatCard
            title="Average Fare"
            value={`$${averageFare.toFixed(2)}`}
          />
          <StatCard
            title="Total Distance"
            value={`${totalDistance.toFixed(2)} miles`}
          />
         </div>
         <div className="stats-container">
            <StatCard
              title="Total Ride Time"
              value={`${totalRideTime.toFixed(1)} hours`}
              />
            <StatCard 
              title="Longest Trip"
              value={`${longestTrip.toFixed(1)} miles`}
          />
            <StatCard 
              title="Most Expensive Trip"
              value={`$${mostExpensiveTrip.toFixed(2)}`}
            />
            <StatCard 
              title="Average Trip Distance"
              value={`${averageTripDistance.toFixed(1)} miles`}
            />
            <StatCard 
              title="Airport Trips"
              value={airportTrips}
            />
         </div>
          <SpendingChart data={monthlySpending} />
          <RideTypeBreakdown data={rideTypeBreakdown} />
          <TripHistory
          key={selectedYear} 
          trips={tripHistory} 
          />
        </div>
      )}
    </div>
  );
}

export default App;