import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AddProduct from './addProduct';
import Cart from './cart';
import LoginPage from './login/loginpage';
import SignupPage from './login/signuppage';


// useEffect(() => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     <Route path="/" element={<Navigate to="/home" />} />
//   }
// })

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />
  },
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/add",
    element: <AddProduct />,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

