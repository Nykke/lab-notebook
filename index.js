const express = require('express');
const parser = require('body-parser');
const NoteBook = require('./db/models.js').NoteBook


const app = express();

app.set('port', process.env.PORT || 3001)

app.use('/assets', express.static('public'))
app.use(parser.json({extend: true}))






app.listen(3001, () => {
  console.log('Express in da house!')
})
