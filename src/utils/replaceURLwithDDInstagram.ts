import { URLS } from './urls';

export function replaceURLwithDDInstagram(messageContent: string): string {
	let newMessageContent =
		'replaceURLwithDDInstagram() called with wrong url type';
	if (messageContent.startsWith(URLS.instagramURL)) {
		newMessageContent = messageContent.replace(
			URLS.instagramURL,
			URLS.DDinstagramURL,
		);
	}

	return newMessageContent;
}
