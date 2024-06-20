const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

const fetchMyIP = function() {
  // using needle and promise method.
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

module.exports = { fetchMyIP };