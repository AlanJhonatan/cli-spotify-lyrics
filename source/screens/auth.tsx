import { Box, Newline, Text, useInput } from "ink";
import Link from "ink-link";
import Spinner from "ink-spinner";
import React from "react";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth.js";

export function Auth() {
	const { authenticationUrl, authorizationCode } = useSpotifyAuth();

	useInput((input, key) => {
		if(key.ctrl && input === 'c') {
			process.exit(0);
		}
	});

    return (
        <Box display="flex" flexDirection="column" marginTop={2}>
            <Box marginBottom={1} flexDirection="column">
                <Text underline bold>Spotify Authorization</Text>
            </Box>
            {
				authenticationUrl && !authorizationCode && (
					<Box display="flex" flexDirection="column">
						<Text>
							<Spinner type="dots" /> Use the link and access the spotify's authorization page:
						</Text>
						<Newline />
						<Link url={authenticationUrl}>
							<Text underline>{authenticationUrl}</Text>
						</Link>
					</Box>
				)
			}
			{
				authenticationUrl && authorizationCode && (
					<Box display="flex" flexDirection="column">
						<Text>
							✅ The authorization was successfull !
						</Text>
					</Box>
				)
			}
        </Box>
    )
}
