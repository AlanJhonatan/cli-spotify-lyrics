import { Box, Text, useInput } from 'ink';
import Spinner from 'ink-spinner';
import React from 'react';

export default function App() {

	useInput((input, key) => {
		console.log(input, key.ctrl);

		if(key.ctrl && input === 'c') {
			process.exit(0);
		}

		if(input === 'a') {
			localStorage.setItem('oi', 'oiii');
		}

		if(input === 's') {
			const hello = localStorage.getItem('oi') || '';
			console.log('hello', hello)
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
