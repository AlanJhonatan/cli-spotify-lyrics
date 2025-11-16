export interface IAuthServer {
	start(): void
	close(): void
	onRequest(callback: (code: string) => void): void;
}
