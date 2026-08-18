import { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";
import { normalizeUberData } from "./utils/parseUberCSV";
import StatCard from "./components/StatCard";
import "./App.css";

import {
  getTotalTrips,
  getTotalSpent,
  getTotalDistance,
  getAverageFare,
} from "./utils/analytics";



function App() {
  const [trips, setTrips] = useState([]);

  const totalTrips = getTotalTrips(trips);
  const totalSpent = getTotalSpent(trips);
  const totalDistance = getTotalDistance(trips);
  const averageFare = getAverageFare(trips);
  
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
         <h2>Your Uber Stats</h2>
         <div className="stats-container">
          <StatCard
            title="Total Trips"
            value={totalTrips}
          />
          <StatCard
            title="Lifetime Fare"
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
        </div>
      )}
    </div>
  );
}

export default App;