import React from "react";
// import moment from "moment";
import "./listTodos.css";
// import { Timestamp } from "firebase/firestore";

const ListTodos =React.memo((props)=>{
    if(props.todos.length === 0){
        return <span className="loading-icon"><i className="fa fa-spinner fa-spin"></i></span>
    }
    // const ParseTimestamp=(ts)=>{
    //   return new Timestamp(ts.seconds, ts.nanoseconds);
    // }
 
// console.log(todos)
// console.log(props.delete())
    return(

<ul className="list-unstyled tasks-list">

        {

            props.todos.map((td,i)=>(
                // td.completed ? (
                  <li className={`task-item ${td.completed? ' completed' : ''} `}  key={i}>
                    <input type="checkbox" name="is_completed" checked={td.completed?'checked':''}  onChange={()=>{props.handleTaskStatus(td)}} id="complete_status" />
                    <span className="text">{td.name}</span>
                    <span className="link trash-icon " onClick={()=>{props.handleDelete(td)}}><i className="fa fa-trash-alt"></i></span>
                 </li>
                // ):(
                //   <li className="task-item " key={i}>
                //       <input type="checkbox" name="is_completed" onChange={()=>{props.handleTaskStatus(td.id)}}  id="complete_status" />
                //       <span className="text">{td.name}</span>
                //       <span className="link trash-icon " onClick={()=>{props.handleDelete(td.id)}}><i className="fa fa-trash-alt"></i></span>
                //   </li>
                // )
              

            
            ))
         
        }
    
    </ul>
    )
})
export default ListTodos