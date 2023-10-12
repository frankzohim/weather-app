const axios = require("axios");

const geoCode = (address, callback) => {
  const urlGeo = `https://geocode.maps.co/search?q=${encodeURIComponent(
    address
  )}`;

  axios
    .get(urlGeo)
    .then(({ data }) => {
      // console.log(response.data[0]);
      callback(undefined, {
        location: data[0].display_name,
        latitude: data[0].lat,
        longitude: data[0].lon,
      });
    })
    .catch((error) => {
      callback("Unable to fetch geo data");
    })
    .finally(() => {});
};

module.exports = geoCode;
