import http from 'node:http';
import { IAuthServer } from "../server/IAuthServer.js";
import { HttpNodeServer } from "../server/nodejs/HttpNodeServer.js";
import { AuthCallbackService } from '../services/AuthCallbackService.js';
import { ISpotifyAuthManager } from '../services/ISpotifyAuthManager.js';
import { SpotifyAuthManager } from '../services/spotify/SpotifyAuthManager.js';

process.loadEnvFile('.env');

export class AppFactory {
	static spotifyClientID: string = process.env['CLIENT_ID'] as string;
	static callbackURL: string = process.env['CALLBACK_URL'] as string;

	constructor () {
	}

	static createAuthServer() {
		const httpServer = http.createServer();
		const server: IAuthServer = new HttpNodeServer(httpServer)

		const authManager: ISpotifyAuthManager = new SpotifyAuthManager(
			this.spotifyClientID,
			this.callbackURL,
		);

		return new AuthCallbackService(server, authManager);
	}
}
