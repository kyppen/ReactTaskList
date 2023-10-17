import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config()




export const TasksApi = express.Router();

//const uri = "mongodb+srv://admin:i00oKsCDehVuQh1e@kyppencluster.trmuwta.mongodb.net/TaskList?retryWrites=true&w=majority";

const mongoClient = new MongoClient(process.env.url)

const data = await mongoClient.db().collection("Task").find({}).toArray();

//const response = await mongoClient.db().collection("Task").insertOne({data: "something"})

console.log(data)


mongoClient.connect().then((connection) => {
    const database = connection.db("TaskList")
    const collection = database.collection("Task")
    TasksApi.post("/",(req, res) => {
        const {task} = req.body;
        console.log(task)
        collection.insertOne({data: task})
        res.send()
    })
    TasksApi.get("/", async (req, res) => {
        const data = await mongoClient.db().collection("Task").find({}).toArray();
        res.json(data)
    })

})


const Tasks = [
    {
        id: 0,
        taskName: "Create prject"
    },{
        id:1,
        taskName: "add TypeScript"
    },{
        id:2,
        taskName: "add Prettier"
    }
]
/*
TasksApi.get("", (req,res) => {
    console.log("Somerthing happend")
    res.json(Tasks)
})

TasksApi.post("",(req,res) => {
    const {task} = req.body;
    Tasks.push({
        id: Tasks.length,
        data: task
    } )
    console.log(Tasks)
    res.status(200);
})*/