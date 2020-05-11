import React, { useState, useEffect } from "react";
import "./App.css";
import HistoryGraph from "./components/history_graph";
import SensorData from "./components/senso_data";
import moment from "moment";

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastSensorData, setLastSensorData] = useState([]);

  // creating labels to easily set names and colors of lines on recharts
  const labels = [
    {
      name: "sensor1",
      color: "#bb3364",
    },
    {
      name: "sensor2",
      color: "#8884d8",
    },
    {
      name: "sensor3",
      color: "#82ca9d",
    },
    {
      name: "sensor4",
      color: "#ffc658",
    },
  ];

  // fetch history data from our backend
  const fetchData = async () => {
    try {
      const json = await fetch("/api/events").then((res) => res.json());
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const runFetchData = async () => {
      try {
        const json = await fetchData();

        if (Array.isArray(json)) {
          // processing history data, using cron timestamp instead of date from sensor events api because date doesn't change hourly
          const data = json.map((item) => {
            const data = item["data"];
            data["xValue"] = moment(new Date(data["cront_time"])).format(
              "MMM DD HH:mm"
            );
            return data;
          });

          // processing last sensor values data
          const lastData = data[data.length - 1];
          // reusing our labels array adding sensor value from last sensor value
          const temp = labels.map((label) => {
            label["value"] = lastData[label["name"]];
            return label;
          });

          setLastSensorData(temp);
          setData(data);
          setIsLoading(false);
        }
        return null;
      } catch (error) {
        console.log(error);
      }
    };
    runFetchData();
  }, []);

  return (
    <div className="App">
      <h3>Open Data</h3>
      {isLoading ? (
        <div className="loader container"></div>
      ) : (
        <>
          <p>Last read sensor data</p>
          <div className="container stat_container">
            {lastSensorData.map((lastData, i) => {
              return <SensorData key={i} data={lastData} />;
            })}
          </div>
          <p>Sensor data over time</p>
          <HistoryGraph data={data} labels={labels} />
        </>
      )}
    </div>
  );
}

export default App;
