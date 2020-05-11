const MatrixClient = require("matrix-bot-sdk").MatrixClient;
const AutojoinRoomsMixin = require("matrix-bot-sdk").AutojoinRoomsMixin;

var config = require("./config.js")



const client = sdk.createClient("https://matrix.org");
client.login("m.login.password", config.bot_login).then((response) => {
    console.log(response.access_token);
});


const client = new MatrixClient("https://matrix.org", "your_access_token_here");
AutojoinRoomsMixin.setupOnClient(client);

// To listen for room messages (m.room.message) only:
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