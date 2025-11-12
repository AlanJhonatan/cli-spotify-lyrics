import { Box, Text } from "ink";
import Link from "ink-link";
import Spinner from "ink-spinner";
import React, { useEffect, useState } from "react";
import { SpotifyAccountService } from "../api/axios/spotify/config.js";
import { createServer } from "../server/nodejs/server.js";
import { generatePKCE } from "../services/spotify/pcke-config.js";

export function Auth() {
    const [authorizationUrl, setAuthorizationUrl] = useState<string>('');

    function StartAuth() {
        const { codeChallenge } = generatePKCE();
        const authUrl = SpotifyAccountService.authenticate(codeChallenge);

        setAuthorizationUrl(authUrl.toString());
    }

    useEffect(() => {
        createServer(StartAuth);
    }, []);

    return (
        <Box display="flex" flexDirection="column" marginTop={2}>
            <Box marginBottom={1} flexDirection="column">
                <Text underline bold>Spotify Authorization</Text>
            </Box>
            <Box>
                <Text><Spinner type="dots" /> Starting Authorization...</Text>
            </Box>
            <Box>
                <Text>
                    Access the spotify authorization page:
                </Text>
            </Box>

            {authorizationUrl && <Box>
                <Link url={authorizationUrl}>
                    <Text underline>{authorizationUrl}</Text>
                </Link>
            </Box>}
        </Box>
    )
}