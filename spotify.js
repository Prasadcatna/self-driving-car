const SpotifyWebApi = require('spotify-web-api-node');

// Replace these with your Spotify app's credentials and access token
const clientId = '3b7df0073d574c8f9b050452abbcbb0e';
const clientSecret = 'd3daa7f8f424406ab9666d0ec25fa111';
const accessToken = 'YOUR_ACCESS_TOKEN';

// Initialize SpotifyWebApi with your credentials
const spotifyApi = new SpotifyWebApi({ clientId, clientSecret });

// Set the access token (required to access the Spotify Web API)
spotifyApi.setAccessToken(accessToken);

// Function to fetch playlist data from a Spotify URL
async function getPlaylistDataFromURL(url) {
  try {
    // Extract the playlist ID from the URL
    const playlistId = url.match(/playlist\/(.*)/)[1];

    // Get the playlist data
    const playlistData = await spotifyApi.getPlaylist(playlistId);

    // Display the playlist data
    console.log('Playlist Name:', playlistData.body.name);
    console.log('Total Tracks:', playlistData.body.tracks.total);
    console.log('Playlist Tracks:');
    playlistData.body.tracks.items.forEach((track, index) => {
      console.log(`${index + 1}. ${track.track.name} - ${track.track.artists[0].name}`);
    });
  } catch (error) {
    console.error('Error fetching playlist data:', error.message);
  }
}

// Replace the Spotify URL with the actual playlist URL
const spotifyUrl = 'YOUR_SPOTIFY_PLAYLIST_URL';
getPlaylistDataFromURL(spotifyUrl);
