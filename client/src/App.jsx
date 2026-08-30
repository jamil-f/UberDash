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
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: (results) => {
        console.log("Raw Uber data:", results.data);

        const normalizedTrips = normalizeUberData(results.data);

        console.log("Normalized Uber data::", normalizedTrips);

        setTrips(normalizedTrips);
      },

      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };


  return (
    <div>
      <h1>Uber Analytics</h1>

      <FileUpload onFileUpload={handleFileUpload} />

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