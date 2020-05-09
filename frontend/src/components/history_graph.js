import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function HistoryGraph(props) {
  return (
    <div className="container chart_container card">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={props.data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xValue" padding={{ left: 10, right: 10 }} />
          <YAxis name="Value" tick={{ fontSize: ".8rem" }} />
          <Tooltip />
          <Legend />
          {props.labels.map((label, i) => {
            return (
              <Line
                key={i}
                type="monotone"
                stackId="1"
                dataKey={label.name}
                stroke={label.color}
                fill={label.color}
                activeDot={{ r: 8 }}
                tick={{ fontSize: 5 }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoryGraph;
