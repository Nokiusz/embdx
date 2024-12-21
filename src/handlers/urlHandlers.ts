import { replaceURLwithDDInstagram } from '../utils/replaceURLwithDDInstagram';
import { replaceURLwithFXTwitter } from '../utils/replaceURLwithFXTwitter';
import { replaceURLwithTfxktok } from '../utils/replaceURLwithTfxktok';
import { URLS } from '../utils/urls';

export const URL_HANDLERS = [
	{
		prefixes: [URLS.twitterURL, URLS.xURL],
		handler: replaceURLwithFXTwitter,
	},
	{ prefixes: [URLS.instagramURL], handler: replaceURLwithDDInstagram },
	{ prefixes: [URLS.tiktokURL], handler: replaceURLwithTfxktok },
];
