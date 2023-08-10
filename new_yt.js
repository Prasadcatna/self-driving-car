const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const ytdl = require('ytdl-core');

const apiKey = 'AIzaSyA3oZ9PMjtNPyE0pws3T279mRVtdMnwIsw'; // Replace with your YouTube Data API key

async function search_vID(vID) {
    //const videoID = 'GxldQ9eX2wo'; // Replace with the actual video ID
    try {
        const videoID = vID;
        const info = await ytdl.getInfo(videoID);
        
        let formats_ = ytdl.filterFormats(info.formats, 'audioonly');
        console.log(`Format length:- ${formats_.length}`)
        console.log(`Title: ${info.videoDetails.title}\nLength in sec: ${info.videoDetails.lengthSeconds}\nThumbnail url: ${JSON.stringify(info.videoDetails.thumbnails)}\nAudio url: ${formats_[0].url}`);
        } catch (error) {
        console.error('Error fetching video info:', error.message);
        }
}

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
        search_vID(videoId)
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
// searchYoutubeVideoByName("anne marie")
