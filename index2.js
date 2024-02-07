
const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then((content) => {
//     console.log("It works: ", content);
//   })

const viewPassTimes = function(passTimes) {
  for (const pass of passTimes) { //looping the array of object passTimes.
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime); //The setUTCSeconds() method sets the seconds of a date object, according to UTC.
    console.log(`The next ISS pass at ${dateAndTime}, duration: ${pass.duration} seconds.`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    viewPassTimes(passTimes);
  })
  .catch((error) => {
    return console.log("It didn't work!", error.message);
  });
  