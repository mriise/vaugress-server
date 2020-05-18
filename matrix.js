const AutojoinRoomsMixin = require("matrix-bot-sdk").AutojoinRoomsMixin;
const MatrixAuth = require("matrix-bot-sdk").MatrixAuth;
const CreateEvent = require("matrix-bot-sdk").CreateEvent;

var config = require("./config.js")
const NAMESPACE = 'app.vaugress'

const client = new MatrixAuth("https://matrix.org").passwordLogin(config.bot_login.user, config.bot_login.password)

const createTask = (roomId, content) => {
    client.sendEvent(roomId, NAMESPACE + '.create', content);
}

client.then( (client) => {
    AutojoinRoomsMixin.setupOnClient(client);
    client.add
    client.on("room.message", (roomId, event) => {
        if (!event["content"]) return;

        const sender = event["sender"];
        const body = event["content"]["body"];
        console.log(sender + " says " + body);
        
        if(body.startsWith("test")){
            const content = {
                body: `${(Math.random() * 1000000).toFixed(0)} updated by ${sender}`,
            }
            const eventID = client.sendEvent(roomId, NAMESPACE + '.create', content);

            eventID.then( id => {
                console.log(`event sent ID: ${id}`)
                client.sendNotice(roomId, `${sender} started test ID: ${id}`);
            }).catch(err => {
                console.error("ERR:" + err);
            })

        }

        // if (body.startsWith("!echo")) {
        //     const replyText = body.substring("!echo".length).trim();
        //     client.sendNotice(roomId, `${sender} said: ${replyText}`);
        // }
        
    });

    client.on('room.event', (roomId, event) => {

        if(event["type"] == NAMESPACE + '.create'){
            client.sendNotice(roomId, `${sender} said: ${replyText}`);
        }
        
    });
    
    // Or to listen for any event that happens in a room:
    // client.on("room.event", (roomId, event) => {
    //     if (!event["content"]) return;
    //     console.log(event["sender"] + " sent " + event["type"]);
    // });
    
    client.start().then(() => console.log("Client started!"));

})