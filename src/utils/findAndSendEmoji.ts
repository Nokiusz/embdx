import { Client, Message } from 'discord.js';

export const findAndSendEmoji = (
	emojiName: string,
	channel: Message['channel'],
	client: Client,
): Promise<void> => {
	if (emojiName.startsWith('<')) {
		channel.send(emojiName);
		return;
	}

	const emoji = client.emojis.cache.find((e) => e.name === emojiName);

	if (emoji) {
		channel.send(`${emoji}`);
	} else {
		channel.send(`Emoji :${emojiName}: not found in servers that I'm in.`);
	}
};
