import { Server } from 'node:http';
import url from 'node:url';
import { IAuthServer } from "../IAuthServer.js";

export class HttpNodeServer implements IAuthServer {
	private serverInstance: Server;
	private serverPort: number | 8888;

	private requestHandler: ((code: string) => void) | null = null;

	constructor (
		server: Server,
	) {
		this.serverInstance = server;
		this.serverPort = 8888;
	}

	start(): void {
		this.serverInstance.on('request', (req, res) => {
			if(!req.url) {
				res.statusCode = 400;
				res.end(JSON.stringify({ error: true }));
				return;
			}

			const reqUrl = url.parse(req.url, true);

			if(reqUrl.pathname !== '/callback') {
				res.statusCode = 404;
				res.end(JSON.stringify({ error: true }));
				return;
			}

			const code = reqUrl.query['code'] as string || null;
			if(this.requestHandler && code) {
				this.requestHandler(code);
			}

			const error = reqUrl.query['error'] || null;
			res.statusCode = 404;
			res.end(JSON.stringify({ error: true, message: error }));

			this.serverInstance.close();
		});

		this.serverInstance.listen(this.serverPort, '127.0.0.1', () => {
			console.log('Server is working !');
		});
	}

	close(): void {
		this.serverInstance.close();
	}

	onRequest(callback: (code: string) => void): void {
		this.requestHandler = callback;
	}
}
