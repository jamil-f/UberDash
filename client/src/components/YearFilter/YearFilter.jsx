import "./YearFilter.css";



function YearFilter({ selectedYear, onYearChange }) {
  return (
    <div className="year-filter">
      <button
        onClick={() => onYearChange("all")}
      >
        All Time
      </button>

      <button
        onClick={() => onYearChange("2026")}
      >
        2026
      </button>

      <button
        onClick={() => onYearChange("2025")}
      >
        2025
      </button>

      <button
        onClick={() => onYearChange("2024")}
      >
        2024
      </button>

      <button
        onClick={() => onYearChange("2023")}
      >
        2023
      </button>
    </div>
  );
}

export default YearFilter;