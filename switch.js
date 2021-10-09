const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);


spotifyApi.skipToNext()
  .then(function() {
    console.log('Skip to next');
  }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
  });