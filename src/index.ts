import { Client, GatewayIntentBits, Message } from 'discord.js';
import { findAndSendEmoji } from './utils/findAndSendEmoji';
import { HELIX_FOSSIL_ANSWERS } from './utils/consts';
import { URL_HANDLERS } from './handlers/urlHandlers';
import { handleDiceRoll } from './handlers/diceHandler';

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

client.on('ready', async () => {
	console.log('embdx is ready!');
	client.user.setActivity('waiting for your input :D');
});

client.on('messageCreate', async (message: Message) => {
	const { content, channel } = message;
	const userMention = `<@${message.author.id}>`;

	for (const { prefixes, handler } of URL_HANDLERS) {
		if (prefixes.some((url) => content.trim().startsWith(url))) {
			const replacedURL = handler(content.trim());
			await message.delete();
			await channel.send(`${userMention}: ${replacedURL}`);
			return;
		}
	}

	if (content.startsWith('!e ')) {
		const emojiName = content.slice(3);
		findAndSendEmoji(emojiName, channel, client);
		return;
	}

	if (content.startsWith('!d')) {
		await handleDiceRoll(content, userMention, channel);
		return;
	}

	if (content.startsWith('!helix')) {
		const randomAnswer =
			HELIX_FOSSIL_ANSWERS[
				Math.floor(Math.random() * HELIX_FOSSIL_ANSWERS.length)
			];
		await channel.send(`${userMention}: :owl: ${randomAnswer}`);
		return;
	}
});

client.login(Bun.env.DISCORD_TOKEN);
