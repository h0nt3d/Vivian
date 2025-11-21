const { SlashCommandBuilder } = require("discord.js");

module.exports = [
	new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
		.addStringOption(option => 
			option.setName('message')
                	.setDescription('The message to echo')
                	.setRequired(true)
        	)
        	.toJSON()


];
