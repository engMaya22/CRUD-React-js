import React, { useCallback, useEffect } from 'react'
import PostsLists from '../components/PostsLists'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts , deletePost } from '../store/postSlice';
import Loading from '../components/Loading';

export default function Index() {
  const dispatch = useDispatch();
  const {records , loading , error}  = useSelector ((state)=>state.posts);
  useEffect(()=>{
           dispatch(fetchPosts())
           
  },[dispatch]);

  const deleteRecord = useCallback((id)=>{//when click edit it will reavaluete delete so we need usecallback
     dispatch(deletePost(id))
  },[dispatch])

  return (
    <div>
      <Loading  isLoading={loading} error={error }>
         <PostsLists posts={records}  deletePost={deleteRecord}/>
      </Loading>
    </div>
  )
}

