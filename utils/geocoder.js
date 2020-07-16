const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({
  apiKey: process.env.GEOCODER_API_KEY,
  provider: process.env.GEOCODER_PROVIDER,
  formatter: null,
});

module.exports = geocoder;
