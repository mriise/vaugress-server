var koa = require('koa');
var bodyParser = require('koa-body');
var {team, project} = require('./api.js');
var client = require('./matrix.js')



var app = new koa();

//Set up body parsing middleware
app.use(bodyParser({
   formidable:{uploadDir: './uploads'},
   multipart: true,
   urlencoded: true
}));

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