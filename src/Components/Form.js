import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./Card";

export default function Forms() {
  const [inputData, setInputData] = useState({ latitude: "", longitude: "" });
  const [data, setData] = useState();
  const [hasError, setHasError] = useState(false);

  const fetchCall = (url) => {
    let myHeader = new Headers();
    myHeader.append("contentType", "application/json");
    return fetch(url, {
      method: "GET",
      header: myHeader,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log("error fetching", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    try {
      const url = `https://api.weather.gov/points/${inputData.latitude},${inputData.longitude}`;
      const results = await fetchCall(url);
      const response = await fetchCall(results.properties.forecast);
      const Week = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let date = new Date();
      date.setDate(new Date().getDate() + 1);
      const day = Week[date.getDay()];
      const weather = response?.properties.periods.filter((item) =>
        item.name.includes(day)
      );
      setData(weather);
    } catch {
      setHasError(true);
    }
  };

  return (
    <div>
      <h1 style={{ margin: "10px", color: "white" }}>Weather Forecast</h1>
      {hasError && (
        <div className="alert alert-warning">
          Unable to fetch the required data. Please try again later!!
        </div>
      )}
      <form className="formStyle">
        <div className="form-group">
          <label
            style={{
              color: "white",
              fontSize: "20px",
              margin: "0 10px",
              minWidth: "100px",
            }}
          >
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            className="form-control"
            placeholder="Enter latitude"
            onChange={(e) =>
              setInputData({ ...inputData, latitude: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label
            style={{
              color: "white",
              fontSize: "20px",
              margin: "0 10px",
              minWidth: "100px",
            }}
          >
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            className="form-control"
            placeholder="Enter longitude"
            onChange={(e) =>
              setInputData({ ...inputData, longitude: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
      <div className="cardList">
        {data && !hasError && data.map((item) => <Card data={item} />)}
      </div>
    </div>
  );
}
