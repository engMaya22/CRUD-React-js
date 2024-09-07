import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../state/postSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function usePostDetails() {
    const {id} = useParams();
    const {loading, error , record} = useSelector((state)=>state.posts);
  
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchPost(id))
    },[dispatch, id])
    return {loading, error , record};//data
}
