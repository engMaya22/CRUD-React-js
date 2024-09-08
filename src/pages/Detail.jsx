import React, { useEffect } from 'react'
import usePostDetails from '../hooks/use-post-details';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { cleanRecord } from '../store/postSlice';

export default function Detail() {
  const dispatch = useDispatch();
  const {loading, error , record} = usePostDetails();
  useEffect(()=>{//to reset record when we render this page
    return ()=>{
     dispatch(cleanRecord())
    }
   },[dispatch])
  return (
    <div>
      <Loading isLoading={loading} error={error}>
           
              <p>Title: {record?.title}</p>
              <p>Description: {record?.description}</p>
         {/* we need to ? for not error  throw when not object created yet in runtime*/}
      </Loading>
    </div>
  )
}
