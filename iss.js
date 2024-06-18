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
  //use request to fetch IP address from JSON API
  //using `needle()` provides the response body already parsed as a JavaScript object when the response is JSON.
  needle(URL, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Server Code ${response.statusCode} when fetching IP: ${body}`;
      return callback(Error(msg), null);
    }
    
    // if all's well and we got the data
    const myIP = body.ip;
    return callback(null, myIP);
  });

};

// Script that fetch Geo coordinates by IP address.
const fetchCoordsByIP = function(ip, callback) {

}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};