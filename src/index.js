import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Detail from './pages/Detail';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import { store } from './store';
import AddPost from './pages/AddPost';
import EditPost from './pages/EditPost';
import WithGuard from './components/WithGuard';

const postParamsHandler = ({params})=>{
  if(isNaN(params.id))//not a number
  {
    throw new Response("Bad Request", {statusText : 'please make sure to use correct post id' , status: 400 });

  }
  return ''

}
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
        element: <WithGuard>
                       <AddPost />
                </WithGuard>
              
      },
      {
        path:"/post/:id/edit",
        element: <EditPost />,
        loader:postParamsHandler
        
      },
      {
        path:"post/:id",
        element: <Detail />,
        loader:postParamsHandler

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
