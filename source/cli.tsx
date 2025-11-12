#!/usr/bin/env node
import { program } from 'commander';
import { render } from 'ink';
import React from 'react';
import { CLIRouter } from './routes.js';

program.command('auth').description('Configura o token de autenticação para usar na API').argument('string');

program.parse();

const commands = program.commands;

const command = commands[0]?.name();
const args = commands[0]?.args || [];

if(!command) {
    process.exit(0);
}

render(<CLIRouter command={command} args={args || []} />)
