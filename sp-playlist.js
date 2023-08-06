const SpotifyWebApi = require('spotify-web-api-node');
const { createOAuth2 } = require('simple-oauth2');

// Spotify app credentials
const clientId = '3b7df0073d574c8f9b050452abbcbb0e';
const clientSecret = 'd3daa7f8f424406ab9666d0ec25fa111';

// Spotify playlist URL
const playlistUrl = 'YOUR_SPOTIhttps://open.spotify.com/playlist/1XqeUQ7Wi7GuHXCACcm4cw?si=fe7ae523c26a4810FY_PLAYLIST_URL';

// OAuth2 configuration
const oauth2 = createOAuth2({
  client: {
    id: clientId,
    secret: clientSecret,
  },
  auth: {
    tokenHost: 'https://accounts.spotify.com',
    tokenPath: '/api/token',
  },
});

// OAuth2 authentication URL
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:8888/callback',
  scope: 'playlist-read-private', // Add any other scopes your application requires
});

console.log('Please authorize the app by visiting the following URL:');
console.log(authorizationUri);

// After the user authorizes the app and gets redirected to YOUR_REDIRECT_URI
const authorizationCode = 'YOUR_AUTHORIZATION_CODE'; // Replace with the actual authorization code

// Function to fetch tracks from the Spotify playlist
async function getPlaylistTracks(accessToken, playlistId) {
  const spotifyApi = new SpotifyWebApi({ accessToken });

  try {
    const playlistData = await spotifyApi.getPlaylistTracks(playlistId, {
      fields: 'items(track(name, artists(name)))',
    });

    console.log('Playlist Tracks:');
    playlistData.body.items.forEach((item, index) => {
      const track = item.track;
      console.log(`${index + 1}. ${track.name} - ${track.artists.map((artist) => artist.name).join(', ')}`);
    });
  } catch (error) {
    console.error('Error fetching playlist tracks:', error.message);
  }
}

// Replace with the actual playlist URL
const playlistId = 'YOUR_PLAYLIST_ID'; // Extract playlist ID from the playlist URL

async function main() {
  try {
    const accessToken = await getAccessToken(authorizationCode);
    await getPlaylistTracks(accessToken, playlistId);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
