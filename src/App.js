/* eslint-disable no-unused-vars, no-console */
import './App.css';
import React, { useEffect, useCallback, useState } from 'react';
import { onAuthStateChanged,signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { useDispatch,useSelector } from 'react-redux';
import {setUserActiveStatus,setUserLogoutStatus, selectUserEmail, selectUserId, selectUserName } from './features/userSlice';
import {query, collection, onSnapshot,  updateDoc, doc, deleteDoc, addDoc} from 'firebase/firestore';
import { setTodos, addTodo, selectTodos} from './features/todoSlice';
import ListTodos from './components/listTodos';
import moment from 'moment';
import { selectMessages,resetResponse,  resetResponseAfterInteval, setResponse, selectErrors} from './features/responseSlice';

const App= ()=> {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId =  useSelector(selectUserId);
  const [taskInput, setTaskInput]=useState('');
  const messages=useSelector(selectMessages)


    const authCheck=useCallback(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          dispatch(setUserActiveStatus({
            userName:"admin",
            userEmail:user.email,
            userId:user.uid
  
          }));
          navigate('/home');
          console.log("logged in user uid", uid)
        } else {
          // User is signed out
          navigate('/');
          console.log("user is logged out")
        }
      });
    },[navigate, dispatch])

    const unSubscribe=  useCallback( ()=>{

    // fetch data from firebase
    const q = query(collection(db,'tasks'));
    try{
      onSnapshot(q, (QuerySnapshot=>{
        let todosArr=[];
        QuerySnapshot.forEach(doc=>{
          // console.log(doc.data())
            todosArr.push({...doc.data(),id:doc.id})
        })
        dispatch(setTodos({
          todos:todosArr,
        }))
        // console.log(todosArr)
        }))
    }catch(ex){
      dispatch(setResponse({
        type:'error',
        message:ex.message,
      }))
      resetResponseAfterInteval(dispatch)
    };
  

    },[dispatch, ])





// handling task delete function
const handleTaskDelete=async (todo)=>{
  console.log('function called to delete');
  
  const newTodos=todos.filter(td=>td.id!==todo.id);
  dispatch(setTodos({
    todos:newTodos
  }))
    await deleteDoc(doc(db, 'tasks', todo.id))
  

}






// toggling task complete status
const handleTaskStatus= async (todo)=>{
  // console.log('status changed')
    await updateDoc(doc(db,'tasks',todo.id),{
      completed: !todo.completed
      })
}

//
const addTodo=async(e)=>{
  e.preventDefault();
  const date=new Date();
 await addDoc(collection(db, 'tasks'),{
    name:taskInput,
    completed:false,
    due_date:moment().format()
 }) 
setTaskInput('');
}



// check auth status and fetch task from firebase database at component load
  useEffect(()=>{
    authCheck();
    unSubscribe();

}, [unSubscribe, authCheck])


//  logout user
const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
    dispatch(setUserLogoutStatus());
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    console.log(error.message)
    });
}

const todos = useSelector(selectTodos);
const errors= useSelector(selectErrors);
console.log("component rendered")
  return (
    <div className='container-fluid'>
          <div className="row mx-0">
            <div className="col-12">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
                  <span className="navbar-brand " >Hidden brand</span>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    {
                     userId ? (
                        <li className="nav-item">
                         
                        <a className="nav-link" href='#' onClick={handleLogout}>logout</a>
                      </li>
                      ):(
                        <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                      </li>
                       )
                     } 

                  
                 
                  </ul>
              
                </div>
              </div>
            </nav>
            </div>
          </div>
          <div className="row mx-0">
                  <div className="col-12">
                      {
           
                        messages.length?(
                          messages.map((msg,i)=>(
                            <div className="alert alert-success alert-dismissible fade show" role="alert" key={i}>
                              <strong>Success:</strong>{msg}.
                              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResponse())}}></button>
                            </div>
                          ))
                        ):('')
                      }
                  </div>
                </div>
                <div className="row mx-0">
                  <div className="col-12">
                      {
           
                        errors.length?(
                          errors.map((err,i)=>(
                                    <div className="alert alert-warning alert-dismissible fade show" role="alert" key={i}>
                                      <strong>Error:</strong>{err}.
                                      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{dispatch(resetResponse())}}></button>
                                    </div>
                           
                          ))
                        ):('')
                      }
                  </div>
                </div>
          <div className="row mx-0 mt-5">
            <div className="col-12">
              <div className="card d-flex flex-col justify-content-center align-items-center border-1 p-3" >
                <h1 className='text-center'>Todo App</h1>
                <form onSubmit={addTodo}>
                  <div className="input-group">
                    <input type="text" name="task_name" className='form-control' value={taskInput} id="task_name" onChange={(e)=>setTaskInput(e.target.value)} />
                    <button className='btn btn-primary' type='submit'><i className='fa fa-plus'></i></button>
                  </div>
                  </form>
                      <ListTodos todos={todos} handleDelete={handleTaskDelete} handleTaskStatus={handleTaskStatus}></ListTodos>
            
              </div>
            </div>
          </div>
    </div>
  );
}

export default App;
