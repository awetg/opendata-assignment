require("dotenv").config();
const fetch = require("node-fetch");

const url = "https://opendata.hopefully.works/api/";
let token = process.env.ACCESS_TOKEN || null;
const login_data = {
  email: process.env.API_EMAIL,
  password: process.env.API_PASSWORD,
};

getSensorData = async () => {
  try {
    if (!token) {
      token = await getToken();
    }
    const json = await fetch(url + "events", {
      headers: { Authorization: "Bearer " + token },
    }).then((res) => res.json());
    return json;
  } catch (error) {
    console.log(error);
    token = null;
  }
};

const getToken = async () => {
  try {
    const json = await fetch(url + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_data),
    }).then((res) => res.json());
    return json["accessToken"];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSensorData,
};
