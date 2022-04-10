const mongoose = require('mongoose'); 
// const db = require('./models'); 
// db.titles.find({title:{$regex: 'bug',$options:'i'}}).forEach(r=>print(JSON.stringify(r))) 

db.Title.find()
.then(titles => console.log(JSON.stringify(titles, null, '\t'))) 