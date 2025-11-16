import { Box, Newline, Text, useInput } from "ink";
import Link from "ink-link";
import Spinner from "ink-spinner";
import React from "react";
import { useSpotifyAuth } from "../hooks/useSpotifyAuth.js";

export function Auth() {
	const { authenticationUrl } = useSpotifyAuth();

	useInput((input, key) => {
		console.log(input, key.ctrl);

		if(key.ctrl && input === 'c') {
			process.exit(0);
		}
	});

    return (
        <Box display="flex" flexDirection="column" marginTop={2}>
            <Box marginBottom={1} flexDirection="column">
                <Text underline bold>Spotify Authorization</Text>
            </Box>
            <Box>
                <Text><Spinner type="dots" /> Starting Authorization...</Text>
            </Box>
            <Box display="flex" flexDirection="column">
                <Text>
                    Access the spotify authorization page:
                </Text>
                <Newline />
				<Link url={authenticationUrl}>
                    <Text underline>{authenticationUrl}</Text>
                </Link>
            </Box>
        </Box>
    )
}
