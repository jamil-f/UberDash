import { useState } from "react";
import Papa from "papaparse";
import FileUpload from "./components/FileUpload";
import { normalizeUberData } from "./utils/parseUberCSV";
import {
  getTotalTrips,
  getTotalSpent,
  getTotalDistance,
  getAverageFare,
} from "./utils/analytics";

function App() {
  const [trips, setTrips] = useState([]);

  const totalTips = getTotalTrips(trips);
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
         <p>Total CSV Records: {trips.length}</p>

         <p>Completed Trips: {totalTips}</p>

         <p>Lifetime Fare: ${totalSpent.toFixed(2)}</p>

         <p>Total Distance: {totalDistance.toFixed(1)} miles</p>

         <p>Average Fare: ${averageFare.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;