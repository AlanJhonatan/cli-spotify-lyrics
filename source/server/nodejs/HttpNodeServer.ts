import { Server } from 'node:http';
import { EventEmitter } from 'node:stream';
import url from 'node:url';
import { SpotifyAuthEvents } from '../../factories/AppFactory.js';
import { IAuthServer } from "../IAuthServer.js";

export class HttpNodeServer implements IAuthServer {
	private serverInstance: Server;
	private serverPort: number | 8888;

	private dispatcher : EventEmitter<SpotifyAuthEvents>;

	private requestHandler: ((code: string) => void) | null = null;

	constructor (
		server: Server,
		dispatcher: EventEmitter<SpotifyAuthEvents>,
	) {
		this.serverInstance = server;
		this.serverPort = 8888;
		this.dispatcher = dispatcher;
	}

	start(): void {
		this.serverInstance.on('request', (req, res) => {
			if(!req.url) {
				res.statusCode = 400;
				res.end(JSON.stringify({ error: true }));
				this.dispatcher.emit('auth:spotify:error', 'Invalid request');
				return;
			}

			const reqUrl = url.parse(req.url, true);

			if(reqUrl.pathname !== '/callback') {
				this.dispatcher.emit('auth:spotify:error', 'Invalid url path');
				res.statusCode = 404;
				res.end(JSON.stringify({ error: true }));
				return;
			}

			const code = reqUrl.query['code'] as string || null;
			if(this.requestHandler && code) {
				this.requestHandler(code);
				res.writeHead(200, { "content-type": 'text/html'});
				res.end('<h1>Authentication Success !</h1><p>You can close this window now ! :)</p>')
			}

			const error = reqUrl.query['error'] || null;
			if(error) {
				this.dispatcher.emit('auth:spotify:error', 'An error occurred.');
				res.statusCode = 404;
				res.end(JSON.stringify({ error: true, message: error }));
			}

			this.serverInstance.close();
		});

		this.serverInstance.listen(this.serverPort, '127.0.0.1', () => null);
	}

	close(): void {
		this.serverInstance.close();
	}

	onRequest(callback: (code: string) => void): void {
		this.requestHandler = callback;
	}
}
