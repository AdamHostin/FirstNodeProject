#!/usr/bin/env node
import chalk from "chalk"
import yargs from "yargs"
import { hideBin } from 'yargs/helpers'
import * as notes from './notes.js'

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
        notes.addNotes(argv.title, argv.body)
    }
}).command({
    command: 'remove',
    showInHelp : true,
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title)
    }
}).command({
    command: 'list',
    showInHelp : true,
    describe: 'List all notes',
    handler: function(){
        console.log(chalk.blue('List all note!'))
    }
}).command({
    command: 'read',
    showInHelp : true,
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(){
        console.log(chalk.yellow('Read the note!'))
    }
}).argv