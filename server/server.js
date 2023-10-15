import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { TasksApi } from "./TasksApi.js";

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use("/api/tasks", TasksApi)

app.use(express.static("../client/dist"))

app.use((req, res, next) => {
    if(req.method == "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../client/dist/index.html"))
    }else{
        next()
    }

})
app.listen(process.env.PORT || 3000);