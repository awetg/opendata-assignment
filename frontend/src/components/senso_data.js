import React from "react";

function SensorData(props) {
  return (
    // <div className="stat_item">
    <div className="card">
      <p className="sensor_label">{props.data.name}</p>
      <p className={"sensor_value" + (props.data.value ? "" : " danger")}>
        {props.data.value ? Number(props.data.value).toFixed(2) : "No Value"}
      </p>
      {/* </div> */}
    </div>
  );
}

export default SensorData;
