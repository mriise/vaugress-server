import koa from 'koa'
import {team, project} from './api'
import client from './matrix'
import { ConsoleLogger } from 'matrix-bot-sdk';
// import { LogService, RichConsoleLogger, LogLevel } from 'matrix-bot-sdk';

client

var app = new koa();

// app.use(team.routes());
app.use(project.routes());
app.listen(3000);
// console.log('started')

// LogService.setLogger(new RichConsoleLogger());
// LogService.setLevel(LogLevel.DEBUG);

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });