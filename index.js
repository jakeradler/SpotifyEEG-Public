const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();
const { Notion } = require("@neurosity/notion");
require("dotenv").config();

const deviceId = process.env.DEVICE_ID || "";
const email = process.env.EMAIL || "";
const password = process.env.PASSWORD || "";
const accessToken = process.env.SPOTIFY_ACCESS_TOKEN || "";

const verifyEnvs = (email, password, deviceId) => {
  const invalidEnv = (env) => {
    return env === "" || env === 0;
  };
  if (
    invalidEnv(email) ||
    invalidEnv(password) ||
    invalidEnv(deviceId)
  ) {
    console.error(
      "Please verify deviceId, email and password are in .env file, quitting..."
    );
    process.exit(0);
  }
};
verifyEnvs(email, password, deviceId);

console.log(`${email} attempting to authenticate to ${deviceId}`);

const notion = new Notion({
  deviceId
});

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);



const main = async () => {
  await notion
    .login({
      email,
      password
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error);
    });
  console.log("Logged in");

  // notion.calm().subscribe((calm) => {
  //   if (calm.probability > 0.3) {
  //     console.log("Hello World!");
  //     spotifyApi.skipToNext()
  //     .then(function() {
  //       console.log('Skip to next');
  //     }, function(err) {
  //       //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
  //       console.log('Something went wrong!', err);
  //     });
  //   }
  // });


  notion.kinesis("rotateClockwise").subscribe((intent) => {
    console.log("Hello World!");
    spotifyApi.skipToNext()
      .then(function() {
        console.log('Skip to next');
      }, function(err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  });

 
};

main();


