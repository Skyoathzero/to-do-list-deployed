import React ,{useEffect,useState}from 'react'
import {FaRegEdit} from 'react-icons/fa';
import {AiOutlineDelete,AiFillCaretUp,AiFillCaretDown,AiFillPauseCircle,AiFillCaretRight} from 'react-icons/ai';
import useCountDown from 'react-countdown-hook';

function Task({taskName,
    time,
    color,
    id,
    deleteTask,
    index,
    editTask,
    changeListPosition}) {

        
    const parseTime = (time) =>{
        const[hour, minute, second] = time.split(':');
        const sec = (+hour) * 60 * 60 + (+minute) * 60 + (+second); 
        return sec
    }

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(parseTime(time)*1000)

    const parseSeconds = (second) =>{return new Date(second).toISOString().substr(11, 8)}

    const[timerStart,setTimerStart]=useState(true)
    const[timerFirstStart,setTimerFirstStart]=useState(true)
    const handleClick = () =>{
        if(timerFirstStart===true){
            start()
            setTimerFirstStart(false)
        }
        else if(timerStart===true){
            pause()
            setTimerStart(!timerStart)
        }
        else{resume();
            setTimerStart(!timerStart)
        }
    }
    return (<>
        <div className="task-object">
            <div className="task">
                <span className="dot" style={{backgroundColor:`${color}`}}></span>
                <h1>{taskName}</h1>
                <p>{parseSeconds(timeLeft)}</p>
            </div>
            <div className="task-btn-container">
                <button className="timer-control" onClick={() => handleClick()}>{timerStart?<AiFillPauseCircle/>:<AiFillCaretRight/>}</button>
                <div className="pos-btn">
                    <button className="pos-up" onClick={() =>{changeListPosition(id,index-1)}}><AiFillCaretUp/></button>
                    <button className="pos-down" onClick={() =>{changeListPosition(id,index+1)}}><AiFillCaretDown/></button>
                </div>
                <button className="edit-btn" onClick={()=>{editTask(id);}}><FaRegEdit/></button>
                <button className="delete-btn" onClick={() =>{deleteTask(id)}}><AiOutlineDelete/></button>
            </div>
        </div>
        
        
        
        </>
    )
}

export default Task
