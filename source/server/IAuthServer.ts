export interface CallbackMessage {
	req: {
		url: string;
	}
	res: {
		writeHead(code: number, content: any):  void
		end(content: string): void
	}
}

export interface IAuthServer {
	start(): void
	close(): void
	onRequest(callback: (req: any, res: any) => void): void;
}
