const { SlashCommandBuilder } = require("discord.js");

module.exports = [
	new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!'),	


];
