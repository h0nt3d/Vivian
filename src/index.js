const { Client, Events, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const commands = require("./commands.js");

require("dotenv").config();

const TOKEN = process.env.TOKEN;
const r4zor_WEBHOOK_CHANNEL_ID = process.env.r4zor_WEBHOOK_CHANNEL_ID;
const r4zor_TARGET_CHANNEL_ID = process.env.r4zor_TARGET_CHANNEL_ID;
const vivian_WEBHOOK_CHANNEL_ID = process.env.vivian_WEBHOOK_CHANNEL_ID;
const vivian_TARGET_CHANNEL_ID = process.env.vivian_TARGET_CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
	intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, async (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);	
	
	/* For Deleting Old Commands
	const existingGlobal = await client.application.commands.fetch();
	for (const cmd of existingGlobal.values()) {
 		if (cmd.name === '') await client.application.commands.delete(cmd.id);
	}
	*/

	const guild = client.guilds.cache.get(GUILD_ID);
	if (!guild) return console.error('Guild not found');

	const existingCommands = await guild.commands.fetch();
	for (const cmd of existingCommands.values()) {
		await guild.commands.delete(cmd.id);
	}

	for (const command of commands) {
		await guild.commands.create(command);
	}

});


client.on(Events.MessageCreate, async (message) => {
	if (message.author.id === client.user.id) return;

	
	if (message.channel.id === r4zor_WEBHOOK_CHANNEL_ID) {

		let commit_message = message.content;

		if (message.embeds.length > 0 && message.embeds[0].data?.description) {
			commit_message = message.embeds[0].data.description;
		}

		if (!commit_message) {
			console.log("No commit message");
			return;
		}

		const targetChannel = await client.channels.fetch(r4zor_TARGET_CHANNEL_ID).catch(() => null);

		if (!targetChannel) {
			console.log("Target channel not found");
			return;
		}

		await targetChannel.send(`**New Commit:**\n${commit_message}`);
		console.log(`Commit message received in ${message.channel.name}: ${commit_message}`);
	}
	else if (message.channel.id === vivian_WEBHOOK_CHANNEL_ID) {

		let commit_message = message.content;

		if (message.embeds.length > 0 && message.embeds[0].data?.description) {
			commit_message = message.embeds[0].data.description;
		}

		if (!commit_message) {
			console.log("No commit message");
			return;
		}

		const targetChannel = await client.channels.fetch(vivian_TARGET_CHANNEL_ID).catch(() => null);

		if (!targetChannel) {
			console.log("Target channel not found");
			return;
		}

		await targetChannel.send(`**New Commit:**\n${commit_message}`);
		console.log(`Commit message received in ${message.channel.name}: ${commit_message}`);
	}

});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "echo") {
		const message = interaction.options.getString('message');
		await interaction.reply(message);
	}
});

client.login(TOKEN);

