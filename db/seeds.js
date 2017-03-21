const NoteBook = require("./models.js").NoteBook
const seedData = require("./seedData.json")

NoteBook.remove({}, () => {
    NoteBook.create(seedData, () => {
        process.exit()
    })
})
