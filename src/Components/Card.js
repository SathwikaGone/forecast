import React from "react";

export default function Card({ data }) {
  console.log("props", data);
  return (
    <div className="card">
      <h5 className="card-header text-white bg-secondary mb-3"> {data.name}</h5>
      <div className="card-body">
        <img
          src={data.icon}
          className="card-img-top"
          style={{ width: "150px" }}
          alt="weather"
        />
        <div className="displayRows">
          <p className="card-text">
            <strong>Temperature</strong> {data.temperature}
            {"\u00B0"}
            {data.temperatureUnit}
          </p>
          <p className="card-text">
            <strong>Detailed forecast:</strong> {data.detailedForecast}
          </p>
        </div>
      </div>
    </div>
  );
}
