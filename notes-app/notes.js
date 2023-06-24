import fs from 'fs'
import chalk from "chalk"
import { exit } from 'process';

const notesFile = 'notes.json'

export const getNotes = function () {
    return 'Your notes...'
}

export const addNotes = function(title, body){
    const notes = loadNotes()
    
    if(hasDuplicates(notes, title)){
        console.log(chalk.red('Note already exists'));
        return
    }
    
    const record = {
        title : title,
        body : body
    }
    notes.push(record)
    saveNotes(notes)
}

export const removeNote = function(title){
    const notes = loadNotes()
    if(!hasDuplicates(notes, title)){
        console.log(chalk.red('No note with title: ' + title + ' was found'));
        return
    }
    console.log(chalk.green('Note to be removed'));
}

const saveNotes = function(notes){
    fs.writeFileSync(notesFile, JSON.stringify(notes), (err) => {
        if (err) throw err;
    })
    console.log(chalk.green('Notes saved successfully'));
}

const hasDuplicates = function(notes, title){
    const duplicatesArray = notes.filter(function(note){
        return note.title === title
    })
    return duplicatesArray.length !== 0
}

const loadNotes = function(){
    try{
        return JSON.parse(fs.readFileSync(notesFile).toString())
    } catch(e){
        return []
    }
    
}