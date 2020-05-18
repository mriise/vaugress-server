import koa from 'koa'
import {team, project} from './api'
import CommandHandler from './commands/handler'
import * as config from '../config.js';

// import client from './matrix'
// import { ConsoleLogger } from 'matrix-bot-sdk';
import { LogService, RichConsoleLogger, LogLevel, MatrixClient, MatrixAuth, AutojoinRoomsMixin } from 'matrix-bot-sdk';


var app = new koa();

// app.use(team.routes());
app.use(project.routes());
app.listen(3000);
// console.log('started')

const attachAutoJoinMixin = async (client :Promise<MatrixClient>) => { AutojoinRoomsMixin.setupOnClient(await client) }


const client = new MatrixAuth(config.homeserverURL).passwordLogin(config.bot_login.user, config.bot_login.password)

if(config.autoJoin){
    attachAutoJoinMixin(client);
}

client.then( async client => {
    const commands = new CommandHandler(client, config.mongodbURI);

    await commands.start();
    LogService.info("index", "Starting sync...");
    await client.start();

}).catch(e => { LogService.error("index", e.message);})


LogService.setLogger(new RichConsoleLogger());
LogService.setLevel(LogLevel.INFO);

LogService.info("index", "Bot starting...");


// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });