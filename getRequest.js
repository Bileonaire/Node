// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out

//Require https module
const https = require('https');

//Require https module for status codes
const http = require('http');

//Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    // Connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      response => {
        if (response.statusCode === 200) {
          let body = '';
          // Read the data
          response.on('data', data => {
            body += data.toString();
          });

          // console.log(response);
          response.on('end', () => {
            // Parse the data
            const profile = JSON.parse(body);
            // console.dir(profile);

            // Print the data
            printMessage(
              username,
              profile.badges.length,
              profile.points.JavaScript
            );
          });
        } else {
          const message = `there was an error getting the profile for ${username} (${
            http.STATUS_CODES[response.statusCode]
          })`;
          console.error(message);
        }
      }
    );
    request.on('error', error =>
      console.error(`Problem with request: ${error.message}`)
    );
  } catch (error) {
    console.error(error.message);
  }
}

// Getting arguments from the command line by running the file and putting argements after the command
const users = process.argv.slice(2);
users.forEach(getProfile);
