const express = require('express');
const app = express();
const http = require('http').Server(app)
const parser = require('body-parser');
const NoteBook = require('./db/models.js').NoteBook


app.set('port', process.env.PORT || 3001)


app.use('/assets', express.static('public'))
app.use(parser.urlencoded({extend: true}))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/notebooks', function(req, res){
  Notebook.find({}).then(function(notebooks){
    res.json(notebooks);
  });
})

app.get('/api/notebooks/:title', function(req, res){
  Notebook.findOne({title: req.params.title}).then(function(notebook){
    res.json(notebook)
  })
})


app.listen(3001, () => {
  console.log('Express in da house!')
})
