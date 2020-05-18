
import { MatrixClient, MentionPill, MessageEvent, MessageEventContent, LogService } from "matrix-bot-sdk";
import { Collection } from "mongoose";
import { TaskController } from "../controllers/TaskController";
import { Task } from '../models/ITask';

const htmlEscape = require("escape-html");

export async function createTask(event: MessageEvent<MessageEventContent>, args: string[], client: MatrixClient, db: Collection) {
    let title = args[1];
    let content = args[2];
    let contentOjb: Object;
    if(!title) client.replyNotice(db.name, event, 'title is required');   
    if(!content) contentOjb = {}
    else contentOjb = {note: content}
    let text = `created ${title}`;
    let html = `created <code>${title}</code>`;

    let cont = new TaskController(db.name, db)
    let task: Task = {title: title, content: contentOjb};

    cont.addTask(task).then( () => {
        return client.sendMessage(db.name, {
            body: text,
            msgtype: "m.notice",
            format: "org.matrix.custom.html",
            formatted_body: html,
        });
    }).catch( err => {
        LogService.error("Task Controller", err);
    })


}