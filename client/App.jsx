import { Link, Route, Routes,useNavigate, } from "react-router-dom";
import React, { useEffect, useState } from "react";




function FrontPage(){
    return (
        <ul>
            <li className="linkLi">
                <Link to={"/Tasks"}>List Tasks</Link>
            </li>
            <li className="linkLi">
                <Link to={"/Tasks/new"}>Add new Task</Link>
            </li>
        </ul>
    )
}

async function FetchTasks(){
    const res = await fetch("/api/Tasks")
    const tasksJson = await res.json();
    console.log(tasksJson)
    return tasksJson;
}

function Tasks(){
    const [tasks, setTasks] = useState([])
    async function loadTasks(){
        setTasks(await FetchTasks())
    }
    function getSelected(e){
        console.log(e.target.value)
    }
    useEffect(() => {
        loadTasks()
    }, []);

    return<>
    <h1>All Tasks</h1>
    <div id="mainContent">
    <form>
            {tasks.map(m => (<div class="taskBox" key={m._id}>{m.data}</div>)) }        
    </form>
    </div>
    <div id="addNewTask"><Link id="addNewTaskText" to={"/tasks/new"}>Add Task</Link></div>
    </>
}
function AddNewTask(){
    const [task, setTask] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        //console.log(task)
        e.preventDefault();
        postTask();
        navigate("/tasks")
    }

    async function postTask(){
        try{
            const data = await fetch("/api/tasks", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({task})
            })
        }catch(error){
            console.log("try statement failed")
            console.log(error.message)
        }
    }
    return <div id="TaskAddFormBox">
        <form onSubmit={handleSubmit}>
        <label>
            Task:
            <input type="text" onChange={e => setTask(e.target.value)}></input>
        </label>
        <p>{task}</p>
        <input type="submit" value="Submit"/>
    </form>
    </div>
}





function TaskRoutes(){
    return (
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/Tasks"} element={<Tasks/>}/>
            <Route path={"/tasks/new"} element={<AddNewTask/>}/>
        
        </Routes>
    )
}

export function App(){
    return <>
    <div id="appBody">
        <header>
            <h1>Tasks</h1>
        </header>
        <nav>
            <div className="navLink"><Link to={"/"}>Front Page</Link></div>
        </nav>
        <div id="appMain">
            <TaskRoutes></TaskRoutes>
        </div>

        <footer>
            <p>Created by Kyppen</p>
        </footer>
    </div>
    </>
}