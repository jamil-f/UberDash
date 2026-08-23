import { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";
import { normalizeUberData } from "./utils/parseUberCSV";
import StatCard from "./components/StatCard";
import "./App.css";
import YearFilter from "./components/YearFilter";
import SpendingChart from "./components/SpendingChart";
import RideTypeBreakdown from "./components/RideTypeBreakdown";
import TripHistory from "./components/TripHistory";

import {
  getTotalTrips,
  getTotalSpent,
  getTotalDistance,
  getAverageFare,
  getMonthlySpending,
  getRideTypeBreakdown,
  getTripHistory
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
          <SpendingChart data={monthlySpending} />
          <RideTypeBreakdown data={rideTypeBreakdown} />
          <TripHistory trips={tripHistory.slice(0, 10)} />
        </div>
      )}
    </div>
  );
}

export default App;