import "./login.css";
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {  signInWithEmailAndPassword ,onAuthStateChanged  } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { resetResponse, resetResponseAfterInteval, setResponse, selectErrors} from "../features/responseSlice";


const Login=()=>{

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch= useDispatch();
  const navigate = useNavigate();

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if(user){
          navigate('/home')
        }
      })
    },[navigate])

  const onLogin = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/home")
          dispatch(setResponse({
            type:'message',
            message:'User Login Successfully'
          }))
          resetResponseAfterInteval(dispatch)
          console.log(user);
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          dispatch(setResponse({
            type:'error',
            message:error.message
          }))
          resetResponseAfterInteval(dispatch)
          console.log(errorCode, errorMessage)
      });
     
  }
  const errors= useSelector(selectErrors);
  // console.log(errors)
    return(
        <div className="container-fluid">
         
            <div className="row mx-0">
              <div className="col-12 login-col">
                <div className="card form-card">
                <div className="row mx-0">
                  <div className="col-12 d-flex flex-column align-items-center">
                    <img src="%PUBLIC_URL%/../dist/images/user-icon1.png" alt="icon here" className="login-icon" />
                    <h6>LOGIN</h6>
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
                  <form action="" method="post">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                      <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="row mt-2">
                      <div className="col-12 text-end">
                        <button onClick={onLogin} className="btn btn-dark">Login</button>
                      </div>
                    </div>
                  </form>
                  <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>
                </div>
              </div>

            </div>
        </div>
    )

}
export default Login;