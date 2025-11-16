import { useEffect, useState } from "react";
import { AppFactory } from "../factories/AppFactory.js";

export function useSpotifyAuth() {
	const authFlow = AppFactory.createAuthServer();

	const [authenticationUrl, setAuthenticationUrl] = useState<string>('');
	useEffect(() => {
		authFlow.setupServer();

		setAuthenticationUrl(authFlow.getAuthenticationUrl());
	}, []);

	return {
		authenticationUrl,
	};
}
