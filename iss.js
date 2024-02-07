const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

let url = 'https://api.ipify.org/?format=json';

//function that fetch the IP address.
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
 
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const resultBody = JSON.parse(body);
    const dataIP = resultBody.ip;
    callback(null, dataIP);
    
  });
};

//function that fetch the geo coordinates as per given public IP address.
/**
 * Makes a single API request to retrieve the lat/lng for a given IPv4 address.
 * Input:
 *   - The ip (ipv4) address (string)
 *   - A callback (to pass back an error or the lat/lng object)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The lat and lng as an object (null if error). Example:
 *     { latitude: '49.27670', longitude: '-123.13000' }
 */

const fetchCoordsByIP = function(ip, callback) {
  //ip = dataIP;
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const resultBody = JSON.parse(body);

    if (!resultBody.success) {
      let message = `The status was ${resultBody.success}, when fetching the IP ${resultBody.ip}.\nServer message: ${resultBody.message}.\n`;
      callback(Error(message), null);
      return;
    }

    const coord = {
      latitude : "",
      longitude : ""
    };

    coord.latitude = resultBody.latitude;
    coord.longitude = resultBody.longitude;
    callback(null, coord);
    return;
    
  });

};

//This function retrieve ISS fly over times for the given latitude and longitude coordinates.
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  const fetchISSFlyOverURL = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(fetchISSFlyOverURL, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const message = `Status code ${response.statusCode} when fetching ISS pass time due to ${body}`;
      callback(Error(message), null);
      return;
    }

    const resultBody = JSON.parse(body);
    const passes = resultBody.response;
    callback(null, passes);
    return;

  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, passTimes);

      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};