import { URLS } from './urls';

export function replaceURLwithTfxktok(messageContent: string): string {
	let newMessageContent = 'replaceURLwithTfxktok() called with wrong url type';
	if (messageContent.startsWith(URLS.tiktokURL)) {
		newMessageContent = messageContent.replace(URLS.tiktokURL, URLS.tfxktokURL);
	}

	return newMessageContent;
}
