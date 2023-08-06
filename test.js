const ytdl = require('ytdl-core');

async function getVideoURL(videoID) {
  try {
    const videoInfo = await ytdl.getInfo(videoID);
    const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');
    console.log(videoFormats.length)

    if (videoFormats.length > 0) {
      const url = videoFormats[0].url;
      console.log('Video URL (with video and audio):', url);
    } else {
      console.log('No video with both video and audio streams found.');
    }
  } catch (error) {
    console.error('Error getting video URL:', error.message);
  }
}

const videoID = 'aJQcn34K_S8'; // Replace with the actual video ID
getVideoURL(videoID);
