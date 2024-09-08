import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../store/postSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function usePostDetails() {
    const {id} = useParams();//get id from url
    const {loading, error , record} = useSelector((state)=>state.posts);
    const dispatch = useDispatch();

    useEffect(()=>{//whenever open details call api
      dispatch(fetchPost(id))
    },[dispatch, id])

    return {loading, error , record};//data
}
