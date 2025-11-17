import { IAuthServer } from "../server/IAuthServer.js";
import { generatePKCE } from "../shared/pcke-config.js";
import { ISpotifyAuthManager } from "./ISpotifyAuthManager.js";

export class AuthCallbackService {
	private server: IAuthServer;
	private authManager: ISpotifyAuthManager;
	private codeChallenge: string;
	private authUrl: string;

	constructor(
		httpServer: IAuthServer,
		spotifyAuth: ISpotifyAuthManager,
	) {
		this.server = httpServer;
		this.authManager = spotifyAuth;

		const { codeChallenge } = generatePKCE();
		this.codeChallenge = codeChallenge;

		this.authUrl = this.authManager.generateLink(this.codeChallenge);
	}

	setupServer() {
		this.server.onRequest(this.authManager.authCallback);
		this.server.start();
	}

	getAuthenticationUrl(): string {
		return this.authUrl;
	}
}
