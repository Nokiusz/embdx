import { URLS } from './urls';

export function replaceURLwithFXTwitter(messageContent: string): string {
	let newMessageContent = 'replaceURL() called with wrong url type';
	if (messageContent.startsWith(URLS.twitterURL)) {
		newMessageContent = messageContent.replace(
			URLS.twitterURL,
			URLS.fxtwitterURL,
		);
	} else if (messageContent.startsWith(URLS.xURL)) {
		newMessageContent = messageContent.replace(URLS.xURL, URLS.fxtwitterURL);
	}

	return newMessageContent;
}
