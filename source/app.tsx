import { Text } from 'ink';
import React from 'react';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	return (
		<Text>
			Some, <Text color="green">{name}</Text>
		</Text>
	);
}
