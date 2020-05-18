import { RoomEvent, EventRedactedError } from "matrix-bot-sdk";

const ObjectID = require("mongodb").ObjectID;
type ObjectID = typeof import("mongodb").ObjectID;

/**
 * The types of messages that are valid in Matrix.
 * @category Matrix event info
 * @see MessageEventContent
 */
export type EventType =
    "m.text"
    | "m.emote"
    | "m.notice"
    | "m.image"
    | "m.file"
    | "m.audio"
    | "m.location"
    | "m.video"
    | string;

export interface Task {
    _id: ObjectID,
    parents ?: Array<ObjectID>,
    content: Object,
    children: Array<ObjectID>,
}

/**
 * The content definition for m.room.message events
 * @category Matrix event contents
 * @see MessageEvent
 */
export interface MessageEventContent {
    body: string;
    msgtype: EventType;
    external_url?: string;
}


/**
 * Represents an m.room.message room event
 * @category Matrix events
 */
export class VaugressEvent<T extends MessageEventContent> extends RoomEvent<T> {
    constructor(event: any) {
        super(event);
    }
    /**
     * Whether or not the event is redacted (or looked redacted).
     */
    public get isRedacted(): boolean {
        // Presume the event redacted if we're missing a body or message type
        const noContent = !this.content.body && this.content.body !== "";
        const noMsgtype = !this.content.msgtype && this.content.msgtype !== "";
        return noContent || noMsgtype;
    }
    /**
     * The message's type.
     */
    public get messageType(): EventType {
        const type = this.content.msgtype;
        if (!type && type !== "") throw new EventRedactedError("missing msgtype");
        return type;
    }
    /**
     * The `body` of the message.
     */
    public get textBody(): string {
        const body = this.content.body;
        if (!body && body !== "") throw new EventRedactedError("missing body");
        return body;
    }
    /**
     * The `external_url` of the message, if it exists
     */
    public get externalUrl(): string | undefined {
        return this.content.external_url || undefined;
    }
}