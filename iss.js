/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

let url = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(url, (error, _response, body) => {
    if (error) {
      callback(error, null);
    } else {
      let resultBody = JSON.parse(body);
      let dataIP = resultBody.ip;
      callback(null, dataIP);
    }
  });
};

module.exports = { fetchMyIP };