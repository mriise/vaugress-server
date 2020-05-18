import koa from 'koa'
import {team, project} from './api'
import client from './matrix'

client
var app = new koa();

// app.use(team.routes());
app.use(project.routes());
app.listen(3000);



// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });