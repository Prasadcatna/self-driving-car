const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

// ytdl('http://www.youtube.com/watch?v=aqz-KE-bpKQ')
//   .pipe(fs.createWriteStream('video.mp4'));

// Example of choosing a video format.

async function main() {
  const videoID = 'GxldQ9eX2wo'; // Replace with the actual video ID
  try {
    const info = await ytdl.getInfo(videoID);
  
    let formats_ = ytdl.filterFormats(info.formats, 'audioonly');
    console.log(`Format length:- ${formats_.length}`)
    // console.log(`Audio url: ${formats_[0].url}`);
    console.log(`Title: ${info.videoDetails.title}\nLength in sec: ${info.videoDetails.lengthSeconds}\nThumbnail url: ${JSON.stringify(info.videoDetails.thumbnails)}\nAudio url: ${formats_[0].url}`);
    const jsonData = JSON.stringify(info, null, 2);
    fs.writeFile('streamformat.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing to file: ', err);
      } else {
        console.log('Data has been written to streamformat.json');
      }
    })
  } catch (error) {
    console.error('Error fetching video info:', error.message);
  }
}

main();
