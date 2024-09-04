import React, { useEffect } from 'react'
import PostsLists from '../components/PostsLists'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../state/postSlice';
import Loading from '../components/Loading';

export default function Index() {
  const dispatch = useDispatch();
  const {records , loading , error}  = useSelector ((state)=>state.posts);
  useEffect(()=>{
           dispatch(fetchPosts())
           
  },[dispatch]);
  // console.log(loading)
  return (
    <div>
      <Loading  isLoading={loading} error={error }>
         <PostsLists posts={records}/>
      </Loading>
    </div>
  )
}
