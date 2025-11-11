#!/usr/bin/env node
import { render } from 'ink';
import meow from 'meow';
import React from 'react';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ my-ink-cli [options] [commands]

	Commands
		auth <service> (spotify or musixmatch)

	Options
		--name  Your name

	Examples
	  $ my-ink-cli --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);

render(<App name={cli.flags.name} />);
