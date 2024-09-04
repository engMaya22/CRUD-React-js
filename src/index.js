import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import Add from './pages/Add';
import Edit from './pages/Edit';
import ErrorPage from './pages/ErrorPage';
import Detail from './pages/Detail';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import { store } from './state';


const router = createBrowserRouter([
  {
    path:"/",
    element : <RootLayout />  ,
    errorElement : <ErrorPage />,
    children:[
      {
        path:"/post",
        element: <Index/>
      },
      {
        index:true,
        element: <Index/>
      },
      {
        path:"/post/add",
        element: <Add />
      },
      {
        path:":/post/id/edit",
        element: <Edit />
      },
      {
        path:"post/:id",
        element: <Detail />,
        loader: ({params})=>{
          // console.log(isNaN(params.id));
            if(isNaN(params.id))//not a number
            {
              //it will display message in status text in error page element 
              throw new Response("Bad Request", {statusText : 'please make sure to use correct post id' , status: 400 });

            }
            return ''
        }
      }

    ]

  }
]
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} /> 
    </Provider>
    /* we usually wrap route provider by redux provider */

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
