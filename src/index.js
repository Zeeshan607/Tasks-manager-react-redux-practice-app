import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './Auth/Login';
// import { render } from 'react-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from "./app/store"
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <App/>,
  },
  // {
  //   path: "login",
  //   element: <Login/>,
  // },
]);



createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
);





// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

// render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<App />} />
//           <Route path="login" element={<Login />} />
//         </Routes>
//       </Router>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );



























// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

