const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  // using promises on needle method to do the request.
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body;//retrieve the body value from the response object. => body {ip: 'xxx.xxx.xxx.xxx'}
      const ip = body.ip;//retrieve the ip from the body object.
      return ip;
    })
    .catch((error) => {
      return error;
    });
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(ip) {
    // using promises on needle method to do the request.
    return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;//retrieve the body value from the response object.

      const coordinates = {
        latitude:body.latitude,
        longitude:body.longitude
      }
      
      return coordinates;
    })
    .catch((error) => {
      return error;
    });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};