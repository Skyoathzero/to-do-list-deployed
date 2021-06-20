import React ,{useState} from 'react'
import Task from './task'

function App() {
    // {'taskName':'a','time':'s','color':'s','id':'24'},{'taskName':'as','time':'s','color':'s','id':'23'}

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({'taskName':'','time':'','color':''})
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)

    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setTask({...task, [name]:value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(task.taskName && checkTimeFormat(task.time) && checkIfHex(task.color) && isEditing){
            const newTasks = tasks.map((oldtask)=>{
                if(oldtask.id === editId){
                    const{taskName,time,color} = task
                    return {...oldtask,'taskName':taskName,'time':time,'color':color}
                }return oldtask
            })
            setTasks(newTasks)
            setIsEditing(false)
            setEditId(null)
            setTask({'taskName':'','time':'','color':''})
        }
        else if(task.taskName && checkTimeFormat(task.time) && checkIfHex(task.color)){
            const newTask = {...task,id:new Date().getTime().toString()}
            setTasks((tasks)=>[...tasks,newTask])
            setTask({'taskName':'','time':'','color':''})
        }
        else if(task.taskName && task.time && !checkIfHex(task.color)){
            const newTask = {...task,id:new Date().getTime().toString(),'color':'black'}
            setTasks((tasks)=>[...tasks,newTask])
            setTask({'taskName':'','time':'','color':''})
        }
    }

    const deleteTask = (id) =>{
        const newTasks = tasks.filter((task)=> task.id !== id)
        console.log(newTasks)
        setTasks(newTasks)
    }

    const editTask = (id) =>{
        const targetItem = tasks.find((task)=>task.id === id)
        setIsEditing(true)
        setEditId(id)
        setTask({'taskName':targetItem.taskName,
                'time':targetItem.time,
                'color':targetItem.color})}

    const changeListPosition = (id,newIndex) =>{
        let index = newIndex
        let targetItem = null
        if(newIndex>=tasks.length){
            targetItem = tasks[0]
            index = 0
        }
        else if(newIndex<0){
            targetItem = tasks[tasks.length-1]
            index =tasks.lengthx-1
        }
        else{targetItem = tasks[index]}

        const initialItem = tasks.find((task)=>task.id === id)
        
        const initialPos = tasks.indexOf(initialItem)
        let targetArr = tasks.map((task)=>task)
        targetArr[index] = initialItem
        targetArr[initialPos] = targetItem
        setTasks(targetArr)
    }
    const checkIfHex=(hex)=>{
        const re = /^(#[a-f0-9]{6}|#[a-f0-9]{3}|rgb *\( *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *\)|rgba *\( *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *, *[0-9]{1,3}%? *\)|black|green|silver|gray|olive|white|yellow|maroon|navy|red|blue|purple|teal|fuchsia|aqua)$/i
        if(re.test(hex)){
            return true
        }
        else{return false}
    }
    const checkTimeFormat = (time) =>{
        const re = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
        if (re.test(time)) {
            return true
        }
        else{return false}
    }

    return (
        <main>
            <section className="input-container">
                <form className="input-form" onSubmit={handleSubmit}>
                <button type="submit" className="btn ">{isEditing?'Edit Task':'Add Task'}</button>
                    <div className="form-control">
                        <input type="text" 
                        id='taskName'
                        name='taskName'
                        value={task.taskName}
                        onChange={handleChange}
                        placeholder="Task Name"
                        />
                    </div>
                    <div className="form-control">
                        <input type="text" 
                        id='time'
                        name='time'
                        value={task.time}
                        onChange={handleChange}
                        placeholder="HH:MM:SS format"/>

                        <input type="text" id='color'
                        name='color'
                        value={task.color}
                        onChange={handleChange}
                        placeholder="Please enter a valid color/hex/rgb"/>
                    </div>
                </form>
            </section>
            <section className="list-container">
                {tasks.map((task,index) =>{
                    const {taskName,time,color,id} = task;
                    return(<Task key={index} 
                    taskName={taskName} 
                    time={time} 
                    color={color} 
                    id={id} 
                    deleteTask={deleteTask}
                    editTask={editTask}
                    index={index}
                    changeListPosition={changeListPosition}
                    />)
                })}
            </section>
        </main>
    )
}

export default App
