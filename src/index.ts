import { Client, GatewayIntentBits, Message } from 'discord.js';

import { replaceURLwithFXTwitter } from './utils/replaceURLwithFXTwitter';
import { URLS } from './utils/urls';
import { findAndSendEmoji } from './utils/findAndSendEmoji';
import { replaceURLwithDDInstagram } from './utils/replaceURLwithDDInstagram';
import { replaceURLwithTfxktok } from './utils/replaceURLwithTfxktok';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
	],
});

client.on('ready', () => {
	console.log('embdx is ready!');
	client.user.setActivity('waiting for x/twitter links');
});

client.on('messageCreate', async (message: Message) => {
	const { content, channel } = message;
	if (
		content.trim().startsWith(URLS.twitterURL) ||
		content.trim().startsWith(URLS.xURL)
	) {
		const replacedURL = replaceURLwithFXTwitter(content.trim());
		const userMention = `<@${message.author.id}>`;
		await message.delete();
		await channel.send(`${userMention}: ${replacedURL}`);
	}

	if (content.trim().startsWith(URLS.instagramURL)) {
		const replacedURL = replaceURLwithDDInstagram(content.trim());
		const userMention = `<@${message.author.id}>`;
		await message.delete();
		await channel.send(`${userMention}: ${replacedURL}`);
	}

	if (content.trim().startsWith(URLS.tiktokURL)) {
		const replacedURL = replaceURLwithTfxktok(content.trim());
		const userMention = `<@${message.author.id}>`;
		await message.delete();
		await channel.send(`${userMention}: ${replacedURL}`);
	}

	if (content.startsWith('!e ')) {
		const emojiName = content.slice(3);
		console.log('emojiName', emojiName);
		findAndSendEmoji(emojiName, channel, client);
	}
});

client.login(process.env.DISCORD_TOKEN);
