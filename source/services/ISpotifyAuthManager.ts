export interface AuthStatus {
	success: boolean
}

export interface ISpotifyAuthManager {
	authCallback(req: any, res: any): void
	generateLink(codeChallenge: string): string
}
