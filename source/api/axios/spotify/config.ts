import axios from "axios";
import { URL, URLSearchParams } from 'node:url';

process.loadEnvFile('.env');

const spotifyBaseURL = 'https://accounts.spotify.com';
const scope = 'user-read-currently-playing';
const redirectUri = 'http://127.0.0.1:8888/callback';
const clientId = process.env['CLIENT_ID'] as string;

const client = axios.create({
    baseURL: spotifyBaseURL,
});

function authenticate (codeChallenge: string) {
    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    })

    const url = new URL(`${spotifyBaseURL}/authorize`);

    url.search = params.toString();

    return url;
}

export const SpotifyAccountService = {
    authenticate,
    client,
}