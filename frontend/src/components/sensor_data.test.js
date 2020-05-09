import React from "react";
import { create } from "react-test-renderer";
import SensorData from "./senso_data";

it("No value text is render for sensor with null values", () => {
  const tree = create(<SensorData data={{ name: "sensor1", value: null }} />);

  expect(tree).toMatchSnapshot();
});

it("Correct sensor name is render", () => {
  const tree = create(<SensorData data={{ name: "sensor4", value: 10.1 }} />);

  expect(tree).toMatchSnapshot();
});
