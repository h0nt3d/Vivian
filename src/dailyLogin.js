// dailyLogin.js

const cron = require('node-cron');
const fetch = require('node-fetch');
const fs =  require('fs').promises;

const fetchLatestVideo = require('./APIs/fetchLatestYoutubeVideo');



function getLatestNews() {
        const link = 'https://game8.co/games/Zenless-Zone-Zero/archives/435682';
        return link;
}

async function readLink() {
	try {
		const data = await fs.readFile('./sources/videoLink.txt', 'utf8');
		console.log(`Read in: ${data}`);
		return data;
	}
	catch (err) {
		console.error("Error reading file", err);
		return null;
	}
}

async function dailyLogin(client, channelID) {

	cron.schedule('0 5 * * *', async() => {
		const news = getLatestNews();
		let video = await fetchLatestVideo('@ZZZ_Official');
		let videoLink = await readLink();
		const channel = client.channels.cache.get(channelID);
		channel.send(`# **Good Morning!**\n${news}\n${videoLink}`);
	},
	{
		timezone: 'America/Moncton'
	});
	console.log('Daily Login Reminder enabled.');
}

module.exports = dailyLogin;
