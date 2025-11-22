// dailyLogin.js

const cron = require('node-cron');
const fs = require('fs');
const { exec } = require('child_process');


async function getHTML() {
        exec('curl https://game8.co/games/Zenless-Zone-Zero/archives | grep "/archives/557173" > news.html');
}

function getLatestNews(html, baseUrl) {
        const match = html.match(/href=["']([^"']*\/archives\/\d+[^"']*)["']/i);

        if (!match) return null;

        const link = match[1];

        return new URL(link, baseUrl).href;
}

function dailyLogin(client, channelID) {

	const html = fs.readFileSync("news.html", "utf8");
	const url = getLatestNews(html, "https://game8.co");

	cron.schedule('0 5 * * *', async() => {
		const channel = client.channels.cache.get(channelID);
		channel.send('Good morning!');
		channel.send('Latest News:');
		channel.send(url);
	},
	{
		timezone: 'America/Moncton'
	}
	);
	console.log('Daily Login Reminder enabled.');
}

module.exports = dailyLogin;
