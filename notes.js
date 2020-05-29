/* Contains Note App functionality */

// Imported Node Modules
const fs = require('fs')
const chalk = require('chalk')

/* Save notes to JSON file */
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJsON)
}

/* Load notes from JSON file */
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

/* Adds a note if the title doesn't already exist */
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

/* Removes the note with specified title if it exists */
const removeNote = (title) => {
    const notes = loadNotes()
    const filteredNotes = notes.filter((note) => note.title !== title)

    if (filteredNotes.length === notes.length-1) {
        saveNotes(filteredNotes)
        console.log(chalk.green.inverse("Note removed: " + title))
    } else {
        console.log(chalk.red.inverse("No note found with title: " + title))
    }
}

/* Lists all the note titles currently stored */
const listNotes = () => {
    console.log(chalk.bold.underline.bgBlue.white('Your Notes'))
    const notes = loadNotes()
    notes.forEach((note) => console.log(note.title));
}

/* Displays the body of the note with specified title if it exists */
const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.bold.underline.bgBlueBright.white(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('No note found with title: ' + title))
    }
}

/* Functions to export that can be accessed by app */
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}