import EventEmitter from "node:events";
import { SpotifyAuthEvents } from "../../factories/AppFactory.js";
import { ISpotifyAuthManager } from "../ISpotifyAuthManager.js";

export class SpotifyAuthManager implements ISpotifyAuthManager {
	private clientID: string;
	private callbackUrl: string = 'http://127.0.0.1:8888/callback';
	private spotifyBaseURL = 'https://accounts.spotify.com';
	private scope: string = 'user-read-currently-playing';

	private dispatcher: EventEmitter<SpotifyAuthEvents>;

	constructor (
		clientID: string,
		callbackUrl: string,
		dispatcher: EventEmitter<SpotifyAuthEvents>,
	) {
		this.clientID = clientID;
		this.callbackUrl = callbackUrl;
		this.dispatcher = dispatcher;
	}

	authCallback(code: string): void {
		this.dispatcher.emit('auth:spotify:success', code);
	}

	generateLink(codeChallenge: string): string {
		const params = {
			redirect_uri: this.callbackUrl,
			client_id: this.clientID,
			scope: this.scope,
			code_challenge: codeChallenge,
			response_type: 'code',
			code_challenge_method: 'S256',
		}

		const url = new URL(`${this.spotifyBaseURL}/authorize`);

		url.search = new URLSearchParams(params).toString();

		return url.toString();
	}
}
