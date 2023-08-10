const axios = require('axios');
const yargs = require('yargs');

const apiKey = 'AIzaSyA3oZ9PMjtNPyE0pws3T279mRVtdMnwIsw'; // Replace with your YouTube Data API key

async function searchYoutubeVideoByName(searchQuery) {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: searchQuery,
        type: 'video',
        // type: 'channel',
        part: 'id',
        maxResults: 5,
        videoCategoryId: '10',
        key: apiKey,
      },
    });
    console.log(`Length of respond data:- ${response.data.items.length}`)
    for (let i =0; i< response.data.items.length; i++){
        const videoId = response.data.items[i].id.videoId;
        console.log(`Video ID of "${searchQuery}": ${JSON.stringify(videoId)}`);
    }
    
  } catch (error) {
    console.error('Error searching for video:', error.message);
  }
}

const argv = yargs(process.argv.slice(2))
  .option('search', {
    alias: 's',
    describe: 'Search query for YouTube video',
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

searchYoutubeVideoByName(argv.search);
