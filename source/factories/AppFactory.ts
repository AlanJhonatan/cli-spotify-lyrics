import EventEmitter from 'node:events';
import http from 'node:http';
import { IAuthServer } from "../server/IAuthServer.js";
import { HttpNodeServer } from "../server/nodejs/HttpNodeServer.js";
import { AuthCallbackService } from '../services/AuthCallbackService.js';
import { ISpotifyAuthManager } from '../services/ISpotifyAuthManager.js';
import { SpotifyAuthManager } from '../services/spotify/SpotifyAuthManager.js';

process.loadEnvFile('.env');

export interface SpotifyAuthEvents {
	'auth:spotify:success': [ code: string ]
	'auth:spotify:error': [ error: string ]
}

export class AppFactory {
	static spotifyClientID: string = process.env['CLIENT_ID'] as string;
	static callbackURL: string = process.env['CALLBACK_URL'] as string;

	static eventBus = new EventEmitter<SpotifyAuthEvents>();

	constructor () {}

	static createAuthServer() {
		const httpServer = http.createServer();
		const server: IAuthServer = new HttpNodeServer(httpServer, this.eventBus);

		const authManager: ISpotifyAuthManager = new SpotifyAuthManager(
			this.spotifyClientID,
			this.callbackURL,
			this.eventBus,
		);

		return new AuthCallbackService(server, authManager);
	}
}
