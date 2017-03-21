const mongoose = ('mongoose');

mongoose.connect('mongod://localhost/lab_notebook_db', (err) => {
  if(err){
    console.log(err);
  } else {
    console.log('MongoDB Connected')
  }
})

module.exports = mongoose; 
