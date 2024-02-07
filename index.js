// index.js
const { nextISSTimesForMyLocation } = require('./iss');

const outputPassTimes = function(passTimes) {

  for (const pass of passTimes) { //looping the array of object passTimes.
    const dateAndTime = new Date(0);
    dateAndTime.setUTCSeconds(pass.risetime); //The setUTCSeconds() method sets the seconds of a date object, according to UTC.
    console.log(`The next ISS pass at ${dateAndTime}, duration: ${pass.duration} seconds.`);
  }

};

nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    return console.log("It didn't work!", error);
  }
  outputPassTimes(passTimes);

});

/*
// Example output:

> node index.js
The next ISS pass at Thu Feb 08 2024 22:10:18 GMT-0500 (Eastern Standard Time), duration: 523 seconds.
The next ISS pass at Fri Feb 09 2024 08:16:58 GMT-0500 (Eastern Standard Time), duration: 222 seconds.
The next ISS pass at Fri Feb 09 2024 18:23:38 GMT-0500 (Eastern Standard Time), duration: 689 seconds.
The next ISS pass at Sat Feb 10 2024 04:30:18 GMT-0500 (Eastern Standard Time), duration: 470 seconds.
The next ISS pass at Sat Feb 10 2024 14:36:58 GMT-0500 (Eastern Standard Time), duration: 543 seconds.

*/