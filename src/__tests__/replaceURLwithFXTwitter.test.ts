import { describe, expect, test } from 'bun:test';
import { replaceURLwithFXTwitter } from '../utils/replaceURLwithFXTwitter';

const TWITTER_TEST_URL =
	'https://twitter.com/Dexerto/status/1750616822662017342?s=20';
const X_TEST_URL = 'https://x.com/Dexerto/status/1750616822662017342?s=20';
const EMPTY_URL = '';
const INVALID_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const FX_URL = 'https://fxtwitter.com/Dexerto/status/1750616822662017342?s=20';
const ERROR_MSG = 'replaceURLwithFXTwitter() called with wrong url type';

describe('replaceURLwithFXTwitter', () => {
	test('replaces twitter url', () => {
		const twitter = replaceURLwithFXTwitter(TWITTER_TEST_URL);
		expect(twitter).toBe(FX_URL);
	});

	test('replaces x url', () => {
		const x = replaceURLwithFXTwitter(X_TEST_URL);
		expect(x).toBe(FX_URL);
	});

	test('displays error message when passed empty url', () => {
		const empty = replaceURLwithFXTwitter(EMPTY_URL);
		expect(empty).toBe(ERROR_MSG);
	});

	test('displays error message when passed invalid url', () => {
		const invalid = replaceURLwithFXTwitter(INVALID_URL);
		expect(invalid).toBe(ERROR_MSG);
	});
});
