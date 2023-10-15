import express from "express";


export const TasksApi = express.Router();


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

TasksApi.get("", (req,res) => {
    console.log("Somerthing happend")
    res.json(Tasks)
})

TasksApi.post("",(req,res) => {
    const {task} = req.body;
    Tasks.push({
        id: Tasks.length,
        taskName: task
    } )
    console.log(Tasks)
    res.status(200);
})