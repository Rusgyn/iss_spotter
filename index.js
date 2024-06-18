// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// The code below is temporary and can be commented out.
// The xxx.xxx.xxx.xxx is your location IP address. You can use http://ipwho.is/ to get your IP address.
fetchCoordsByIP('xxx.xxx.xxx.xxx', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , coordinates);
  return;
});

//The xxx stands your location coordinates. You can use http://ipwho.is/ to get your latitude and longitude.
const coords = {
  latitude: 'xxx',
  longitude: 'xxx'
};
fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , passTimes);
  return;
});