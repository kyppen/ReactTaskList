import express from "express";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";




dotenv.config()


export const TasksApi = express.Router();

console.log(process.env.MONGODB_URL)
const mongoClient = new MongoClient(process.env.MONGODB_URL)

const data = await mongoClient.db().collection("Task").find({}).toArray();


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
