const fs = require('fs');

async function fetchLatestVideo(channelId) {
	const response = await fetch(`https://www.youtube.com/${channelId}/videos`);
	const html = await response.text();

	const videoIdMatch = html.match(/"videoId":"([a-zA-Z0-9_-]+)"/);

	if (videoIdMatch && videoIdMatch[1]) {
		const videoId = videoIdMatch[1];
		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
		console.log(videoUrl);
		fs.writeFile('./sources/videoLink.txt', videoUrl, 'utf8', (err) => {
			if (err) {
				console.error("Error writing file");
			}
			console.log("File written.");
		});
        }
	else {
		console.log('Could not find any videos.');
	}


}

module.exports = fetchLatestVideo;
