const mongoose = require('./connection.js')

const NoteBookSchema = new mongoose.Schema({
    title: String,
    entry: String
}, {
    timestamps: true
})

const NoteBook = mongoose.model('NoteBook', NoteBookSchema)

module.exports = {
    Notebook: Notebook
}
