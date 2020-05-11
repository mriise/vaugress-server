const AutojoinRoomsMixin = require("matrix-bot-sdk").AutojoinRoomsMixin;
const MatrixAuth = require("matrix-bot-sdk").MatrixAuth;

var config = require("./config.js")

const client = new MatrixAuth("https://matrix.org").passwordLogin(config.bot_login.user, config.bot_login.password)

client.then( (client) => {
    AutojoinRoomsMixin.setupOnClient(client);

    client.on("room.message", (roomId, event) => {
        if (!event["content"]) return;
        console.log(event["sender"] + " says " + event["content"]["body"]);
    
        client.sendMessage(roomId, {
            "msgtype": "m.notice",
            "body": "hello!",
        });
    
        // or...
        client.sendNotice(roomId, "hello!");
    });
    
    // Or to listen for any event that happens in a room:
    client.on("room.event", (roomId, event) => {
        if (!event["content"]) return;
        console.log(event["sender"] + " sent " + event["type"]);
    });
    
    client.start().then(() => console.log("Client started!"));

})