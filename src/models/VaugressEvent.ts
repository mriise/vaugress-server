const ObjectID = require("mongodb").ObjectID;
type ObjectID = typeof import("mongodb").ObjectID;

export interface Task {
    _id: ObjectID,
    parents: Array<ObjectID>,
    content: Object,
    children: Array<ObjectID>,
}

