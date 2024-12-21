import {
	Client,
	Events,
	GatewayIntentBits,
	Message,
	SlashCommandBuilder,
} from 'discord.js';

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

client.on('ready', async () => {
	console.log('embdx is ready!');
	client.user.setActivity('waiting for x/twitter links');
});

client.on('messageCreate', async (message: Message) => {
	const { content, channel } = message;
	const userMention = `<@${message.author.id}>`;
	const HELIX_FOSSIL_ANSWERS = [
		'Yes',
		'No',
		'Maybe',
		'Ask again later',
		'Definitely',
		'Unlikely',
		'Absolutely',
		'Doubtful',
		'Signs point to yes',
		'Signs point to no',
		'The fossil is unclear',
		'Try again',
		'Fossil says no',
		'Fossil says yes',
		'Consult me later',
		'Outlook good',
		'Outlook not so good',
		'Cannot predict now',
		'Very likely',
		'Very unlikely',
	];
	if (
		content.trim().startsWith(URLS.twitterURL) ||
		content.trim().startsWith(URLS.xURL) ||
		content.trim().startsWith(URLS.tiktokURL)
	) {
		const replacedURL = replaceURLwithFXTwitter(content.trim());

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
		findAndSendEmoji(emojiName, channel, client);
	}

	if (content.startsWith('!d')) {
		const args = content.slice(2).split(' '); // Split the input into command and arguments
		const sides = parseInt(args[0]); // Extract the number of sides from the arguments
		const numDice = parseInt(args[1]); // Extract the number of dice from the arguments

		if (!isNaN(numDice) && !isNaN(sides) && numDice > 0 && sides > 0) {
			let results = [];
			for (let i = 0; i < numDice; i++) {
				results.push(Math.floor(Math.random() * sides) + 1);
			}
			const total = results.reduce((acc, result) => acc + result, 0);
			await channel.send(
				`${userMention}: :game_die: Rolled ${numDice} d${sides} ${results.join(
					', ',
				)} (Total: ${total})`,
			);
		} else {
			// Invalid input, handle accordingly (e.g., inform the user)
			await channel.send(
				`${userMention}: Invalid input. Ple ase use !d<numSides> <numDice> to roll multiple dice.`,
			);
		}
	}

	if (content.startsWith('!helix')) {
		const randomIndex = Math.floor(Math.random() * HELIX_FOSSIL_ANSWERS.length);
		const randomAnswer = HELIX_FOSSIL_ANSWERS[randomIndex];
		await channel.send(`${userMention}: :owl: ${randomAnswer}`);
	}
});

client.login(Bun.env.DISCORD_TOKEN);
