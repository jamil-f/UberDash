import { useState } from "react";
import "./SpendingGauge.css";

function polarToCartesian(cx, cy, radius, angle) {
  const angleInRadians = (angle * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy - radius * Math.sin(angleInRadians),
  };
}

function createArcPath(
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle
) {
  const outerStart = polarToCartesian(
    cx,
    cy,
    outerRadius,
    startAngle
  );

  const outerEnd = polarToCartesian(
    cx,
    cy,
    outerRadius,
    endAngle
  );

  const innerStart = polarToCartesian(
    cx,
    cy,
    innerRadius,
    startAngle
  );

  const innerEnd = polarToCartesian(
    cx,
    cy,
    innerRadius,
    endAngle
  );

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${outerRadius} ${outerRadius} 0 0 1
      ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 0 0
      ${innerStart.x} ${innerStart.y}
    Z
  `;
}

function SpendingGauge({ data }) {
  const [selectedMonth, setSelectedMonth] = useState(0);

  if (!data || data.length === 0) {
    return null;
  }

  const centerX = 300;
  const centerY = 290;

  const outerRadius = 240;
  const innerRadius = 165;

  const degreesPerMonth = 180 / data.length;

  const maxSpending = Math.max(
    ...data.map((item) => item.spending),
    1
  );

  const selectedAngle =
    180 -
    selectedMonth * degreesPerMonth -
    degreesPerMonth / 2;

  const needleRotation = 90 - selectedAngle;

  const selectedData = data[selectedMonth];

  return (
    <section className="spending-gauge">
      <div className="gauge-heading">
        <h2>Monthly Spending</h2>

        <p>
          Hover over a month to explore your spending.
        </p>
      </div>

      <div className="gauge-container">
        <svg
          className="gauge-svg"
          viewBox="0 0 600 330"
          aria-label="Monthly Uber spending gauge"
        >
          {data.map((item, index) => {
            const startAngle =
              180 - index * degreesPerMonth;

            const endAngle =
              startAngle - degreesPerMonth;

            const middleAngle =
              (startAngle + endAngle) / 2;

            const labelPosition = polarToCartesian(
              centerX,
              centerY,
              205,
              middleAngle
            );

            const spendingIntensity =
              item.spending / maxSpending;

            const isSelected =
              selectedMonth === index;

            return (
              <g key={item.month}>
                <path
                  d={createArcPath(
                    centerX,
                    centerY,
                    innerRadius,
                    outerRadius,
                    startAngle,
                    endAngle
                  )}
                  className={
                    isSelected
                      ? "gauge-segment selected"
                      : "gauge-segment"
                  }
                  style={{
                    opacity: isSelected
                      ? 1
                      : 0.35 +
                        spendingIntensity * 0.55,
                  }}
                  onMouseEnter={() =>
                    setSelectedMonth(index)
                  }
                  onClick={() =>
                    setSelectedMonth(index)
                  }
                />

                <text
                  x={labelPosition.x}
                  y={labelPosition.y}
                  className={
                    isSelected
                      ? "month-label selected"
                      : "month-label"
                  }
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                >
                  {item.month}
                </text>
              </g>
            );
          })}

          <g
            className="gauge-needle"
            style={{
              transform: `rotate(${needleRotation}deg)`,
              transformOrigin: `${centerX}px ${centerY}px`,
            }}
          >
            <line
              x1={centerX}
              y1={centerY}
              x2={centerX}
              y2={centerY - 135}
            />
          </g>

          <circle
            cx={centerX}
            cy={centerY}
            r="16"
            className="needle-center"
          />

          <circle
            cx={centerX}
            cy={centerY}
            r="6"
            className="needle-center-inner"
          />
        </svg>

        <div className="gauge-readout">
          <span className="gauge-readout-month">
            {selectedData.month}
          </span>

          <strong className="gauge-readout-value">
            $
            {selectedData.spending.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </strong>

          <span className="gauge-readout-label">
            Monthly Spending
          </span>
        </div>
      </div>
    </section>
  );
}

export default SpendingGauge;