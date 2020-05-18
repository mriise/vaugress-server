import{ Connection, Collection, Types} from 'mongoose';
import { Task } from '../models/ITask';


export class TaskController{
    private project: Collection;

    constructor(roomId: string, project: Collection) {
        this.project = project

    }

    private iDQuery (id: Types.ObjectId ) { return {_id: {$eq: id}} }

    public addTask (task: Task) {                
        return this.project.insertOne(task)
    }

    public getTask (taskId: Types.ObjectId) {
        return this.project.find(this.iDQuery(taskId))
    }

    public getTaskFromTitle (title: string) {
        return this.project.find({title: {$eq: title}})
    }

    public getTaskFromChildren (taskId: Types.ObjectId) {
        return this.project.find({children: { $elemMatch: { $eq: taskId } }})
    }

    public getTaskFromParents (taskId: Types.ObjectId) {
        return this.project.find({parents: { $elemMatch: { $eq: taskId } }})
    }

    public redactTask (taskId: Types.ObjectId) {
        return this.project.deleteOne(this.iDQuery(taskId))
    }

    public updateTask (taskId: Types.ObjectId, updates: Object) {
        return this.project.updateOne(this.iDQuery(taskId), updates)
    } 
}
