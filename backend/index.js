require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const CronJob = require("cron").CronJob;
const util = require("./util");

// Cron job
const schedule = "0 0 */1 * * *";
// const shcedult = '00 00 */1 * * * *'
const testSchedule = "* * * * *";
const job = new CronJob(
  schedule,
  () => {
    util.getSensorData().then((json) => {
      json["cront_time"] = new Date();
      const new_data = new data_model({ data: json });
      new_data.save((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Saved new sensor data");
        }
      });
    });
  },
  null,
  true,
  "Europe/Helsinki"
);
job.start();

// Database
const data_shema = mongoose.Schema({ data: JSON });
const data_model = mongoose.model("sensor_data", data_shema);

mongoose
  .connect("mongodb://mongo:27017/opendata_db", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// express server
const app = express()
  .get("/api/events", (req, res) => {
    data_model
      .find()
      .then((items) => res.status(200).json(items))
      .catch((error) => res.status(404).json({ msg: "No sensor data found" }));
  })
  .use((_, res) =>
    res
      .status(501)
      .json({ error: { message: "Please check you have the correct URL." } })
  );

const port = process.env.PORT || 3001;
module.exports = app.listen(port, () =>
  console.log("Server running at " + port)
);
