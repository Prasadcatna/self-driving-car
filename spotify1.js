const express = require('express');
const request = require('request');
const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');


const app = express();
const port = 8888;
const clientId = '3b7df0073d574c8f9b050452abbcbb0e';
const clientSecret = 'd3daa7f8f424406ab9666d0ec25fa111';
const redirectUri = 'http://localhost:8888/callback';

// Step 1: Create a login link
app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private'; // Add more scopes as needed
  res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
  })}`);
});

// Step 2: Handle the callback after login
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
    },
    json: true,
  };

  try {
    const response = await axios.post(authOptions.url, querystring.stringify(authOptions.form), {
      headers: authOptions.headers,
    });

    // Step 3: Use the access token to get user data
    const accessToken = response.data.access_token;
    const options = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    };

    // Get user data
    const userDataResponse = await axios.get('https://api.spotify.com/v1/me', options);
    const userData = userDataResponse.data;

    // Get user's playlists
    const playlistsResponse = await axios.get('https://api.spotify.com/v1/me/playlists', options);
    const playlists = playlistsResponse.data.items;

    // Handle the user data and playlists as needed
    // console.log('User Data:', userData);
    const useData = JSON.stringify(userData, null, 2);
    fs.writeFile('spotify_userData.json', useData, (err) => {
      if (err) {
        console.error('Error writing to file: ', err);
      } else {
        console.log('Data has been written to spotify_userData.json');
      }
    })
    // console.log('Playlists:', playlists);
    const plData = JSON.stringify(playlists, null, 2);
    fs.writeFile('spotify_plData.json', plData, (err) => {
      if (err) {
        console.error('Error writing to file: ', err);
      } else {
        console.log('Data has been written to spotify_plData.json');
      }
    })


    res.send('Successfully retrieved user data and playlists.');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred during login process.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/login`);
});
