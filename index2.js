const { nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (let passTime of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(passTime.risetime);
    const duration = passTime.duration;
     console.log(`Next pass at ${dateTime} for ${duration} seconds!`)
  }
}


nextISSTimesForMyLocation()
  .then((body) => printPassTimes(body))
  .catch((error) => console.log(error));