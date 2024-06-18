// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// The code below is temporary and can be commented out.
// The xxx.xxx.xxx.xxx is a sample location IP address.
fetchCoordsByIP('xxx.xxx.xxx.xxx', (error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , data);
  return;
})