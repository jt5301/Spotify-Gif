var express = require('express'); // Express web server framework
var router = express.Router();
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotify = require('spotify-web-api-node');

require('dotenv').config();

const client_id = process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.redirect_uri;

var spotifyWebApi = new spotify({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: redirect_uri,
});

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

router.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

router.get('/login', function (req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-top-read user-read-private playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-follow-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

router.get('/callback', async (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        spotifyWebApi.setAccessToken(access_token)
        spotifyWebApi.setRefreshToken(refresh_token)
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function (error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/profile/');
      } else {
        res.redirect('#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/userinfo', async (req, res) => {
  try {
    var result = await spotifyWebApi.getMe();
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('/playlists', async (req, res) => {
  try {
    var result = await spotifyWebApi.getUserPlaylists({ limit: 50 });
    res.status(200).send(result.body);
  } catch (err) {
    res.status(400).send(err)
  }
});

router.get('/follows', async (req, res) => {
  try {
    let result = await spotifyWebApi.getFollowedArtists()
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
})
//long term: all time, medium term: six months, short term: 4 weeks
router.get('/topArtists/:time/:limit', async (req, res) => {
  try {
    let timeRange = req.params.time
    let limit = req.params.limit
    let result = await spotifyWebApi.getMyTopArtists({ limit: limit, time_range: timeRange })
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/topTracks/:time/:limit', async (req, res) => {
  try {
    let timeRange = req.params.time
    let limit = req.params.limit
    let result = await spotifyWebApi.getMyTopTracks({ limit: limit, time_range: timeRange })
    res.status(200).send(result.body)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/playlists', async (req, res) => {
  try {
    let result = await spotifyWebApi.getUserPlaylists()
    console.log(result.body)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.get('/artist/:id', async (req, res) => {
  try {
    let result = await spotifyWebApi.getArtist(req.params.id)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.get('/artistTopSongs/:id', async (req, res) => {
  try {
    let result = await spotifyWebApi.getArtistTopTracks(req.params.id, 'US')
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.get('/relatedArtists/:id', async (req, res) => {
  try {
    let result = await spotifyWebApi.getArtistRelatedArtists(req.params.id)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})


router.get('/track/:id', async (req, res) => {
  try {
    let result = await spotifyWebApi.getTrack(req.params.id)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.get('/playlist/:id', async (req, res) => {
  try {
    let result = await spotifyWebApi.getPlaylist(req.params.id)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.post('/playlistDetail', async (req, res) => {
  try {
    let result = await spotifyWebApi.getAudioFeaturesForTracks(req.body)
    res.status(200).send(result.body)
  } catch (error) {
    console.log(error)
  }
})

router.post('/recommendedTracks', async (req, res) => {
  try {
    let tracks = await spotifyWebApi.getRecommendations(
      {
        seed_tracks: req.body
      }
    )
    res.status(200).send(tracks.body)
  } catch (error) {
    console.log(error)
  }
})

router.post('/createEmptyPlaylist', async (req, res) => {
  try {
    let userId = req.body.userId
    let playlistName = req.body.playlistName
    let newList = await spotifyWebApi.createPlaylist(userId, `Music based on ${playlistName}`)
    res.status(200).send(newList.body.id)
  } catch (error) {
    console.log(error)
  }
})

router.post('/addToPlaylist', async (req, res) => {
  try {
    await spotifyWebApi.addTracksToPlaylist(req.body.playlistId, req.body.tracksToAdd)
    res.status(200).send('success')
  } catch (error) {
    console.log(error)
  }

})

module.exports = router;
