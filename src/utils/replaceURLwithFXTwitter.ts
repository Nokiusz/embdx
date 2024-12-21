import { URLS } from './urls';

export function replaceURLwithFXTwitter(messageContent: string): string {
	let newMessageContent =
		'replaceURLwithFXTwitter() called with wrong url type';
	if (messageContent.startsWith(URLS.twitterURL)) {
		newMessageContent = messageContent.replace(
			URLS.twitterURL,
			URLS.fxtwitterURL,
		);
	} else if (messageContent.startsWith(URLS.xURL)) {
		newMessageContent = messageContent.replace(URLS.xURL, URLS.fxtwitterURL);
	} else if (messageContent.startsWith(URLS.tiktokURL)) {
		newMessageContent = messageContent.replace(URLS.tiktokURL, URLS.tfxktokURL);
	} else if (messageContent.startsWith(URLS.instagramURL)) {
		newMessageContent = messageContent.replace(
			URLS.instagramURL,
			URLS.DDinstagramURL,
		);
	}
	return newMessageContent;
}
