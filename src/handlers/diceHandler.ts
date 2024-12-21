export async function handleDiceRoll(
	content: string,
	userMention: string,
	channel: any,
) {
	const args = content.slice(2).trim().split(' ');
	const sides = parseInt(args[0]);
	const numDice = parseInt(args[1]);

	if (!isNaN(numDice) && !isNaN(sides) && numDice > 0 && sides > 0) {
		const results = Array.from(
			{ length: numDice },
			() => Math.floor(Math.random() * sides) + 1,
		);
		const total = results.reduce((acc, result) => acc + result, 0);
		await channel.send(
			`${userMention}: :game_die: Rolled ${numDice} d${sides} ${results.join(
				', ',
			)} (Total: ${total})`,
		);
	} else {
		await channel.send(
			`${userMention}: Invalid input. Please use !d <numSides> <numDice> to roll multiple dice.`,
		);
	}
}
