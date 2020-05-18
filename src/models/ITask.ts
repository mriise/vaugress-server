import { Types } from "mongoose";
type ObjectId = Types.ObjectId;

export interface Task extends Relation {
    title: string,
    content: Object,
}

export interface Relation {
    parents?: Array<ObjectId>,
    children?: Array<ObjectId>
}