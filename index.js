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
  NoteBook.find({}).then(function(notebooks){
    res.json(notebooks);
  });
})

app.post('/api/notebooks', function(req, res){
  Notebook.create(req.body.notebook).then(function(notebook){
    res.json(notebook)
  })
})

app.put('/api/notebooks/:title', function(req, res){
  Notebook.findOneandUpdate({title: req.params.title}, req.body,
  {new: true}).then(function(notebook){
    res.json(notebook)
  })
})

app.delete('api/notebooks/:title', function(req, res){
  Notebook.findOneandRemove({title: req.params.title}).then(function(){
    res.json({success: true})
  })
})

app.get('/api/notebooks/:title', function(req, res){
  NoteBook.findOne({title: req.params.title}).then(function(notebook){
    res.json(notebook)
  })
})


app.listen(3001, () => {
  console.log('Express in da house!')
})
