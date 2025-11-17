export interface AuthStatus {
	success: boolean
}

export interface ISpotifyAuthManager {
	authCallback(code: string): void
	generateLink(codeChallenge: string): string
}
