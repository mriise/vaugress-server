import { MatrixAuth, MatrixClient, AutojoinRoomsMixin } from "matrix-bot-sdk";
import * as config from '../config.js';

const NAMESPACE = 'app.vaugress'
var prefix = ';'

const client = new MatrixAuth("https://matrix.org").passwordLogin(config.bot_login.user, config.bot_login.password)



client.then( (client :MatrixClient) => {
    
    const createTask = (roomId :string, content :object) => {
        client.sendEvent(roomId, NAMESPACE + '.create', content);
    }
    
    const getTaskID = (roomId) => {
    
    }

    AutojoinRoomsMixin.setupOnClient(client);
    client.on("room.message", (roomId, event) => {
        if (!event["content"]) return;

        const sender = event["sender"];
        const body = event["content"]["body"];
        console.log(sender + " says " + body);
        
        if(body.startsWith(prefix + "create")){
            const content = {
                body: `${(Math.random() * 1000000).toFixed(0)} updated by ${sender}`,
            }
            createTask(roomId, content);
        }

        // if (body.startsWith("!echo")) {
        //     const replyText = body.substring("!echo".length).trim();
        //     client.sendNotice(roomId, `${sender} said: ${replyText}`);
        // }
        
    });

    client.on('room.event', (roomId, event) => {
        const type = event["type"];
        if(type.startsWith(NAMESPACE)) {
            const operation = type.replace(NAMESPACE + '.', '');
            const sourceJSON = JSON.stringify(event['content'], undefined, 2);

            const replyHTML = `<p>vaugress <code>${operation}</code> event</p><code>${sourceJSON}</code>`;
            client.replyText(roomId, event, sourceJSON, replyHTML);

            switch (operation) {
                case 'create':
                    break;

                default:
                    break;
            }
        }
        
    });
    
    // Or to listen for any event that happens in a room:
    // client.on("room.event", (roomId, event) => {
    //     if (!event["content"]) return;
    //     console.log(event["sender"] + " sent " + event["type"]);
    // });
    
    client.start().then(() => console.log("Client started!"));

})

export default client;