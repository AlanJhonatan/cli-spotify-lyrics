import { useEffect, useState } from "react";
import { AppFactory } from "../factories/AppFactory.js";

export function useSpotifyAuth() {
	const authFlow = AppFactory.createAuthServer();

	const [authenticationUrl, setAuthenticationUrl] = useState<string>('');
	const [authorizationCode, setAuthorizationCode] = useState<string>('');

	useEffect(() => {
		authFlow.setupServer();

		setAuthenticationUrl(authFlow.getAuthenticationUrl());

		AppFactory.eventBus.on('auth:spotify:success', (code: string) => {
			setAuthorizationCode(code);
		});
	}, []);

	return {
		authenticationUrl,
		authorizationCode,
	};
}
