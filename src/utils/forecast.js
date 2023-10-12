const axios = require("axios");

const forecast = (latitude, longitude, location, callback) => {
  //Searching for weather information
  const url = `https://api.weatherapi.com/v1/forecast.json?key=9cc810aea8dc40e3a55111245230210&q=${latitude},${longitude}`;
  axios
    .get(url)
    .then(({ data }) => {
      //   console.log(response.data);
      const current = data.current;
      callback(
        undefined,
        `It is currently ${current.temp_c} degrees out. Pressure in is  ${current.pressure_in}`
      );
    })
    .catch((error) => {
      callback("Unable to fetch data");
    })
    .finally(() => {});
};

module.exports = forecast;
