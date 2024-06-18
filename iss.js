/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const needle = require("needle");

const URL = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  needle(URL, (error, _response, body) => {
    if (error) {
      callback(error, null);
    } else {
      const myIP = body.ip;
      callback(null, myIP);
    }
  });
};

module.exports = { fetchMyIP };
//fetchMyIP();