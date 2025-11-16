import { Box, Text, useInput } from 'ink';
import Spinner from 'ink-spinner';
import React from 'react';

export default function App() {

	useInput((input, key) => {
		console.log(input, key.ctrl);

		if(key.ctrl && input === 'c') {
			process.exit(0);
		}
	});

	return (
		<Box>
			{/* <Text>
				Some, <Text color="green">{name}</Text>
			</Text> */}

			<Spinner type='dots2' />
			<Text>
				Loading
			</Text>
		</Box>
	);
}
