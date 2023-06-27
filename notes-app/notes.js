import fs from 'fs'
import chalk from "chalk"

const notesFile = 'notes.json'

export const getNotes = () => {
    return 'Your notes...'
}

export const addNotes = (title, body) => {
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

export const removeNote = (title) => {
    
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length === notesToKeep.length){
        console.log(chalk.red('No note like that exists'))
        return
    } 

    saveNotes(notesToKeep)
}

export const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue('Your notes'))
    notes.forEach(element => console.log('Title: ' + element.title));
}

export const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find( (element) => element.title === title)
    if (!note){
        console.log(chalk.red('Note not found'))
        return
    }
    console.log(chalk.blue('Title: ' + note.title) + '\nBody: ' + note.body)
}

const saveNotes = (notes) => {
    fs.writeFileSync(notesFile, JSON.stringify(notes), (err) => {
        if (err) throw err;
    })
    console.log(chalk.green('Notes saved successfully'));
}

const hasDuplicates = (notes, title) => {

    const duplicateNote = notes.find((note) => note.title === title)
    return duplicateNote
}

const loadNotes = () => {
    try{
        return JSON.parse(fs.readFileSync(notesFile).toString())
    } catch(e){
        return []
    }
}