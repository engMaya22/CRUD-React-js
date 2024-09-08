import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import Index from './pages/Index';
import { Provider } from 'react-redux';
import { store } from './store';
// import AddPost from './pages/AddPost';
// import EditPost from './pages/EditPost';
// import Detail from './pages/Detail';

import WithGuard from './components/WithGuard';
//for code spilting
const AddPost = React.lazy(() => import('./pages/AddPost'));
const EditPost = React.lazy(() => import('./pages/EditPost'));
const Detail = React.lazy(() => import('./pages/Detail'));

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
        element: 
                  // <WithGuard> way1 
                  <Suspense fallback="loading please wait">
                     {/* we can pass component to fallback */}
                    <AddPost />
                  </Suspense>
                // </WithGuard>
              
      },
      {
        path:"/post/:id/edit",
        element: <Suspense fallback="loading please wait">
                   <EditPost />
                  </Suspense>,
        loader:postParamsHandler
        
      },
      {
        path:"post/:id",
        element: <Suspense fallback="loading please wait">
                   <Detail />
                  </Suspense>,
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
