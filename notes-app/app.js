#!/usr/bin/env node

import chalk from "chalk"
import yargs from "yargs"
import { hideBin } from 'yargs/helpers'
import { getNotes } from './notes.js'

yargs(hideBin(process.argv)).command({
    command: 'add',
    showInHelp : true,
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv)
    {
        console.log('Title: ' + argv.title + '\n')
        console.log('Body:\n\t' + argv.body)
    },   
}).command({
    command: 'remove',
    showInHelp : true,
    describe: 'Removes a note',
    handler: function(){
        console.log(chalk.red('Removing the note!'))
    },
}).command({
    command: 'list',
    showInHelp : true,
    describe: 'List all notes',
    handler: function(){
        console.log(chalk.blue('List all note!'))
    },
}).command({
    command: 'read',
    showInHelp : true,
    describe: 'Read a note',
    handler: function(){
        console.log(chalk.yellow('Read the note!'))
    },
}).argv